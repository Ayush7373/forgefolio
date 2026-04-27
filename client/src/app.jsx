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
  Globe
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000/api/portfolio';
const USER_ID = 'default-user';

// ==========================================
// 1. COMPONENT: MEGA MENU NAVBAR
// ==========================================
const Navbar = ({ view, setView, darkMode, setDarkMode, onSave, isSaving, saveStatus, setTemplate, onAboutClick }) => {
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
             <button onClick={onSave} disabled={isSaving} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
               {isSaving ? <Loader2 size={14} className="animate-spin" /> : (saveStatus === 'success' ? <CheckCircle size={14}/> : <Zap size={14} />)}
               <span className="uppercase tracking-widest">{saveStatus === 'success' ? 'Synced' : 'Sync'}</span>
             </button>
          )}
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
// 3. COMPONENT: EDITOR FORM
// ==========================================
const Form = ({ formData, setFormData }) => {
  if (!formData) return <div className="p-10 text-center text-gray-400 font-black uppercase text-[10px] tracking-widest">Initializing Data...</div>;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };
  
  const handleImageUpload = (e, type, projectId = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'profile') setFormData(prev => ({ ...prev, profileImage: reader.result }));
      else if (type === 'project') {
        setFormData(prev => ({
          ...prev,
          projects: (prev.projects || []).map(p => p.id === projectId ? { ...p, image: reader.result } : p)
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const inputClass = "w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium";

  return (
    <div className="space-y-12">
      <section className="space-y-6 text-left">
        <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-5">
          <Sparkles size={18} className="text-blue-500" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] dark:text-white">Identity</h3>
        </div>
        <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-[#0a0a0a] rounded-[2.5rem]">
          <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-4 shadow-xl">
            {formData.profileImage ? <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" /> : <User className="w-full h-full p-5 text-gray-400" />}
          </div>
          <label className="px-5 py-2 bg-white dark:bg-gray-800 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm cursor-pointer hover:shadow-md transition-all">Update Photo<input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} /></label>
        </div>
        <input name="fullName" value={formData.fullName || ''} onChange={handleChange} className={inputClass} placeholder="Full Name" />
        <input name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} placeholder="Architectural Title" />
        <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows="4" className={inputClass} placeholder="Narrative bio..." />
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center border-b dark:border-gray-800 pb-5 text-left">
           <div className="flex items-center gap-3"><Briefcase size={18} className="text-green-500" /><h3 className="text-[11px] font-black uppercase tracking-[0.4em] dark:text-white">Portfolio</h3></div>
           <button onClick={() => setFormData(prev => ({ ...prev, projects: [...(prev.projects || []), { id: Date.now(), title: "", desc: "", image: "" }] }))} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Add Project</button>
        </div>
        {(formData.projects || []).map((p) => (
           <div key={p.id} className="p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d0d0d] shadow-sm relative text-left group">
              <button onClick={() => setFormData(prev => ({ ...prev, projects: (prev.projects || []).filter(pr => pr.id !== p.id) }))} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              <div className="space-y-4">
                 <input value={p.title || ''} onChange={(e) => setFormData({...formData, projects: formData.projects.map(pj => pj.id === p.id ? {...pj, title: e.target.value} : pj)})} placeholder="Title" className="w-full bg-transparent font-black text-lg outline-none dark:text-white" />
                 <textarea value={p.desc || ''} onChange={(e) => setFormData({...formData, projects: formData.projects.map(pj => pj.id === p.id ? {...pj, desc: e.target.value} : pj)})} placeholder="Summary..." className="w-full bg-transparent text-sm text-gray-500 outline-none leading-relaxed resize-none" />
                 <label className="block w-full py-2 border border-dashed border-gray-100 dark:border-gray-800 text-gray-400 text-center rounded-xl text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-all">Set Visual<input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'project', p.id)} /></label>
              </div>
           </div>
        ))}
      </section>
    </div>
  );
};

