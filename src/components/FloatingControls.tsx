"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { Moon, Sun, Globe, ArrowUp } from "lucide-react";

export default function FloatingControls() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 md:gap-3 z-50">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-1.5 md:p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-xl hover:scale-110 transition-all group animate-fade-in"
          aria-label="Subir"
        >
          <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-900 dark:text-yellow-400" />
        </button>
      )}

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="px-2 py-1 md:px-3 md:py-1.5 bg-white border border-zinc-200 rounded-full shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
        aria-label="Cambiar Idioma"
      >
        <span className="text-[10px] md:text-xs font-bold text-black">
          {language === "es" ? "EN" : "ES"}
        </span>
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-1.5 md:p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-xl hover:scale-110 transition-all group"
        aria-label="Cambiar Tema"
      >
        {theme === "dark" ? (
          <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 group-hover:-rotate-12 transition-transform" />
        ) : (
          <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-900 group-hover:rotate-45 transition-transform" />
        )}
      </button>
    </div>
  );
}
