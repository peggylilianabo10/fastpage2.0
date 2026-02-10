"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile, updateEmail } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  Shield, 
  Bell, 
  Camera, 
  ChevronRight, 
  Smartphone, 
  Mail, 
  CheckCircle,
  Save,
  Lock,
  Globe
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form states
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    avatar: "",
    plan: "Free",
    twoFactorEmail: false,
    twoFactorPhone: false,
    language: "es",
    notifications: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Cargar datos adicionales de Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        setFormData({
          displayName: currentUser.displayName || "",
          email: currentUser.email || "",
          phone: userData.phone || "",
          avatar: currentUser.photoURL || "",
          plan: userData.plan || "Free",
          twoFactorEmail: userData.twoFactorEmail || false,
          twoFactorPhone: userData.twoFactorPhone || false,
          language: userData.language || "es",
          notifications: userData.notifications !== undefined ? userData.notifications : true
        });
        setLoading(false);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Actualizar perfil de Firebase Auth
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.avatar
      });

      // 2. Actualizar Firestore
      await setDoc(doc(db, "users", user.uid), {
        phone: formData.phone,
        plan: formData.plan,
        twoFactorEmail: formData.twoFactorEmail,
        twoFactorPhone: formData.twoFactorPhone,
        language: formData.language,
        notifications: formData.notifications,
        updatedAt: Date.now()
      }, { merge: true });

      setMessage({ type: "success", text: "Configuración guardada correctamente" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error: any) {
      console.error("Error saving settings:", error);
      setMessage({ type: "error", text: error.message || "Error al guardar la configuración" });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "account", label: "Cuenta", icon: <User className="w-5 h-5" /> },
    { id: "plan", label: "Plan y Facturación", icon: <CreditCard className="w-5 h-5" /> },
    { id: "security", label: "Seguridad", icon: <Shield className="w-5 h-5" /> },
    { id: "preferences", label: "Preferencias", icon: <Globe className="w-5 h-5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <h1 className="text-3xl font-bold mb-8 text-white">Configuración</h1>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <div className="flex-grow bg-zinc-900/30 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            
            {activeTab === "account" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Administrar Cuenta</h2>
                  
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-2 border-white/10 overflow-hidden flex items-center justify-center">
                        {formData.avatar ? (
                          <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-12 h-12 text-zinc-600" />
                        )}
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-amber-500 text-black rounded-lg shadow-lg hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Foto de Perfil</h3>
                      <p className="text-zinc-500 text-sm mb-3">JPG, GIF o PNG. Máximo 2MB.</p>
                      <input 
                        type="text" 
                        placeholder="URL de imagen"
                        className="bg-zinc-800/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white w-64 focus:border-amber-500/50 outline-none"
                        value={formData.avatar}
                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Nombre Completo</label>
                      <input 
                        type="text" 
                        className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all"
                        value={formData.displayName}
                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Correo Electrónico</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          disabled
                          className="w-full bg-zinc-800/20 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                          value={formData.email}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="w-5 h-5 text-emerald-500/50" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Número de Celular</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 bg-zinc-800/50 border border-white/10 rounded-xl px-3 text-white">
                          <span>+51</span>
                        </div>
                        <input 
                          type="tel" 
                          className="flex-grow bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all"
                          placeholder="999 999 999"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "plan" && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Plan y Facturación</h2>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded-full mb-2 inline-block">Plan Actual</span>
                      <h3 className="text-3xl font-black text-white">FastPage PRO</h3>
                      <p className="text-amber-200/60 text-sm">Tu suscripción se renueva el 12 de Marzo, 2026</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">$29.00</span>
                      <p className="text-zinc-500 text-xs">/mes</p>
                    </div>
                  </div>
                  <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all">
                    Gestionar Suscripción
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Métodos de Pago</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-zinc-800/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-zinc-700 rounded-md flex items-center justify-center font-bold text-[10px] text-zinc-400">VISA</div>
                      <div>
                        <p className="text-white font-medium">Visa terminada en 4242</p>
                        <p className="text-zinc-500 text-xs">Expira 12/28</p>
                      </div>
                    </div>
                    <button className="text-zinc-400 hover:text-white text-sm font-medium">Editar</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Seguridad</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-zinc-800/30">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Mail className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Verificación por Correo</p>
                        <p className="text-zinc-500 text-sm">Recibe un código cada vez que inicies sesión.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, twoFactorEmail: !formData.twoFactorEmail})}
                      className={`w-12 h-6 rounded-full transition-all relative ${formData.twoFactorEmail ? "bg-amber-500" : "bg-zinc-700"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.twoFactorEmail ? "left-7" : "left-1"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-zinc-800/30">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-xl">
                        <Smartphone className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Verificación por SMS</p>
                        <p className="text-zinc-500 text-sm">Seguridad adicional a través de tu celular.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, twoFactorPhone: !formData.twoFactorPhone})}
                      className={`w-12 h-6 rounded-full transition-all relative ${formData.twoFactorPhone ? "bg-amber-500" : "bg-zinc-700"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.twoFactorPhone ? "left-7" : "left-1"}`} />
                    </button>
                  </div>

                  <div className="pt-4">
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium">
                      <Lock className="w-4 h-4" />
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Preferencias Globales</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Idioma de la Interfaz</label>
                    <select 
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all appearance-none"
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Zona Horaria</label>
                    <select className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all appearance-none">
                      <option>(GMT-05:00) Lima, Bogotá, Quito</option>
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT+01:00) Madrid, Paris</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-zinc-800/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-700/50 rounded-xl">
                      <Bell className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold">Notificaciones por Correo</p>
                      <p className="text-zinc-500 text-sm">Recibe alertas sobre tus proyectos y novedades.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                    className={`w-12 h-6 rounded-full transition-all relative ${formData.notifications ? "bg-amber-500" : "bg-zinc-700"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.notifications ? "left-7" : "left-1"}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
              {message.text && (
                <div className={`text-sm font-bold ${message.type === "success" ? "text-emerald-500" : "text-red-500"}`}>
                  {message.text}
                </div>
              )}
              <div className="flex-grow" />
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-amber-500 text-black px-8 py-3 rounded-xl font-black uppercase tracking-wider hover:bg-amber-400 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Guardar Cambios
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