// ==========================================
// 4. COMPONENT: RENDER ENGINE
// ==========================================
const Preview = ({ data, template }) => {
  if (!data) return <div className="p-10 text-center text-gray-400 font-black uppercase text-[10px] tracking-widest">Rendering...</div>;

  const containerClass = "max-w-4xl mx-auto p-8 w-full text-left";

  const Minimal = () => (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-full w-full overflow-hidden">
      <div className={`${containerClass} space-y-16`}>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-6 flex-1">
            <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none dark:text-white break-words">{String(data.fullName || "NAME")}</h1>
            <p className="text-xl md:text-2xl text-blue-600 font-bold uppercase tracking-tight break-words">{String(data.title || "EXPERT")}</p>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed whitespace-pre-line break-words">{String(data.bio || "")}</p>
          </div>
          {data.profileImage && <img src={data.profileImage} className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] object-cover shadow-2xl ring-4 ring-gray-50 dark:ring-white/5 shrink-0" alt="Profile" />}
        </header>
        <div className="space-y-20">
          {(data.projects || []).map(p => (
            <div key={p.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start group">
              <div className="aspect-video bg-gray-50 dark:bg-[#111] rounded-3xl overflow-hidden shadow-md">
                 {p.image ? <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={p.title} /> : <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-800"><ImageIcon size={40} /></div>}
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-black uppercase dark:text-white break-words group-hover:text-blue-600 transition-colors leading-none">{String(p.title || "WORK")}</h3>
                 <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line break-words">{String(p.desc || "")}</p>
                 <div className="pt-2 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">View Details <MoveRight size={14}/></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Aurora = () => (
    <div className="min-h-full bg-slate-950 text-white relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-pink-500/10 animate-pulse pointer-events-none"></div>
      <div className={`${containerClass} relative z-10 space-y-12 md:space-y-16`}>
        <div className="backdrop-blur-3xl bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none break-words">{String(data.fullName || "")}</h1>
          <p className="text-lg md:text-xl font-medium text-purple-300 uppercase break-words">{String(data.title || "")}</p>
          <p className="text-lg leading-relaxed opacity-80 whitespace-pre-line break-words font-light">{String(data.bio || "")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {(data.projects || []).map(p => (
             <div key={p.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col h-full overflow-hidden">
                <h3 className="text-2xl font-black uppercase mb-3 break-words text-purple-200">{String(p.title || "")}</h3>
                <p className="opacity-60 leading-relaxed whitespace-pre-line break-words text-sm">{String(p.desc || "")}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const Bento = () => (
    <div className="bg-gray-100 dark:bg-black min-h-full w-full">
      <div className={`${containerClass} grid grid-cols-1 md:grid-cols-12 gap-6`}>
        <div className="md:col-span-8 bg-white dark:bg-[#0d0d0d] p-10 rounded-[2.5rem] flex flex-col justify-end border dark:border-white/5 overflow-hidden min-h-[300px]">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4 dark:text-white break-words">{String(data.fullName || "")}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium whitespace-pre-line break-words">{String(data.bio || "")}</p>
        </div>
        <div className="md:col-span-4 bg-blue-600 text-white p-10 rounded-[2.5rem] flex items-center justify-center shadow-lg text-center">
           <p className="text-2xl md:text-3xl font-black uppercase tracking-widest break-words leading-tight">{String(data.title || "ARCH")}</p>
        </div>
        {(data.projects || []).map((p, i) => (
          <div key={p.id} className={`rounded-[2.5rem] p-10 shadow-sm border dark:border-white/5 flex flex-col overflow-hidden ${
            i === 0 ? 'md:col-span-7 bg-white dark:bg-[#111]' : i === 1 ? 'md:col-span-5 bg-gray-900 text-white' : 'md:col-span-12 bg-blue-100 dark:bg-blue-900/20'
          }`}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 break-words dark:text-white">{String(p.title || "MODULAR")}</h3>
            <p className="text-sm opacity-70 leading-relaxed whitespace-pre-line break-words font-medium">{String(p.desc || "")}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const Cyber = () => (
    <div className="bg-[#050505] text-[#06b6d4] min-h-full w-full font-mono py-8">
      <div className={`${containerClass} border border-cyan-500/30 p-10 rounded-2xl shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] space-y-12`}>
        <header className="border-b border-cyan-500/30 pb-8 space-y-4 text-left">
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-50">Identity_System // Online</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white break-words tracking-tighter italic">{String(data.fullName || "")}</h1>
          <p className="text-lg md:text-xl tracking-[0.4em] text-cyan-400 font-bold uppercase break-words">{String(data.title || "")}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <p className="leading-relaxed text-base text-gray-300 border-l-2 border-cyan-500/50 pl-6 whitespace-pre-line break-words">{String(data.bio || "")}</p>
            <div className="flex flex-wrap gap-2 pt-4">
              {(data.skills || []).map((s, i) => <span key={i} className="px-3 py-1 border border-cyan-500/30 text-[10px] break-all">[{String(s)}]</span>)}
            </div>
          </section>
          <section className="space-y-6">
            {(data.projects || []).map(p => (
              <div key={p.id} className="p-6 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all overflow-hidden group">
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 uppercase break-words">{String(p.title || "FRAGMENT")}</h3>
                <p className="text-xs opacity-50 whitespace-pre-line break-words leading-relaxed">{String(p.desc || "")}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );

  const TerminalTemplate = () => (
    <div className="bg-[#0d1117] text-[#c9d1d9] font-mono min-h-full w-full py-8">
      <div className={`${containerClass} space-y-12`}>
        <div className="flex gap-2 pb-6 border-b border-[#30363d]">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <section className="space-y-4">
          <p className="text-green-500 text-xs"># whoami</p>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase break-words tracking-tight">{String(data.fullName || "")}</h1>
          <p className="text-blue-400 text-sm tracking-[0.2em] font-bold break-words">{String(data.title || "ENGINEER")}</p>
        </section>
        <section className="space-y-4">
          <p className="text-green-500 text-xs"># cat bio.txt</p>
          <p className="opacity-80 leading-relaxed border-l-2 border-gray-700 pl-6 whitespace-pre-line break-words">{String(data.bio || "")}</p>
        </section>
        <section className="space-y-6">
          <p className="text-green-500 text-xs"># ls ./projects</p>
          <div className="grid grid-cols-1 gap-4">
            {(data.projects || []).map(p => (
              <div key={p.id} className="p-6 border border-[#30363d] rounded-xl bg-[#161b22] hover:bg-[#1f242c] transition-colors overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-2 break-words">{String(p.title || "")}</h3>
                <p className="text-xs opacity-60 whitespace-pre-line break-words">{String(p.desc || "")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const CardsTemplate = () => (
    <div className="bg-gray-50 dark:bg-black min-h-full w-full py-8">
      <div className={`${containerClass} space-y-12`}>
        <div className="bg-white dark:bg-[#0d0d0d] p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center shadow-sm border dark:border-white/10">
          <div className="flex-1 space-y-6 w-full text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none dark:text-white italic break-words">{String(data.fullName || "")}</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium whitespace-pre-line break-words">{String(data.bio || "")}</p>
          </div>
          {data.profileImage && <img src={data.profileImage} className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-xl ring-4 ring-gray-100 dark:ring-white/5 shrink-0" alt="Profile" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.projects || []).map(p => (
             <div key={p.id} className="bg-white dark:bg-[#0d0d0d] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all border dark:border-white/10 flex flex-col group">
                <div className="aspect-video bg-gray-100 dark:bg-[#111] shrink-0 overflow-hidden">
                  {p.image ? <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={p.title} /> : <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-800"><ImageIcon size={32}/></div>}
                </div>
                <div className="p-8 space-y-3 flex-1">
                  <h3 className="text-2xl font-black uppercase dark:text-white break-words group-hover:text-blue-600 transition-colors">{String(p.title || "WORK")}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line break-words">{String(p.desc || "")}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );

  switch(template) {
    case 'aurora': return <Aurora />;
    case 'bento': return <Bento />;
    case 'cyber': return <Cyber />;
    case 'terminal': return <TerminalTemplate />;
    case 'cards': return <CardsTemplate />;
    default: return <Minimal />;
  }
};

// ==========================================
// 5. MAIN HUB CONTROLLER (APP.JSX)
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
                <Rocket size={16} /> Elite Enterprise v3.9.4
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
               <TemplateGallery selectedTemplate={template} onSelect={(id) => { setTemplate(id); setView('builder'); }} />
            </div>
          </div>
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
                <Preview data={formData} template={template} />
              </div>
              <div className="mt-20 flex justify-center pb-20 no-print">
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