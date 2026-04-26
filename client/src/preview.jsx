import React from 'react';
import { 
  Terminal, 
  Flame, 
  Orbit, 
  BaggageClaim, 
  Image as ImageIcon, 
  MoveRight,
  Mail,
  Linkedin,
  Github,
  Globe,
  ExternalLink
} from 'lucide-react';

/**
 * PREVIEW ENGINE v3.9.4
 * Standalone modular component for live portfolio rendering.
 * Features: 6 foundations, newline support, layout stability, and data guards.
 */
const Preview = ({ data, template }) => {
  // CRITICAL: Data Guard to prevent rendering crashes during initialization
  if (!data) {
    return (
      <div className="p-10 text-center text-gray-400 font-black uppercase text-[10px] tracking-widest">
        Initializing Render Engine...
      </div>
    );
  }

  // Centered container to ensure content stays within the workspace bounds
  const containerClass = "max-w-4xl mx-auto p-8 w-full text-left";

  // 1. MINIMALIST FOUNDATION
  const Minimal = () => (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-full w-full overflow-hidden">
      <div className={`${containerClass} space-y-16`}>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-6 flex-1">
            <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none dark:text-white break-words">
              {String(data.fullName || "NAME")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 font-bold uppercase tracking-tight break-words">
              {String(data.title || "EXPERT")}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed whitespace-pre-line break-words">
              {String(data.bio || "")}
            </p>
          </div>
          {data.profileImage && (
            <img 
              src={data.profileImage} 
              className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] object-cover shadow-2xl ring-4 ring-gray-50 dark:ring-white/5 shrink-0" 
              alt="Profile" 
            />
          )}
        </header>
        <div className="space-y-20">
          {(data.projects || []).map(p => (
            <div key={p.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start group">
              <div className="aspect-video bg-gray-50 dark:bg-[#111] rounded-3xl overflow-hidden shadow-md">
                 {p.image ? (
                   <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.title} />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-800">
                     <ImageIcon size={40} />
                   </div>
                 )}
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-black uppercase dark:text-white break-words group-hover:text-blue-600 transition-colors leading-none">
                   {String(p.title || "WORK")}
                 </h3>
                 <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line break-words">
                   {String(p.desc || "")}
                 </p>
                 <div className="pt-2 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                   View Details <MoveRight size={14}/>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. AURORA FLOW FOUNDATION
  const Aurora = () => (
    <div className="min-h-full bg-slate-950 text-white relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-pink-500/10 animate-pulse pointer-events-none"></div>
      <div className={`${containerClass} relative z-10 space-y-12 md:space-y-16`}>
        <div className="backdrop-blur-3xl bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none break-words">
            {String(data.fullName || "")}
          </h1>
          <p className="text-lg md:text-xl font-medium text-purple-300 uppercase break-words">
            {String(data.title || "")}
          </p>
          <p className="text-lg leading-relaxed opacity-80 whitespace-pre-line break-words font-light">
            {String(data.bio || "")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {(data.projects || []).map(p => (
             <div key={p.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col h-full overflow-hidden">
                <h3 className="text-2xl font-black uppercase mb-3 break-words text-purple-200">
                  {String(p.title || "")}
                </h3>
                <p className="opacity-60 leading-relaxed whitespace-pre-line break-words text-sm">
                  {String(p.desc || "")}
                </p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  // 3. BENTO GRID FOUNDATION
  const Bento = () => (
    <div className="bg-gray-100 dark:bg-black min-h-full w-full">
      <div className={`${containerClass} grid grid-cols-1 md:grid-cols-12 gap-6`}>
        <div className="md:col-span-8 bg-white dark:bg-[#0d0d0d] p-10 rounded-[2.5rem] flex flex-col justify-end border dark:border-white/5 overflow-hidden min-h-[300px]">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4 dark:text-white break-words">
            {String(data.fullName || "")}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium whitespace-pre-line break-words">
            {String(data.bio || "")}
          </p>
        </div>
        <div className="md:col-span-4 bg-blue-600 text-white p-10 rounded-[2.5rem] flex items-center justify-center shadow-lg text-center">
           <p className="text-2xl md:text-3xl font-black uppercase tracking-widest break-words leading-tight">
             {String(data.title || "ARCH")}
           </p>
        </div>
        {(data.projects || []).map((p, i) => (
          <div key={p.id} className={`rounded-[2.5rem] p-10 shadow-sm border dark:border-white/5 flex flex-col overflow-hidden ${
            i === 0 ? 'md:col-span-7 bg-white dark:bg-[#111]' : 
            i === 1 ? 'md:col-span-5 bg-gray-900 text-white' : 
            'md:col-span-12 bg-blue-100 dark:bg-blue-900/20'
          }`}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 break-words dark:text-white">
              {String(p.title || "MODULAR")}
            </h3>
            <p className="text-sm opacity-70 leading-relaxed whitespace-pre-line break-words font-medium">
              {String(p.desc || "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // 4. CYBER NEON FOUNDATION
  const Cyber = () => (
    <div className="bg-[#050505] text-[#06b6d4] min-h-full w-full font-mono py-8">
      <div className={`${containerClass} border border-cyan-500/30 p-10 rounded-2xl shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] space-y-12`}>
        <header className="border-b border-cyan-500/30 pb-8 space-y-4 text-left">
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-50">Identity_System // Online</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white break-words tracking-tighter italic">
            {String(data.fullName || "")}
          </h1>
          <p className="text-lg md:text-xl tracking-[0.4em] text-cyan-400 font-bold uppercase break-words">
            {String(data.title || "")}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <p className="leading-relaxed text-base text-gray-300 border-l-2 border-cyan-500/50 pl-6 whitespace-pre-line break-words">
              {String(data.bio || "")}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {(data.skills || []).map((s, i) => (
                <span key={i} className="px-3 py-1 border border-cyan-500/30 text-[10px] break-all">
                  [{String(s)}]
                </span>
              ))}
            </div>
          </section>
          <section className="space-y-6">
            {(data.projects || []).map(p => (
              <div key={p.id} className="p-6 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all overflow-hidden group">
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 uppercase break-words">
                  {String(p.title || "FRAGMENT")}
                </h3>
                <p className="text-xs opacity-50 whitespace-pre-line break-words leading-relaxed">
                  {String(p.desc || "")}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );

  // 5. DEV TERMINAL FOUNDATION
  const TerminalTemplate = () => (
    <div className="bg-[#0d1117] text-[#c9d1d9] font-mono min-h-full w-full py-8">
      <div className={`${containerClass} space-y-12`}>
        <div className="flex gap-2 pb-6 border-b border-[#30363d]">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <section className="space-y-4">
          <p className="text-green-500 text-xs font-bold tracking-widest"># WHOAMI</p>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase break-words tracking-tight">
            {String(data.fullName || "")}
          </h1>
          <p className="text-blue-400 text-sm tracking-[0.2em] font-bold break-words">
            {String(data.title || "ENGINEER")}
          </p>
        </section>
        <section className="space-y-4">
          <p className="text-green-500 text-xs font-bold tracking-widest"># CAT BIO.TXT</p>
          <p className="opacity-80 leading-relaxed border-l-4 border-[#30363d] pl-6 whitespace-pre-line break-words text-lg">
            {String(data.bio || "")}
          </p>
        </section>
        <section className="space-y-6">
          <p className="text-green-500 text-xs font-bold tracking-widest"># LS ./PROJECTS</p>
          <div className="grid grid-cols-1 gap-4">
            {(data.projects || []).map(p => (
              <div key={p.id} className="p-6 border border-[#30363d] rounded-xl bg-[#161b22] hover:bg-[#1f242c] transition-colors overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-2 break-words">
                  {String(p.title || "")}
                </h3>
                <p className="text-xs opacity-60 whitespace-pre-line break-words leading-relaxed">
                  {String(p.desc || "")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  // 6. MODERN CARDS FOUNDATION
  const CardsTemplate = () => (
    <div className="bg-gray-50 dark:bg-black min-h-full w-full py-8">
      <div className={`${containerClass} space-y-12`}>
        <div className="bg-white dark:bg-[#0d0d0d] p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center shadow-sm border dark:border-white/10">
          <div className="flex-1 space-y-6 w-full text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none dark:text-white italic break-words">
              {String(data.fullName || "")}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium whitespace-pre-line break-words">
              {String(data.bio || "")}
            </p>
          </div>
          {data.profileImage && (
            <img src={data.profileImage} className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-xl ring-4 ring-gray-100 dark:ring-white/5 shrink-0" alt="Profile" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.projects || []).map(p => (
             <div key={p.id} className="bg-white dark:bg-[#0d0d0d] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all border dark:border-white/10 flex flex-col group">
                <div className="aspect-video bg-gray-100 dark:bg-[#111] shrink-0 overflow-hidden">
                  {p.image ? (
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={p.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-800">
                      <ImageIcon size={32}/>
                    </div>
                  )}
                </div>
                <div className="p-8 space-y-3 flex-1">
                  <h3 className="text-2xl font-black uppercase dark:text-white break-words group-hover:text-blue-600 transition-colors">
                    {String(p.title || "WORK")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line break-words">
                    {String(p.desc || "")}
                  </p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Template Switching Logic
  switch(template) {
    case 'aurora': return <Aurora />;
    case 'bento': return <Bento />;
    case 'cyber': return <Cyber />;
    case 'terminal': return <TerminalTemplate />;
    case 'cards': return <CardsTemplate />;
    default: return <Minimal />;
  }
};

export default Preview;