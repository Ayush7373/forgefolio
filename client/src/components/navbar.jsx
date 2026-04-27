import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  Layout, 
  Grid, 
  Terminal, 
  ChevronDown, 
  Zap, 
  Shield, 
  Cpu, 
  Sparkles, 
  Linkedin, 
  Mail, 
  Sun, 
  Moon,
  Loader2,
  CheckCircle,
  BaggageClaim,
  Flame,
  Orbit
} from 'lucide-react';

/**
 * REFINED MEGA MENU NAVBAR v3.9.4
 * Features: Toggleable Mega Menu, Resolution fixes for LinkedIn/Mail icons,
 * and direct integration with the 6 dashing templates.
 */
const Navbar = ({ 
  view, 
  setView, 
  darkMode, 
  setDarkMode, 
  onSave, 
  isSaving, 
  saveStatus, 
  setTemplate, 
  onAboutClick 
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);

  const menuItems = {
    Creation: [
      { name: 'Minimalist', desc: 'Elite typography focus', icon: <Layout size={16} className="text-blue-500" />, action: () => { setTemplate('minimal'); setView('builder'); } },
      { name: 'Modern Cards', desc: 'Structured project grid', icon: <Grid size={16} className="text-purple-500" />, action: () => { setTemplate('cards'); setView('builder'); } },
      { name: 'Dev Terminal', desc: 'Raw engineering aesthetic', icon: <Terminal size={16} className="text-green-500" />, action: () => { setTemplate('terminal'); setView('builder'); } },
      { name: 'Aurora Flow', desc: 'Fluid glassmorphism motion', icon: <Flame size={16} className="text-orange-500" />, action: () => { setTemplate('aurora'); setView('builder'); } },
      { name: 'Bento Grid', desc: 'Modern layout standard', icon: <BaggageClaim size={16} className="text-pink-500" />, action: () => { setTemplate('bento'); setView('builder'); } },
      { name: 'Cyber Neon', desc: 'Futuristic high-tech vibes', icon: <Orbit size={16} className="text-cyan-500" />, action: () => { setTemplate('cyber'); setView('builder'); } }
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
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleMenu = (name) => setActiveMenu(activeMenu === name ? null : name);

  return (
    <nav ref={navRef} className="sticky top-0 z-[100] w-full border-b border-gray-100 dark:border-gray-900 bg-white/70 dark:bg-black/70 backdrop-blur-3xl h-20 no-print font-['Poppins']">
      <div className="max-w-[1600px] mx-auto px-10 h-full flex items-center justify-between">
        <div className="flex items-center gap-14">
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setView('home'); setActiveMenu(null); }}>
            <div className="bg-blue-600 text-white p-2 rounded-[1rem] shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] transition-all group-hover:scale-110">
              <Briefcase size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter dark:text-white uppercase transition-colors group-hover:text-blue-600">ForgeFolio</span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden xl:flex items-center gap-6">
            {Object.keys(menuItems).map((key) => (
              <div key={key} className="relative">
                <button 
                  onClick={() => handleToggleMenu(key)}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all outline-none py-2 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 ${activeMenu === key ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                >
                  {key} <ChevronDown size={12} className={`transition-transform duration-300 ${activeMenu === key ? 'rotate-180' : ''}`} />
                </button>

                {/* MEGA MENU PANEL */}
                <div className={`absolute top-[calc(100%+20px)] left-[-40px] ${key === 'Creation' ? 'w-[420px]' : 'w-[300px]'} bg-white dark:bg-[#0d0d0d] rounded-[2rem] border border-gray-100 dark:border-gray-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] p-5 transition-all duration-300 origin-top ${activeMenu === key ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}>
                  <div className="space-y-3 text-left">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{key} Center</p>
                    <div className={`grid ${key === 'Creation' ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-1`}>
                      {menuItems[key].map((item) => (
                        <div 
                          key={item.name} 
                          onClick={() => { item.action(); setActiveMenu(null); }} 
                          className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group transition-all"
                        >
                          <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            {item.icon}
                          </div>
                          <div className="pt-0.5">
                            <p className="text-[10px] font-black uppercase tracking-widest dark:text-white group-hover:text-blue-600 transition-colors">{item.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          {view === 'builder' && (
             <button onClick={onSave} disabled={isSaving} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
               {isSaving ? <Loader2 size={14} className="animate-spin" /> : (saveStatus === 'success' ? <CheckCircle size={14}/> : <Zap size={14} />)}
               <span className="uppercase tracking-widest">{saveStatus === 'success' ? 'Synced' : 'Sync'}</span>
             </button>
          )}
          <button onClick={() => setDarkMode(!darkMode)} className="p-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all active:scale-90">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;