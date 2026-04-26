import React from 'react';
import { 
  Layout, 
  Grid, 
  Terminal, 
  CheckCircle2, 
  Flame, 
  BaggageClaim, 
  Orbit 
} from 'lucide-react';

/**
 * TEMPLATE GALLERY v3.9.4
 * Features: High-authority selection grid, smooth hover transitions,
 * and synchronized ID mapping for the Preview Render Engine.
 */
const TemplateGallery = ({ selectedTemplate, onSelect }) => {
  const templates = [
    { 
      id: 'minimal', 
      name: 'Minimalist', 
      description: 'Elite typography and architectural negative space.', 
      icon: <Layout size={18} />, 
      preview: (
        <div className="w-full h-full bg-white p-4 space-y-2">
          <div className="h-2 w-12 bg-gray-100 rounded"></div>
          <div className="h-8 w-full bg-gray-50 rounded"></div>
        </div>
      ) 
    },
    { 
      id: 'cards', 
      name: 'Modern Cards', 
      description: 'Modular masonry optimized for visual storytellers.', 
      icon: <Grid size={18} />, 
      preview: (
        <div className="w-full h-full bg-gray-50 p-4 grid grid-cols-2 gap-2">
          <div className="h-10 bg-white rounded shadow-sm"></div>
          <div className="h-10 bg-white rounded shadow-sm"></div>
        </div>
      ) 
    },
    { 
      id: 'terminal', 
      name: 'Dev Terminal', 
      description: 'Low-level engineering CLI aesthetic for developers.', 
      icon: <Terminal size={18} />, 
      preview: (
        <div className="w-full h-full bg-black p-3 space-y-2">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-red-500"></div>
            <div className="w-1 h-1 rounded-full bg-green-500"></div>
          </div>
          <div className="h-6 w-full bg-green-900/10 rounded border border-green-900/20"></div>
        </div>
      ) 
    },
    { 
      id: 'aurora', 
      name: 'Aurora Flow', 
      description: 'Fluid glassmorphism motion and vibrant gradients.', 
      icon: <Flame size={18} />, 
      preview: (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
          <div className="w-full h-full backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 shadow-inner"></div>
        </div>
      ) 
    },
    { 
      id: 'bento', 
      name: 'Bento Grid', 
      description: 'The industry-standard modular grid system.', 
      icon: <BaggageClaim size={18} />, 
      preview: (
        <div className="w-full h-full bg-white p-3 grid grid-cols-3 grid-rows-2 gap-2">
          <div className="col-span-2 bg-gray-100 rounded-xl"></div>
          <div className="bg-blue-50 rounded-xl"></div>
          <div className="bg-gray-50 rounded-xl"></div>
          <div className="col-span-2 bg-gray-100 rounded-xl"></div>
        </div>
      ) 
    },
    { 
      id: 'cyber', 
      name: 'Cyber Neon', 
      description: 'High-contrast futuristic identity system.', 
      icon: <Orbit size={18} />, 
      preview: (
        <div className="w-full h-full bg-[#050505] p-4 flex items-center justify-center">
          <div className="w-full h-full border border-cyan-500/50 rounded-xl flex items-center justify-center">
            <div className="h-0.5 w-8 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
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
          className={`group cursor-pointer transform transition-all duration-300 rounded-[3rem] border-2 overflow-hidden bg-white dark:bg-[#0a0a0a] hover:scale-105 hover:shadow-2xl hover:z-10 ${
            selectedTemplate === t.id 
              ? 'border-blue-600 shadow-2xl scale-105' 
              : 'border-gray-50 dark:border-gray-800 hover:border-blue-200 shadow-sm'
          }`}
        >
          {/* Card Visual Preview */}
          <div className="aspect-[16/11] bg-gray-50 dark:bg-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
            {t.preview}
            {selectedTemplate === t.id && (
              <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[1px] flex items-center justify-center">
                <CheckCircle2 size={40} className="text-blue-600 bg-white rounded-full p-2 shadow-xl animate-in zoom-in duration-300" />
              </div>
            )}
          </div>

          {/* Card Meta Content */}
          <div className="p-8 text-left space-y-2">
            <div className="flex items-center gap-2 font-black uppercase text-[11px] dark:text-white transition-colors group-hover:text-blue-600">
              {t.icon}
              <span className="tracking-widest">{t.name}</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;