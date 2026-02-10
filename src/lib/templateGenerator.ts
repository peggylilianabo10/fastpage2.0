
export interface TemplateOptions {
  category: string;
  specialty: string;
  businessName?: string;
}

export class TemplateGenerator {
  public static generate(options: TemplateOptions): string {
    const { category, specialty, businessName = "Mi Negocio" } = options;

    if (category === "restaurant") {
      if (specialty === "pizzeria") {
        return this.generatePizzeriaTemplate(businessName);
      }
      if (specialty === "comida-criolla") {
        return this.generateCriollaTemplate(businessName);
      }
      if (specialty === "comida-rapida") {
        return this.generateFastFoodTemplate(businessName);
      }
      if (specialty === "comida-saludable") {
        return this.generateHealthyFoodTemplate(businessName);
      }
    }

    // Default template for other specialties
    return this.generateGenericTemplate(businessName, specialty);
  }

  private static generatePizzeriaTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - La Mejor Pizza</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
        .font-theme { font-family: 'Bangers', cursive; }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .floating-obj { position: absolute; z-index: 0; pointer-events: none; opacity: 0.6; }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-red-600 text-white overflow-x-hidden">
    <div class="floating-obj animate-float text-6xl" style="top: 10%; left: 5%; animation-delay: 0s;">🍕</div>
    <div class="floating-obj animate-float text-4xl" style="top: 30%; right: 10%; animation-delay: 1s;">🍕</div>
    <div class="floating-obj animate-float text-5xl" style="bottom: 20%; left: 15%; animation-delay: 2s;">🍕</div>
    <div class="floating-obj animate-float text-4xl" style="top: 60%; right: 5%; animation-delay: 0.5s;">🍕</div>

    <nav class="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 class="text-3xl font-theme tracking-wider">${name}</h1>
        <div class="hidden md:flex space-x-8 font-semibold">
            <a href="#menu" class="hover:text-yellow-400 transition">Menú</a>
            <a href="#testimonios" class="hover:text-yellow-400 transition">Opiniones</a>
            <a href="#faq" class="hover:text-yellow-400 transition">Preguntas</a>
        </div>
        <button class="bg-yellow-400 text-red-700 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition shadow-lg">Pedir Ahora</button>
    </nav>

    <header class="relative z-10 text-center py-20 px-4">
        <h2 class="text-6xl md:text-8xl font-theme mb-6 drop-shadow-2xl">¡LA PIZZA MÁS <span class="text-yellow-400">CRUJIENTE</span>!</h2>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90">Ingredientes frescos, masa artesanal y el secreto de la casa en cada mordida.</p>
        <div class="flex flex-wrap justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop" alt="Pizza" class="w-full max-w-md rounded-3xl shadow-2xl border-4 border-yellow-400 transform hover:scale-105 transition duration-500">
        </div>
    </header>

    <section id="testimonios" class="relative z-10 py-20 bg-white text-red-700 rounded-t-[3rem] md:rounded-t-[6rem]">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-4xl md:text-5xl font-theme text-center mb-16">Lo que dicen nuestros <span class="text-yellow-500">Pizza Lovers</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-red-50 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-300 border-2 border-red-100">
                    <div class="text-yellow-500 text-2xl mb-4">★★★★★</div>
                    <p class="italic mb-6">"La mejor pizzería de la ciudad. La masa es simplemente espectacular y el servicio es de primera."</p>
                    <div class="font-bold text-lg">- Juan Pérez</div>
                </div>
                <div class="bg-red-50 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-300 border-2 border-red-100">
                    <div class="text-yellow-500 text-2xl mb-4">★★★★★</div>
                    <p class="italic mb-6">"¡Increíble! Pedimos la familiar y nos sorprendió el tamaño y el sabor. Volveremos sin duda."</p>
                    <div class="font-bold text-lg">- María García</div>
                </div>
                <div class="bg-red-50 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-300 border-2 border-red-100">
                    <div class="text-yellow-500 text-2xl mb-4">★★★★★</div>
                    <p class="italic mb-6">"Rápido, caliente y delicioso. La pizza de pepperoni es mi favorita de todo el mundo."</p>
                    <div class="font-bold text-lg">- Carlos Ruiz</div>
                </div>
            </div>
        </div>
    </section>

