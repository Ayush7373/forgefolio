import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  ArrowLeft, 
  Download, 
  Sparkles, 
  Cpu, 
  X, 
  Briefcase, 
  Layout, 
  Grid, 
  Terminal, 
  ChevronDown, 
  Sun, 
  Moon, 
  Flame, 
  Orbit, 
  BaggageClaim, 
  Loader2, 
  CheckCircle, 
  Zap,
  CheckCircle2,
  User,
  Trash2,
  Plus,
  Image as ImageIcon,
  MoveRight,
  Linkedin,
  Mail,
  Github,
  Globe,
  LogOut
} from 'lucide-react';

// Import components
import Form from './components/form.jsx';
import Preview from './components/preview.jsx';
import TemplateGalleryComponent from './components/templategallery.jsx';
import AuthPages from './pages/authpages.jsx';
import { useAuth } from './context/authcontext.jsx';

const BACKEND_URL = 'http://localhost:5000/api/portfolio';
const USER_ID = 'default-user';

// ==========================================
// 1. COMPONENT: MEGA MENU NAVBAR
// ==========================================
const Navbar = ({ view, setView, darkMode, setDarkMode, onSave, isSaving, saveStatus, setTemplate, onAboutClick, onManualSave, onClearData }) => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);

  const menuItems = {
    Creation: [
      { name: 'Minimalist', desc: 'Elite typography', icon: <Layout size={16} className="text-blue-500" />, action: () => { setTemplate('minimal'); setView('builder'); } },
      { name: 'Modern Cards', desc: 'Visual masonry', icon: <Grid size={16} className="text-purple-500" />, action: () => { setTemplate('cards'); setView('builder'); } },
      { name: 'Dev Terminal', desc: 'Engineering CLI', icon: <Terminal size={16} className="text-green-500" />, action: () => { setTemplate('terminal'); setView('builder'); } },
      { name: 'Aurora Flow', desc: 'Fluid gradients', icon: <Flame size={16} className="text-orange-500" />, action: () => { setTemplate('aurora'); setView('builder'); } },
      { name: 'Bento Grid', desc: 'Modular layout', icon: <BaggageClaim size={16} className="text-pink-500" />, action: () => { setTemplate('bento'); setView('builder'); } },
      { name: 'Cyber Neon', desc: 'High-tech vibes', icon: <Orbit size={16} className="text-cyan-500" />, action: () => { setTemplate('cyber'); setView('builder'); } }
    ],
    About: [
      { name: 'Our Vision', desc: 'Elite empowerment', icon: <Sparkles size={16} className="text-blue-600" />, action: () => onAboutClick('vision') },
      { name: 'Technology', desc: 'Modern Core Stack', icon: <Cpu size={16} className="text-gray-500" />, action: () => onAboutClick('tech') }
    ],
    Contact: [
      { name: 'LinkedIn', desc: 'Connect for networking', icon: <Linkedin size={16} className="text-blue-700" />, action: () => {} },
      { name: 'Email', desc: 'support@forgefolio.com', icon: <Mail size={16} className="text-red-500" />, action: () => {} }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setActiveMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-[100] w-full border-b border-gray-100 dark:border-gray-900 bg-white/70 dark:bg-black/70 backdrop-blur-3xl h-20 no-print">
      <div className="max-w-[1600px] mx-auto px-10 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg group-hover:scale-110 transition-all">
              <Briefcase size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter dark:text-white uppercase transition-colors group-hover:text-blue-600 font-['Poppins']">ForgeFolio</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {Object.keys(menuItems).map((key) => (
              <div key={key} className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] outline-none transition-all py-2 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 ${activeMenu === key ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  {key} <ChevronDown size={12} className={`transition-transform duration-300 ${activeMenu === key ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute top-[calc(100%+20px)] left-[-40px] ${key === 'Creation' ? 'w-[400px]' : 'w-[300px]'} bg-white dark:bg-[#0d0d0d] rounded-[2rem] border border-gray-100 dark:border-gray-900 shadow-2xl p-5 transition-all origin-top ${activeMenu === key ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}>
                  <div className={`grid ${key === 'Creation' ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                    {menuItems[key].map((item) => (
                      <div key={item.name} onClick={() => { item.action(); setActiveMenu(null); }} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
                        <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          {item.icon}
                        </div>
                        <div className="pt-0.5 text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest dark:text-white group-hover:text-blue-600 transition-colors">{item.name}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {view === 'builder' && (
            <>
              <button onClick={onSave} disabled={isSaving} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : (saveStatus === 'success' ? <CheckCircle size={14}/> : <Zap size={14} />)}
                <span className="uppercase tracking-widest">{saveStatus === 'success' ? 'Synced' : 'Sync'}</span>
              </button>
              <div className="flex gap-2">
                <button onClick={onManualSave} className="px-4 py-2 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-green-700 transition-all">
                  Save to Local
                </button>
                <button onClick={onClearData} className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-red-700 transition-all">
                  Clear All
                </button>
              </div>
            </>
          )}

          {/* Auth Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300">{user.name}</span>
                <button 
                  onClick={() => { logout(); setView('home'); }} 
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-red-700 transition-all flex items-center gap-2"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setView('login')} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition-all"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setView('signup')} 
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-purple-700 transition-all"
                >
                  Join
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// ==========================================
// 2. COMPONENT: TEMPLATE GALLERY
// ==========================================
const TemplateGallery = ({ selectedTemplate, onSelect }) => {
  const templates = [
    { id: 'minimal', name: 'Minimalist', description: 'Elite typography and negative space.', icon: <Layout size={18} />, preview: <div className="w-full h-full bg-white p-4 space-y-2"><div className="h-2 w-12 bg-gray-100 rounded"></div><div className="h-8 w-full bg-gray-50 rounded"></div></div> },
    { id: 'cards', name: 'Modern Cards', description: 'Modular masonry for visual stories.', icon: <Grid size={18} />, preview: <div className="w-full h-full bg-gray-50 p-4 grid grid-cols-2 gap-2"><div className="h-10 bg-white rounded shadow-sm"></div><div className="h-10 bg-white rounded shadow-sm"></div></div> },
    { id: 'terminal', name: 'Dev Terminal', description: 'Command-line engineering aesthetic.', icon: <Terminal size={18} />, preview: <div className="w-full h-full bg-black p-3 space-y-2"><div className="flex gap-1"><div className="w-1 h-1 rounded-full bg-red-500"></div><div className="w-1 h-1 rounded-full bg-green-500"></div></div><div className="h-6 w-full bg-green-900/10 rounded"></div></div> },
    { id: 'aurora', name: 'Aurora Flow', description: 'Fluid glassmorphism and motion.', icon: <Flame size={18} />, preview: <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-pink-500 p-4"><div className="w-full h-full backdrop-blur-md bg-white/20 rounded-2xl border border-white/30"></div></div> },
    { id: 'bento', name: 'Bento Grid', description: 'The industry standard modular layout.', icon: <BaggageClaim size={18} />, preview: <div className="w-full h-full bg-white p-3 grid grid-cols-3 grid-rows-2 gap-2"><div className="col-span-2 bg-gray-100 rounded-xl"></div><div className="bg-blue-50 rounded-xl"></div></div> },
    { id: 'cyber', name: 'Cyber Neon', description: 'Futuristic high-tech visual vibes.', icon: <Orbit size={18} />, preview: <div className="w-full h-full bg-[#050505] p-4 flex items-center justify-center"><div className="w-full h-full border border-cyan-500/50 rounded-xl flex items-center justify-center"><div className="h-1 w-8 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div></div></div> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-12 px-6">
      {templates.map((t) => (
        <div 
          key={t.id} 
          onClick={() => onSelect(t.id)} 
          className={`group cursor-pointer transform transition-all duration-300 rounded-[3rem] border-2 overflow-hidden bg-white dark:bg-[#0a0a0a] hover:scale-105 hover:shadow-2xl ${
            selectedTemplate === t.id ? 'border-blue-600 shadow-2xl scale-105' : 'border-gray-50 dark:border-gray-800 hover:border-blue-200'
          }`}
        >
          <div className="aspect-[16/11] bg-gray-50 dark:bg-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
            {t.preview}
            {selectedTemplate === t.id && (
              <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[1px] flex items-center justify-center">
                <CheckCircle2 size={40} className="text-blue-600 bg-white rounded-full p-2 shadow-xl animate-in zoom-in" />
              </div>
            )}
          </div>
          <div className="p-8 text-left space-y-2">
            <div className="flex items-center gap-2 font-black uppercase text-[11px] dark:text-white group-hover:text-blue-600 transition-colors">
              {t.icon}<span>{t.name}</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{t.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 3. MAIN HUB CONTROLLER (APP.JSX)
// ==========================================
export default function App() {
  const [view, setView] = useState('home'); 
  const [darkMode, setDarkMode] = useState(false);
  const [template, setTemplate] = useState('minimal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeAboutDetail, setActiveAboutDetail] = useState(null);

  // Global State for the Portfolio
  const [formData, setFormData] = useState({
    fullName: "Alex Rivera",
    title: "Lead Digital Architect",
    bio: "Pioneering high-impact digital ecosystems.",
    skills: [], // Initialize as empty array
    projects: [
      { id: 1, title: "Project Alpha", desc: "Description here", link: "" }
    ]
  });

  // Content for the Info Modals
  const aboutData = {
    vision: {
      title: "Our Vision",
      icon: <Sparkles className="text-blue-600" size={32} />,
      content: "Democratizing high-end design by providing the architectural foundation for every professional to showcase their narrative with absolute authority."
    },
    tech: {
      title: "Technology",
      icon: <Cpu className="text-gray-500" size={32} />,
      content: "Built on a high-performance React core with Tailwind CSS for modular aesthetics and Lucide for precise visual communication."
    }
  };

  // Sync with Backend on Load
  useEffect(() => {
    fetch(`${BACKEND_URL}/${USER_ID}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { 
        if(data && data.fullName) {
          setFormData(data);
          if (data.template) setTemplate(data.template);
        }
      })
      .catch(() => console.warn("Backend local session mode."));
  }, []);

  // State & Lifecycle (App.jsx)       // Add these inside your App component before the return statement

  // Task 1: Auto-load data on app start
  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing localStorage data", error);
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  // Task 2: Auto-save on every change
  useEffect(() => {
    localStorage.setItem("portfolioData", JSON.stringify(formData));
  }, [formData]); // Runs every time formData changes      

  // Save Functionality
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: USER_ID, portfolioData: { ...formData, template } })
      });
      if (res.ok) { 
        setSaveStatus('success'); 
        setTimeout(() => setSaveStatus(null), 2500); 
      }
    } catch (e) { 
      console.error("Save failure."); 
    }
    setIsSaving(false);
  };

  // Task 3: Manual Save Button Handler
  const handleManualSave = () => {
    localStorage.setItem("portfolioData", JSON.stringify(formData));
    alert("Data saved successfully!");
  };

  // Task 4: Clear Button Handler
  const handleClearData = () => {
    localStorage.removeItem("portfolioData");
    setFormData({
      fullName: "",
      title: "",
      bio: "",
      skills: [],
      projects: []
    });
  };

  // Dark Mode Side Effect
  useEffect(() => { 
    document.documentElement.classList.toggle('dark', darkMode); 
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-white dark:bg-[#050505] transition-colors duration-700 font-['Poppins'] selection:bg-blue-600 selection:text-white ${darkMode ? 'dark' : ''}`}>
      {/* GLOBAL NAVIGATION */}
      <Navbar 
        view={view} setView={setView} 
        darkMode={darkMode} setDarkMode={setDarkMode} 
        onSave={handleSave} isSaving={isSaving} saveStatus={saveStatus}
        setTemplate={setTemplate}
        onAboutClick={setActiveAboutDetail}
        onManualSave={handleManualSave}
        onClearData={handleClearData}
      />
      
      {/* ABOUT/TECH MODAL WINDOW */}
      {activeAboutDetail && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setActiveAboutDetail(null)}></div>
           <div className="relative w-full max-w-xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] p-12 text-left space-y-6 shadow-2xl">
              <button onClick={() => setActiveAboutDetail(null)} className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl inline-block shadow-sm">
                {aboutData[activeAboutDetail].icon}
              </div>
              <h2 className="text-4xl font-black tracking-tighter dark:text-white uppercase">
                {aboutData[activeAboutDetail].title}
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {aboutData[activeAboutDetail].content}
              </p>
              <button onClick={() => setActiveAboutDetail(null)} className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">Back to hub</button>
           </div>
        </div>
      )}

      <main className="max-w-[1600px] mx-auto">
        {/* VIEW 1: LANDING PAGE */}
        {view === 'home' ? (
          <div className="px-10 py-24">
            <div className="text-center mb-40 space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.5em] border border-blue-100 dark:border-blue-900/50 mx-auto">
                <Rocket size={16} /> Digital Architecture for the Next Generation
              </div>
              <h1 className="text-[7rem] md:text-[11rem] font-black tracking-tighter dark:text-white uppercase leading-[0.75]">Build <br/> <span className="text-blue-600">Authority.</span></h1>
              <p className="text-2xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                Architectural foundations for high-authority digital presence.
              </p>
              <button onClick={() => setView('builder')} className="mt-10 px-20 py-10 bg-blue-600 text-white rounded-[3rem] font-black text-3xl shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter italic">
                Open Workspace
              </button>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-900 pt-32">
               <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-400 text-center mb-20 uppercase">Select Foundation</h2>
               <TemplateGalleryComponent selectedTemplate={template} onSelect={(id) => { setTemplate(id); setView('builder'); }} />
            </div>
          </div>
        ) : view === 'login' ? (
          /* LOGIN PAGE */
          <AuthPages mode="login" setView={setView} />
        ) : view === 'signup' ? (
          /* SIGNUP PAGE */
          <AuthPages mode="signup" setView={setView} />
        ) : (
          /* VIEW 2: BUILDER WORKSPACE */
          <div className="flex flex-col xl:flex-row h-[calc(100vh-80px)] overflow-hidden">
            {/* Left: Input Panel */}
            <aside className="w-full xl:w-[540px] p-10 overflow-y-auto border-r dark:border-white/10 no-print bg-white dark:bg-[#050505] custom-scroll">
              <div className="flex items-center gap-2 mb-12 text-blue-600 font-black text-[11px] uppercase tracking-[0.4em]">
                <ArrowLeft size={16} className="cursor-pointer hover:-translate-x-1 transition-transform" onClick={() => setView('home')} /> 
                Workspace Active
              </div>
              <Form formData={formData} setFormData={setFormData} />
            </aside>

            {/* Right: Live Preview */}
            <section className="flex-1 bg-gray-50 dark:bg-[#080808] p-10 lg:p-24 overflow-y-auto relative custom-scroll">
              <div className="max-w-[1000px] mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-[5rem] overflow-hidden transition-all duration-1000 animate-in zoom-in-95">
                <Preview formData={formData} template={template} />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3 no-print">
                <button onClick={handleManualSave} className="px-4 py-3 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-green-700 transition-all">
                  Save to Local
                </button>
                <button onClick={handleClearData} className="px-4 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-red-700 transition-all">
                  Clear All
                </button>
              </div>
              <div className="mt-10 flex justify-center pb-20 no-print">
                <button onClick={() => window.print()} className="flex items-center gap-4 px-12 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-[12px] uppercase shadow-2xl transition-transform hover:scale-105">
                  <Download size={20}/> Export high-res PDF
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .dark .custom-scroll::-webkit-scrollbar-thumb { background: #1f2937; }
        * { font-family: 'Poppins', sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @media print { .no-print { display: none !important; } }
      `}</style>
    </div>
  );
}