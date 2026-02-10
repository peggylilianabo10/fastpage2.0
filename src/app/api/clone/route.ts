import type { NextRequest } from "next/server";

function isValidHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function sanitizeHtml(html: string, baseUrl: string): string {
  let sanitized = html;

  // 1. Remove frame-busting scripts that redirect when in an iframe
  sanitized = sanitized.replace(/(if\s*\(window\.top\s*!==\s*window\.self\)|if\s*\(top\s*!==\s*self\)|if\s*\(window\.self\s*!==\s*window\.top\)).*?\{.*?window\.top\.location.*?=.*?window\.self\.location.*?\}|top\.location\.href\s*=\s*location\.href/gi, '/* frame-buster removed */');
  
  // 2. Remove Content Security Policy and X-Frame-Options meta tags
  sanitized = sanitized.replace(/<meta\s+http-equiv=["'](content-security-policy|x-frame-options)["'].*?>/gi, '<!-- security-meta removed -->');

  // 3. Remove integrity and crossorigin attributes
  sanitized = sanitized.replace(/\s+integrity=["'].*?["']/gi, '');
  sanitized = sanitized.replace(/\s+crossorigin=["'].*?["']/gi, '');

  // 4. Fix relative URLs in inline styles
  sanitized = sanitized.replace(/url\(['"]?(\/[^'"]+)['"]?\)/gi, (match, p1) => {
    if (p1.startsWith('//')) return match;
    try {
      return `url("${new URL(p1, baseUrl).href}")`;
    } catch (e) { return match; }
  });

  // 5. Ensure base tag exists
  const baseTag = `<base href="${baseUrl}">`;
  
  // 5. Advanced Resource Fixer Script
  const fixResourcesScript = `
    <script>
      (function() {
        const baseUrl = "${baseUrl}";
        const fixUrl = (url) => {
          if (!url || url.startsWith('http') || url.startsWith('//') || url.startsWith('data:') || url.startsWith('blob:')) return url;
          try {
            return new URL(url, baseUrl).href;
          } catch(e) { return url; }
        };

        const fixAllElements = () => {
          document.querySelectorAll('img, video, audio, source, link, script, a, iframe, use').forEach(el => {
            if (el.src) {
              const originalSrc = el.getAttribute('src');
              if (originalSrc && !originalSrc.startsWith('http')) {
                el.src = fixUrl(originalSrc);
              }
            }
            if (el.href) {
              const originalHref = el.getAttribute('href');
              if (originalHref && !originalHref.startsWith('http') && !originalHref.startsWith('#')) {
                el.href = fixUrl(originalHref);
              }
            }
            if (el.srcset) {
              el.srcset = el.getAttribute('srcset').split(',').map(s => {
                const parts = s.trim().split(' ');
                if (parts.length > 0) {
                  parts[0] = fixUrl(parts[0]);
                }
                return parts.join(' ');
              }).join(', ');
            }
            // Fix SVG <use> tags
            if (el.tagName === 'use' && el.getAttribute('xlink:href')) {
              el.setAttribute('xlink:href', fixUrl(el.getAttribute('xlink:href')));
            }
          });
        };

        // Initial fix
        fixAllElements();

        // MutationObserver for dynamic content (Ajax, lazy load)
        const observer = new MutationObserver((mutations) => {
          mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) {
                fixAllElements();
              }
            });
          });
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });

        // Override window.top to trick frame-busting scripts that we are the top window
        try {
          Object.defineProperty(window, 'top', { get: function() { return window; } });
          Object.defineProperty(window, 'parent', { get: function() { return window; } });
        } catch(e) {}
      })();
    </script>
  `;

  // Inject into <head>
  if (/<head(.*?)>/i.test(sanitized)) {
    sanitized = sanitized.replace(/<head(.*?)>/i, (m) => `${m}\n${baseTag}\n${fixResourcesScript}`);
  } else if (/<html(.*?)>/i.test(sanitized)) {
    sanitized = sanitized.replace(/<html(.*?)>/i, (m) => `${m}\n<head>\n${baseTag}\n${fixResourcesScript}\n</head>`);
  } else {
    sanitized = baseTag + fixResourcesScript + sanitized;
  }

  return sanitized;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url")?.trim();

  if (!target || !isValidHttpUrl(target)) {
    return new Response(JSON.stringify({ error: "URL inválida" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const res = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1"
      },
      redirect: "follow",
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Error al obtener la URL (${res.status}): ${res.statusText}` }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return new Response(
        JSON.stringify({ error: "La URL no devolvió una página HTML válida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const html = await res.text();
    // Use the final URL after redirects for base tag
    const finalUrl = res.url || target;
    const sanitizedHtml = sanitizeHtml(html, finalUrl);

    return new Response(sanitizedHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Cloned-From": finalUrl,
      },
    });
  } catch (error: any) {
    console.error("Clone error:", error);
    const message = error.name === 'AbortError' ? "La solicitud tardó demasiado" : "Error de conexión al intentar clonar el sitio";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