    <section id="faq" class="relative z-10 py-20 bg-red-50 text-red-700">
        <div class="max-w-3xl mx-auto px-4">
            <h3 class="text-4xl font-theme text-center mb-12">Preguntas Frecuentes</h3>
            <div class="space-y-4">
                <details class="group bg-white rounded-2xl shadow-md overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                        ¿Hacen envíos a domicilio?
                        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">
                        ¡Sí! Cubrimos todo el área metropolitana con un tiempo estimado de entrega de 30 a 45 minutos.
                    </div>
                </details>
                <details class="group bg-white rounded-2xl shadow-md overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                        ¿Tienen opciones vegetarianas?
                        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">
                        Contamos con 4 variedades de pizzas vegetarianas y la opción de personalizar tu pizza con los vegetales que prefieras.
                    </div>
                </details>
                <details class="group bg-white rounded-2xl shadow-md overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                        ¿Cuál es su horario de atención?
                        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">
                        Abrimos de Lunes a Domingo de 12:00 PM a 11:00 PM. ¡Los fines de semana cerramos a medianoche!
                    </div>
                </details>
            </div>
        </div>
    </section>

    <section class="relative z-10 py-20 bg-white text-red-700">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h3 class="text-3xl font-theme mb-10">Métodos de Pago Aceptados</h3>
            <div class="flex flex-wrap justify-center gap-8 items-center">
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">💳</div>
                    <span class="font-semibold text-sm">Tarjetas Débito/Crédito</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">📱</div>
                    <span class="font-semibold text-sm">Pago Móvil / Yape</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">💵</div>
                    <span class="font-semibold text-sm">Efectivo</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">🏦</div>
                    <span class="font-semibold text-sm">Transferencia</span>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-zinc-900 text-white py-12 px-4 text-center">
        <h1 class="text-3xl font-theme mb-4">${name}</h1>
        <p class="opacity-60 mb-8">© 2024 FastPage 2.0 - Todos los derechos reservados.</p>
        <div class="flex justify-center gap-6">
            <span class="hover:text-yellow-400 cursor-pointer transition">Facebook</span>
            <span class="hover:text-yellow-400 cursor-pointer transition">Instagram</span>
            <span class="hover:text-yellow-400 cursor-pointer transition">WhatsApp</span>
        </div>
    </footer>
</body>
</html>
    `;
  }

  private static generateCriollaTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Sabor Criollo Auténtico</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
        .font-theme { font-family: 'Lobster', cursive; }
        .font-title { font-family: 'Playfair Display', serif; }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .floating-obj { position: absolute; z-index: 0; pointer-events: none; opacity: 0.5; }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-[#FDF5E6] text-[#4A2C2A] overflow-x-hidden">
    <div class="floating-obj animate-float text-6xl" style="top: 15%; left: 8%; animation-delay: 0s;">🥘</div>
    <div class="floating-obj animate-float text-4xl" style="top: 35%; right: 12%; animation-delay: 1.5s;">🌶️</div>
    <div class="floating-obj animate-float text-5xl" style="bottom: 25%; left: 10%; animation-delay: 3s;">🍲</div>
    <div class="floating-obj animate-float text-4xl" style="top: 65%; right: 7%; animation-delay: 0.8s;">🌽</div>

    <nav class="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-[#D2B48C]/30">
        <h1 class="text-4xl font-theme text-[#8B4513]">${name}</h1>
        <div class="hidden md:flex space-x-8 font-semibold text-[#5D4037]">
            <a href="#especialidades" class="hover:text-[#A0522D] transition">Especialidades</a>
            <a href="#testimonios" class="hover:text-[#A0522D] transition">Nuestra Sazón</a>
            <a href="#faq" class="hover:text-[#A0522D] transition">Preguntas</a>
        </div>
        <button class="bg-[#8B4513] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A0522D] transition shadow-xl">Reservar Mesa</button>
    </nav>

    <header class="relative z-10 text-center py-24 px-4 bg-gradient-to-b from-[#FFF8DC] to-transparent">
        <h2 class="text-5xl md:text-7xl font-title mb-8 text-[#5D4037]">EL VERDADERO SABOR DE <span class="text-[#8B4513]">NUESTRA TIERRA</span></h2>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-[#6D4C41]">Recetas de la abuela, ingredientes naturales y el cariño de casa en cada plato.</p>
        <div class="relative max-w-4xl mx-auto">
            <div class="absolute inset-0 bg-[#8B4513] blur-3xl opacity-10 rounded-full"></div>
            <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop" alt="Comida Criolla" class="relative w-full rounded-[2rem] shadow-2xl border-8 border-white transform -rotate-1 hover:rotate-0 transition duration-700">
        </div>
    </header>

    <section id="testimonios" class="relative z-10 py-24 bg-[#5D4037] text-white">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-4xl md:text-5xl font-theme text-center mb-20 text-[#DEB887]">Lo que dicen nuestros comensales</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="bg-[#4A2C2A] p-10 rounded-2xl shadow-2xl border border-[#D2B48C]/20">
                    <div class="text-[#DEB887] text-2xl mb-6">★★★★★</div>
                    <p class="italic mb-8 text-lg">"El lomo saltado es de otro planeta. La atención te hace sentir como en casa desde que entras."</p>
                    <div class="font-bold text-[#DEB887]">- Ricardo Palma</div>
                </div>
                <div class="bg-[#4A2C2A] p-10 rounded-2xl shadow-2xl border border-[#D2B48C]/20">
                    <div class="text-[#DEB887] text-2xl mb-6">★★★★★</div>
                    <p class="italic mb-8 text-lg">"¡Incomparable! El ají de gallina tiene ese toque casero que tanto buscaba en la ciudad."</p>
                    <div class="font-bold text-[#DEB887]">- Chabuca Granda</div>
                </div>
                <div class="bg-[#4A2C2A] p-10 rounded-2xl shadow-2xl border border-[#D2B48C]/20">
                    <div class="text-[#DEB887] text-2xl mb-6">★★★★★</div>
                    <p class="italic mb-8 text-lg">"Un lugar mágico. La comida criolla en su máxima expresión. Los postres son una delicia total."</p>
                    <div class="font-bold text-[#DEB887]">- César Vallejo</div>
                </div>
            </div>
        </div>
    </section>

    <section id="faq" class="relative z-10 py-24 bg-white text-[#4A2C2A]">
        <div class="max-w-3xl mx-auto px-4">
            <h3 class="text-4xl font-title text-center mb-16 underline decoration-[#8B4513] underline-offset-8">Preguntas Frecuentes</h3>
            <div class="space-y-6">
                <details class="group bg-[#FDF5E6] rounded-2xl overflow-hidden border border-[#D2B48C]/30">
                    <summary class="flex justify-between items-center p-7 cursor-pointer font-bold text-xl list-none">
                        ¿Tienen menú del día?
                        <svg class="w-6 h-6 text-[#8B4513] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-7 pb-7 text-[#6D4C41] text-lg">
                        Sí, ofrecemos un menú ejecutivo variado de Lunes a Viernes que incluye entrada, plato de fondo y refresco natural.
                    </div>
                </details>
                <details class="group bg-[#FDF5E6] rounded-2xl overflow-hidden border border-[#D2B48C]/30">
                    <summary class="flex justify-between items-center p-7 cursor-pointer font-bold text-xl list-none">
                        ¿Realizan eventos o banquetes?
                        <svg class="w-6 h-6 text-[#8B4513] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-7 pb-7 text-[#6D4C41] text-lg">
                        Atendemos todo tipo de eventos corporativos y familiares con paquetes personalizados de comida criolla.
                    </div>
                </details>
                <details class="group bg-[#FDF5E6] rounded-2xl overflow-hidden border border-[#D2B48C]/30">
                    <summary class="flex justify-between items-center p-7 cursor-pointer font-bold text-xl list-none">
                        ¿Tienen estacionamiento propio?
                        <svg class="w-6 h-6 text-[#8B4513] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-7 pb-7 text-[#6D4C41] text-lg">
                        Contamos con estacionamiento privado y vigilado para la comodidad de todos nuestros clientes.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <section class="relative z-10 py-24 bg-[#FDF5E6]">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h3 class="text-3xl font-title mb-14 text-[#5D4037]">Medios de Pago Disponibles</h3>
            <div class="flex flex-wrap justify-center gap-10 items-center">
                <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-lg border border-[#D2B48C]/20">💳</div>
                    <span class="font-bold text-[#5D4037]">Tarjetas Bancarias</span>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-lg border border-[#D2B48C]/20">📱</div>
                    <span class="font-bold text-[#5D4037]">Billeteras Digitales</span>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-lg border border-[#D2B48C]/20">💵</div>
                    <span class="font-bold text-[#5D4037]">Efectivo Soles</span>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-[#2D1B19] text-[#DEB887] py-16 px-4 text-center">
        <h1 class="text-4xl font-theme mb-6">${name}</h1>
        <p class="opacity-60 mb-10 text-lg">Preservando nuestras tradiciones culinarias desde siempre.</p>
        <div class="flex justify-center gap-10 font-bold">
            <span class="hover:text-white cursor-pointer transition">Facebook</span>
            <span class="hover:text-white cursor-pointer transition">Instagram</span>
            <span class="hover:text-white cursor-pointer transition">WhatsApp</span>
        </div>
        <p class="mt-12 opacity-30 text-sm">© 2024 FastPage 2.0 - Tradición Peruana</p>
    </footer>
</body>
</html>
    `;
  }

  private static generateFastFoodTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Rápido, Rico y Caliente</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@800&family=Passion+One:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
        .font-theme { font-family: 'Passion One', cursive; }
        .font-title { font-family: 'Rubik', sans-serif; }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
        .floating-obj { position: absolute; z-index: 0; pointer-events: none; opacity: 0.7; }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-[#FFD700] text-zinc-900 overflow-x-hidden">
    <div class="floating-obj animate-bounce-slow text-6xl" style="top: 12%; left: 10%; animation-delay: 0s;">🍔</div>
    <div class="floating-obj animate-bounce-slow text-4xl" style="top: 28%; right: 15%; animation-delay: 0.5s;">🍟</div>
    <div class="floating-obj animate-bounce-slow text-5xl" style="bottom: 15%; left: 12%; animation-delay: 1s;">🥤</div>
    <div class="floating-obj animate-bounce-slow text-4xl" style="top: 55%; right: 8%; animation-delay: 1.5s;">🌭</div>

    <nav class="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 class="text-4xl font-theme text-red-600 italic uppercase tracking-tighter">${name}</h1>
        <div class="hidden md:flex space-x-6 font-bold uppercase text-sm">
            <a href="#combos" class="hover:text-red-600 transition">Combos</a>
            <a href="#testimonios" class="hover:text-red-600 transition">Fans</a>
            <a href="#faq" class="hover:text-red-600 transition">Ayuda</a>
        </div>
        <button class="bg-red-600 text-white px-8 py-3 rounded-lg font-black italic uppercase hover:bg-zinc-900 transition transform hover:scale-110">¡Pide Ya!</button>
    </nav>

    <header class="relative z-10 text-center py-20 px-4">
        <h2 class="text-6xl md:text-9xl font-title mb-6 text-zinc-900 leading-none">EL SABOR QUE <span class="text-red-600">EXPLOTA</span></h2>
        <p class="text-xl md:text-3xl max-w-2xl mx-auto mb-12 font-bold uppercase italic text-zinc-800">Cero esperas, 100% sabor real.</p>
        <div class="relative max-w-2xl mx-auto">
            <div class="absolute -inset-4 bg-red-600 rounded-[3rem] rotate-3 -z-10 shadow-2xl"></div>
            <img src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1000&auto=format&fit=crop" alt="Fast Food" class="w-full rounded-[2.5rem] shadow-2xl border-8 border-white">
        </div>
    </header>

    <section id="testimonios" class="relative z-10 py-20 bg-zinc-900 text-white">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-5xl font-theme text-center mb-16 text-[#FFD700] uppercase italic">Lo que dicen los adictos al sabor</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-zinc-800 p-10 rounded-3xl border-l-8 border-red-600">
                    <div class="flex gap-1 text-red-600 text-xl mb-4">★★★★★</div>
                    <p class="text-xl font-bold mb-6 italic">"La burger más brutal que he probado. Las papas llegan crujientes, ¡eso es otro nivel!"</p>
                    <div class="text-red-600 font-black uppercase">- Kevin G.</div>
                </div>
                <div class="bg-zinc-800 p-10 rounded-3xl border-l-8 border-[#FFD700]">
                    <div class="flex gap-1 text-[#FFD700] text-xl mb-4">★★★★★</div>
                    <p class="text-xl font-bold mb-6 italic">"El delivery más rápido del oeste. Literalmente llegó en 15 minutos y ardiendo."</p>
                    <div class="text-[#FFD700] font-black uppercase">- Sofía M.</div>
                </div>
            </div>
        </div>
    </section>

    <section id="faq" class="relative z-10 py-20 bg-white">
        <div class="max-w-3xl mx-auto px-4">
            <h3 class="text-5xl font-theme text-center mb-12 uppercase italic text-red-600">Dudas Rápidas</h3>
            <div class="space-y-4">
                <details class="group bg-zinc-100 rounded-2xl overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-black text-xl list-none uppercase italic">
                        ¿Tienen delivery propio?
                        <svg class="w-8 h-8 text-red-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 font-bold text-zinc-600">
                        ¡Claro! Nuestra flota de motos vuela para que tu comida llegue perfecta.
                    </div>
                </details>
                <details class="group bg-zinc-100 rounded-2xl overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-black text-xl list-none uppercase italic">
                        ¿Cómo armo mi combo?
                        <svg class="w-8 h-8 text-red-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 font-bold text-zinc-600">
                        Elige tu burger, añade papas grandes y la bebida que quieras por un precio especial.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <section class="relative z-10 py-20 bg-[#FFD700]">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h3 class="text-4xl font-title mb-12 uppercase italic">Paga como quieras</h3>
            <div class="flex flex-wrap justify-center gap-6">
                <div class="bg-zinc-900 text-[#FFD700] px-8 py-4 rounded-2xl font-black uppercase italic shadow-xl">Efectivo</div>
                <div class="bg-red-600 text-white px-8 py-4 rounded-2xl font-black uppercase italic shadow-xl">Tarjetas</div>
                <div class="bg-white text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase italic shadow-xl">Yape/Plin</div>
            </div>
        </div>
    </section>

    <footer class="bg-red-600 text-white py-12 px-4 text-center">
        <h1 class="text-5xl font-theme italic uppercase mb-4 leading-none">${name}</h1>
        <p class="font-bold uppercase tracking-widest text-xs opacity-80 mb-8">© 2024 FastPage 2.0 - Fast & Furious Flavor</p>
        <div class="flex justify-center gap-8 font-black uppercase italic text-sm">
            <span class="hover:underline cursor-pointer">IG</span>
            <span class="hover:underline cursor-pointer">FB</span>
            <span class="hover:underline cursor-pointer">TK</span>
        </div>
    </footer>
</body>
</html>
    `;
  }

  private static generatePizzeriaTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - La Mejor Pizza</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
        .font-pizza { font-family: 'Bangers', cursive; }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .pizza-slice { position: absolute; z-index: 0; pointer-events: none; opacity: 0.6; }
        
        /* Accordion styles */
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-red-600 text-white overflow-x-hidden">
    <!-- Pizza Floating Objects -->
    <div class="pizza-slice animate-float text-6xl" style="top: 10%; left: 5%; animation-delay: 0s;">🍕</div>
    <div class="pizza-slice animate-float text-4xl" style="top: 30%; right: 10%; animation-delay: 1s;">🍕</div>
    <div class="pizza-slice animate-float text-5xl" style="bottom: 20%; left: 15%; animation-delay: 2s;">🍕</div>
    <div class="pizza-slice animate-float text-4xl" style="top: 60%; right: 5%; animation-delay: 0.5s;">🍕</div>

    <nav class="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 class="text-3xl font-pizza tracking-wider">${name}</h1>
        <div class="hidden md:flex space-x-8 font-semibold">
            <a href="#menu" class="hover:text-yellow-400 transition">Menú</a>
            <a href="#testimonios" class="hover:text-yellow-400 transition">Opiniones</a>
            <a href="#faq" class="hover:text-yellow-400 transition">Preguntas</a>
        </div>
        <button class="bg-yellow-400 text-red-700 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition shadow-lg">Pedir Ahora</button>
    </nav>

    <header class="relative z-10 text-center py-20 px-4">
        <h2 class="text-6xl md:text-8xl font-pizza mb-6 drop-shadow-2xl">¡LA PIZZA MÁS <span class="text-yellow-400">CRUJIENTE</span>!</h2>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90">Ingredientes frescos, masa artesanal y el secreto de la casa en cada mordida.</p>
        <div class="flex flex-wrap justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop" alt="Pizza" class="w-full max-w-md rounded-3xl shadow-2xl border-4 border-yellow-400 transform hover:scale-105 transition duration-500">
        </div>
    </header>

    <!-- Testimonios -->
    <section id="testimonios" class="relative z-10 py-20 bg-white text-red-700 rounded-t-[3rem] md:rounded-t-[6rem]">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-4xl md:text-5xl font-pizza text-center mb-16">Lo que dicen nuestros <span class="text-yellow-500">Pizza Lovers</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-red-50 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-300 border-2 border-red-100">
                    <div class="text-yellow-500 text-2xl mb-4">★★★★★</div>
                    <p class="italic mb-6">"La mejor pizzería de la ciudad. La masa es simplemente espectacular y el servicio es de primera."</p>
                    <div class="font-bold text-lg">- Juan Pérez</div>
                </div>
                <div class="bg-red-50 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-300 border-2 border-red-100">
                    <div class="text-yellow-500 text-2xl mb-4">★★★★★</div>
                    <p class="italic mb-6">"¡Increíble! Pedimos la familiar y nos sorprendió el tamaño y el sabor. Volveremos sin duda."</p>
                    <div class="font-bold text-lg">- María García</div>
                </div>
                <div class="bg-red-50 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition duration-300 border-2 border-red-100">
                    <div class="text-yellow-500 text-2xl mb-4">★★★★★</div>
                    <p class="italic mb-6">"Rápido, caliente y delicioso. La pizza de pepperoni es mi favorita de todo el mundo."</p>
                    <div class="font-bold text-lg">- Carlos Ruiz</div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="relative z-10 py-20 bg-red-50 text-red-700">
        <div class="max-w-3xl mx-auto px-4">
            <h3 class="text-4xl font-pizza text-center mb-12">Preguntas Frecuentes</h3>
            <div class="space-y-4">
                <details class="group bg-white rounded-2xl shadow-md overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                        ¿Hacen envíos a domicilio?
                        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">
                        ¡Sí! Cubrimos todo el área metropolitana con un tiempo estimado de entrega de 30 a 45 minutos.
                    </div>
                </details>
                <details class="group bg-white rounded-2xl shadow-md overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                        ¿Tienen opciones vegetarianas?
                        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">
                        Contamos con 4 variedades de pizzas vegetarianas y la opción de personalizar tu pizza con los vegetales que prefieras.
                    </div>
                </details>
                <details class="group bg-white rounded-2xl shadow-md overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none">
                        ¿Cuál es su horario de atención?
                        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">
                        Abrimos de Lunes a Domingo de 12:00 PM a 11:00 PM. ¡Los fines de semana cerramos a medianoche!
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- Métodos de Pago -->
    <section class="relative z-10 py-20 bg-white text-red-700">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h3 class="text-3xl font-pizza mb-10">Métodos de Pago Aceptados</h3>
            <div class="flex flex-wrap justify-center gap-8 items-center">
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">💳</div>
                    <span class="font-semibold text-sm">Tarjetas Débito/Crédito</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">📱</div>
                    <span class="font-semibold text-sm">Pago Móvil / Yape</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">💵</div>
                    <span class="font-semibold text-sm">Efectivo</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm">🏦</div>
                    <span class="font-semibold text-sm">Transferencia</span>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-zinc-900 text-white py-12 px-4 text-center">
        <h1 class="text-3xl font-pizza mb-4">${name}</h1>
        <p class="opacity-60 mb-8">© 2024 FastPage 2.0 - Todos los derechos reservados.</p>
        <div class="flex justify-center gap-6">
            <span class="hover:text-yellow-400 cursor-pointer transition">Facebook</span>
            <span class="hover:text-yellow-400 cursor-pointer transition">Instagram</span>
            <span class="hover:text-yellow-400 cursor-pointer transition">WhatsApp</span>
        </div>
    </footer>
</body>
</html>
    `;
  }

  private static generateHealthyFoodTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Frescura y Bienestar</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&family=Outfit:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; }
        .font-theme { font-family: 'Quicksand', sans-serif; font-weight: 700; }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .floating-obj { position: absolute; z-index: 0; pointer-events: none; opacity: 0.5; }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-[#F7FAF7] text-[#2D4A2D] overflow-x-hidden">
    <div class="floating-obj animate-float text-6xl" style="top: 10%; left: 5%; animation-delay: 0s;">🥗</div>
    <div class="floating-obj animate-float text-4xl" style="top: 30%; right: 10%; animation-delay: 2s;">🥑</div>
    <div class="floating-obj animate-float text-5xl" style="bottom: 20%; left: 15%; animation-delay: 1s;">🥦</div>
    <div class="floating-obj animate-float text-4xl" style="top: 60%; right: 5%; animation-delay: 3s;">🍎</div>

    <nav class="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 class="text-3xl font-theme text-[#4CAF50]">${name}</h1>
        <div class="hidden md:flex space-x-8 font-semibold text-[#558B2F]">
            <a href="#menu" class="hover:text-[#4CAF50] transition">Menú</a>
            <a href="#testimonios" class="hover:text-[#4CAF50] transition">Testimonios</a>
            <a href="#faq" class="hover:text-[#4CAF50] transition">Dudas</a>
        </div>
        <button class="bg-[#4CAF50] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#388E3C] transition shadow-lg">Pedir Saludable</button>
    </nav>

    <header class="relative z-10 text-center py-24 px-4 max-w-5xl mx-auto">
        <h2 class="text-5xl md:text-7xl font-theme mb-8 text-[#2E7D32]">SABOR QUE <span class="text-[#4CAF50]">TE HACE BIEN</span></h2>
        <p class="text-xl md:text-2xl mb-12 opacity-80">Comida real, sin procesos, llena de nutrientes y con un sabor increíble.</p>
        <div class="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop" alt="Healthy Food" class="w-full h-[500px] object-cover">
        </div>
    </header>

    <section id="testimonios" class="relative z-10 py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-4xl font-theme text-center mb-16 text-[#2E7D32]">Lo que dicen nuestros <span class="text-[#81C784]">Healthy Fans</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-[#F1F8E9] p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition duration-500">
                    <div class="text-[#4CAF50] text-2xl mb-6">★★★★★</div>
                    <p class="italic mb-8 text-lg">"Por fin un lugar donde la comida sana no es aburrida. Los bowls son espectaculares y muy completos."</p>
                    <div class="font-bold text-[#2E7D32]">- Lucía V.</div>
                </div>
                <div class="bg-[#F1F8E9] p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition duration-500">
                    <div class="text-[#4CAF50] text-2xl mb-6">★★★★★</div>
                    <p class="italic mb-8 text-lg">"Me encanta que todo sea fresco. Se nota la calidad de los ingredientes en cada bocado. ¡Recomendadísimo!"</p>
                    <div class="font-bold text-[#2E7D32]">- Marcos S.</div>
                </div>
                <div class="bg-[#F1F8E9] p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition duration-500">
                    <div class="text-[#4CAF50] text-2xl mb-6">★★★★★</div>
                    <p class="italic mb-8 text-lg">"El servicio es rápido y la comida deliciosa. Perfecto para comer sano en la oficina."</p>
                    <div class="font-bold text-[#2E7D32]">- Elena R.</div>
                </div>
            </div>
        </div>
    </section>

    <section id="faq" class="relative z-10 py-24 bg-[#E8F5E9]">
        <div class="max-w-3xl mx-auto px-4">
            <h3 class="text-4xl font-theme text-center mb-16 text-[#2E7D32]">Preguntas Comunes</h3>
            <div class="space-y-4">
                <details class="group bg-white rounded-3xl overflow-hidden shadow-sm">
                    <summary class="flex justify-between items-center p-8 cursor-pointer font-bold text-xl list-none">
                        ¿Tienen información nutricional?
                        <svg class="w-6 h-6 text-[#4CAF50] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-8 pb-8 text-zinc-600">
                        ¡Sí! Todos nuestros platos incluyen el detalle de calorías y macros en el menú físico y digital.
                    </div>
                </details>
                <details class="group bg-white rounded-3xl overflow-hidden shadow-sm">
                    <summary class="flex justify-between items-center p-8 cursor-pointer font-bold text-xl list-none">
                        ¿Los empaques son ecológicos?
                        <svg class="w-6 h-6 text-[#4CAF50] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-8 pb-8 text-zinc-600">
                        Totalmente. Utilizamos empaques biodegradables y compostables para reducir nuestro impacto ambiental.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <section class="relative z-10 py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h3 class="text-3xl font-theme mb-14 text-[#2E7D32]">Pagos Seguros</h3>
            <div class="flex flex-wrap justify-center gap-12 items-center">
                <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-[#F1F8E9] rounded-[2rem] flex items-center justify-center text-4xl">💳</div>
                    <span class="font-bold text-[#558B2F]">Tarjetas</span>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-[#F1F8E9] rounded-[2rem] flex items-center justify-center text-4xl">📱</div>
                    <span class="font-bold text-[#558B2F]">Yape/Plin</span>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-[#F1F8E9] rounded-[2rem] flex items-center justify-center text-4xl">🏦</div>
                    <span class="font-bold text-[#558B2F]">Transferencia</span>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-[#1B301B] text-white py-20 px-4 text-center">
        <h1 class="text-4xl font-theme mb-6 text-[#81C784]">${name}</h1>
        <p class="opacity-60 mb-10 max-w-md mx-auto">Alimentando tu cuerpo y alma con lo mejor de la naturaleza.</p>
        <div class="flex justify-center gap-12 font-bold mb-12">
            <span class="hover:text-[#81C784] cursor-pointer transition">Instagram</span>
            <span class="hover:text-[#81C784] cursor-pointer transition">WhatsApp</span>
        </div>
        <p class="opacity-20 text-sm">© 2024 FastPage 2.0 - Healthy Life</p>
    </footer>
</body>
</html>
    `;
  }

  private static generateGenericTemplate(name: string, specialty: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - ${specialty}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-zinc-50 text-zinc-900">
    <nav class="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-indigo-600">${name}</h1>
        <div class="hidden md:flex space-x-8 font-medium">
            <a href="#servicios" class="hover:text-indigo-600 transition">Servicios</a>
            <a href="#testimonios" class="hover:text-indigo-600 transition">Testimonios</a>
            <a href="#faq" class="hover:text-indigo-600 transition">FAQ</a>
        </div>
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition">Contactar</button>
    </nav>

    <header class="text-center py-20 px-4 max-w-4xl mx-auto">
        <h2 class="text-5xl md:text-6xl font-bold mb-6 text-zinc-900">Tu solución en <span class="text-indigo-600">${specialty}</span></h2>
        <p class="text-xl opacity-70 mb-10">Brindamos el mejor servicio de la industria con profesionalismo y dedicación.</p>
        <div class="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" alt="Hero" class="w-full h-96 object-cover">
        </div>
    </header>

    <section id="testimonios" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-3xl font-bold text-center mb-16">Lo que dicen nuestros clientes</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
                    <p class="italic mb-4">"Excelente atención y resultados. Muy recomendados para cualquier proyecto."</p>
                    <div class="font-bold">- Ana López</div>
                </div>
                <div class="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
                    <p class="italic mb-4">"Profesionales en todo sentido. Superaron nuestras expectativas."</p>
                    <div class="font-bold">- Pedro Martínez</div>
                </div>
            </div>
        </div>
    </section>

    <section id="faq" class="py-20 bg-zinc-50">
        <div class="max-w-3xl mx-auto px-4">
            <h3 class="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h3>
            <div class="space-y-4">
                <details class="group bg-white rounded-xl shadow-sm overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold list-none">
                        ¿Cómo puedo empezar?
                        <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">Contáctanos a través del botón superior y nos pondremos en contacto contigo de inmediato.</div>
                </details>
                <details class="group bg-white rounded-xl shadow-sm overflow-hidden">
                    <summary class="flex justify-between items-center p-6 cursor-pointer font-bold list-none">
                        ¿Cuál es el tiempo de entrega?
                        <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="px-6 pb-6 text-zinc-600">Depende de la complejidad del servicio, pero usualmente entre 24 a 48 horas.</div>
                </details>
            </div>
        </div>
    </section>

    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h3 class="text-2xl font-bold mb-10">Métodos de Pago</h3>
            <div class="flex flex-wrap justify-center gap-8 items-center text-4xl">
                <span>💳</span>
                <span>📱</span>
                <span>💵</span>
            </div>
        </div>
    </section>

    <footer class="bg-zinc-900 text-white py-12 text-center">
        <p>© 2024 ${name} - Todos los derechos reservados.</p>
    </footer>
</body>
</html>
    `;
  }
}
