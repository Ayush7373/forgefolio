import React from 'react';
import { Layout, Grid, Terminal, Flame, BaggageClaim, Orbit, CheckCircle2 } from 'lucide-react';

export default function TemplateGallery({ selectedTemplate, onSelect }) {
  const templates = [
    { 
      id: 'minimal', 
      name: 'Minimalist', 
      desc: 'Elite Typography', 
      icon: <Layout size={18} />,
      preview: (
        <div className="w-full h-full bg-white p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
            <div className="space-y-1 w-full">
              <div className="h-2 w-1/2 bg-gray-900 rounded-full" />
              <div className="h-1 w-1/3 bg-gray-300 rounded-full" />
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 rounded-full" />
          <div className="h-1 w-full bg-gray-100 rounded-full" />
          <div className="mt-2 h-16 w-full bg-gray-50 rounded-2xl border border-gray-100 flex flex-col p-2 gap-2">
            <div className="h-8 w-full bg-gray-200 rounded-lg" />
            <div className="h-1 w-1/2 bg-gray-300 rounded-full" />
          </div>
        </div>
      )
    },
    { 
      id: 'terminal', 
      name: 'Dev Terminal', 
      desc: 'CLI Engineering', 
      icon: <Terminal size={18} />,
      preview: (
        <div className="w-full h-full bg-[#0d1117] p-3 font-mono border-t-[10px] border-[#161b22]">
          <div className="flex gap-1.5 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-[8px] text-green-400 opacity-70">➜</span>
              <div className="h-1.5 w-1/2 bg-green-400/20 rounded" />
            </div>
            <div className="h-1.5 w-3/4 bg-blue-400/20 rounded ml-4" />
            <div className="flex gap-2">
              <span className="text-[8px] text-green-400 opacity-70">➜</span>
              <div className="h-1.5 w-1/3 bg-green-400/20 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2 ml-4">
              <div className="h-4 bg-gray-700/30 rounded border border-gray-700/50" />
              <div className="h-4 bg-gray-700/30 rounded border border-gray-700/50" />
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'cards', 
      name: 'Modern Cards', 
      desc: 'Visual Masonry', 
      icon: <Grid size={18} />,
      preview: (
        <div className="w-full h-full bg-gray-100 p-4">
          <div className="h-3 w-1/2 bg-gray-300 rounded-full mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-14 bg-white rounded-xl shadow-sm border border-gray-200/50 p-1.5 space-y-1.5">
                <div className="h-6 w-full bg-gray-100 rounded-lg" />
                <div className="h-1 w-3/4 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'aurora', 
      name: 'Aurora Flow', 
      desc: 'Fluid Gradients', 
      icon: <Flame size={18} />,
      preview: (
        <div className="w-full h-full bg-[#020617] relative overflow-hidden flex items-center justify-center p-4">
          {/* Animated Gradient Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 blur-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
          
          <div className="relative z-10 w-full h-full backdrop-blur-md bg-white/10 border border-white/20 rounded-[2rem] p-4 flex flex-col gap-3">
            <div className="h-4 w-3/4 bg-white/30 rounded-lg" />
            <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
            <div className="mt-auto grid grid-cols-2 gap-2">
              <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
              <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'bento', 
      name: 'Bento Grid', 
      desc: 'Module System', 
      icon: <BaggageClaim size={18} />,
      preview: (
        <div className="w-full h-full bg-white p-3 grid grid-cols-3 grid-rows-3 gap-2">
          <div className="col-span-2 row-span-2 bg-gray-100 rounded-2xl p-2 flex flex-col justify-end">
             <div className="h-3 w-3/4 bg-gray-300 rounded-full" />
          </div>
          <div className="bg-blue-600 rounded-2xl flex items-center justify-center">
            <div className="w-4 h-4 bg-white/30 rounded-full" />
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100" />
          <div className="col-span-2 bg-gray-900 rounded-2xl p-2 space-y-1">
             <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
             <div className="h-1.5 w-1/3 bg-white/10 rounded-full" />
          </div>
        </div>
      )
    },
    { 
      id: 'cyber', 
      name: 'Cyber Neon', 
      desc: 'Neon Cyberpunk', 
      icon: <Orbit size={18} />,
      preview: (
        <div className="w-full h-full bg-black p-4 border border-cyan-500/20 flex flex-col gap-4 relative">
          <div className="absolute top-0 right-0 p-2 text-[6px] text-cyan-500/30 font-mono">SYS_V3.9</div>
          <header className="space-y-2 border-b border-cyan-500/20 pb-3">
            <div className="h-3 w-3/4 bg-white/10 rounded shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
            <div className="h-1 w-1/3 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
          </header>
          <div className="space-y-3">
             <div className="h-1 w-full bg-cyan-500/10 rounded-full" />
             <div className="grid grid-cols-2 gap-2">
                <div className="h-12 border border-cyan-500/30 bg-cyan-500/5 rounded-lg flex flex-col p-1.5 gap-1">
                   <div className="h-1.5 w-full bg-white/10 rounded" />
                   <div className="h-1 w-1/2 bg-cyan-500/40 rounded" />
                </div>
                <div className="h-12 border border-cyan-500/30 bg-cyan-500/5 rounded-lg flex flex-col p-1.5 gap-1">
                   <div className="h-1.5 w-full bg-white/10 rounded" />
                   <div className="h-1 w-1/2 bg-cyan-500/40 rounded" />
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-12 px-6">
      {templates.map((t) => (
        <div 
          key={t.id} 
          onClick={() => onSelect(t.id)}
          className={`group cursor-pointer transform transition-all duration-500 rounded-[2.5rem] border-2 overflow-hidden bg-white dark:bg-[#0a0a0a] hover:scale-[1.02] hover:shadow-2xl ${
            selectedTemplate === t.id 
            ? 'border-blue-600 shadow-2xl scale-[1.02]' 
            : 'border-gray-50 dark:border-gray-900 hover:border-blue-300'
          }`}
        >
          {/* PREVIEW IMAGE AREA */}
          <div className="aspect-[16/10] w-full bg-gray-100 dark:bg-[#111] overflow-hidden relative">
            {t.preview}
            {/* SELECTED OVERLAY */}
            {selectedTemplate === t.id && (
              <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-white rounded-full p-2 shadow-xl animate-in zoom-in duration-300">
                  <CheckCircle2 size={24} className="text-blue-600" />
                </div>
              </div>
            )}
          </div>

          {/* TEMPLATE INFO */}
          <div className="p-8 text-left space-y-2 border-t border-gray-100 dark:border-gray-900">
            <div className="flex items-center gap-2 font-black uppercase text-[11px] dark:text-white tracking-widest group-hover:text-blue-600 transition-colors">
              {t.icon}
              <span>{t.name}</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
              {t.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}