import React from 'react';
import { Sparkles, User, Briefcase, Trash2, Plus } from 'lucide-react';

/**
 * EDITOR FORM COMPONENT v3.9.4
 * Handles Identity and Portfolio data entry with robust safety guards.
 */
const Form = ({ formData, setFormData }) => {
  // CRITICAL: Data Guard to prevent app crash if data is still fetching
  if (!formData) {
    return (
      <div className="p-10 text-center text-gray-400">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Initializing Editor...
        </p>
      </div>
    );
  }

  // Update text fields
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Image Uploads (Base64)
  const handleImageUpload = (e, type, projectId = null) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'profile') {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      } else if (type === 'project') {
        setFormData(prev => ({
          ...prev,
          projects: (prev.projects || []).map(p => 
            p.id === projectId ? { ...p, image: reader.result } : p
          )
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const inputClass = "w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium";

  return (
    <div className="space-y-12 pb-20">
      {/* 1. IDENTITY SECTION */}
      <section className="space-y-6 text-left">
        <div className="flex items-center gap-3 border-b dark:border-gray-800 pb-5">
          <Sparkles size={18} className="text-blue-500" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] dark:text-white">Identity</h3>
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-[#0a0a0a] rounded-[2.5rem] border border-transparent dark:border-white/5">
          <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-gray-200 dark:bg-gray-800 mb-4 shadow-xl border-4 border-white dark:border-gray-900">
            {formData.profileImage ? (
              <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <User className="w-full h-full p-5 text-gray-400" />
            )}
          </div>
          <label className="px-5 py-2 bg-white dark:bg-gray-800 dark:text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm cursor-pointer hover:shadow-md transition-all">
            Update Portrait
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} />
          </label>
        </div>

        {/* Basic Fields */}
        <div className="space-y-4">
          <input 
            name="fullName" 
            value={formData.fullName || ''} 
            onChange={handleChange} 
            className={inputClass} 
            placeholder="Full Name" 
          />
          <input 
            name="title" 
            value={formData.title || ''} 
            onChange={handleChange} 
            className={inputClass} 
            placeholder="Architectural Title (e.g. Lead Developer)" 
          />
          <textarea 
            name="bio" 
            value={formData.bio || ''} 
            onChange={handleChange} 
            rows="4" 
            className={inputClass} 
            placeholder="Tell your professional narrative..." 
          />
          <input 
            name="skills" 
            value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''} 
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              skills: e.target.value.split(',').map(s => s.trim()) 
            }))} 
            className={inputClass} 
            placeholder="Skills (comma separated: React, Node, UI)" 
          />
        </div>
      </section>

      {/* 2. PORTFOLIO SECTION */}
      <section className="space-y-8">
        <div className="flex justify-between items-center border-b dark:border-gray-800 pb-5">
           <div className="flex items-center gap-3">
             <Briefcase size={18} className="text-green-500" />
             <h3 className="text-[11px] font-black uppercase tracking-[0.4em] dark:text-white">Portfolio</h3>
           </div>
           <button 
             onClick={() => setFormData(prev => ({ 
               ...prev, 
               projects: [...(prev.projects || []), { id: Date.now(), title: "", desc: "", image: "" }] 
             }))} 
             className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-colors"
           >
             <Plus size={14} /> Add Work
           </button>
        </div>

        <div className="space-y-6">
          {(formData.projects || []).map((p) => (
             <div key={p.id} className="p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d0d0d] shadow-sm relative text-left group">
                <button 
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    projects: prev.projects.filter(pr => pr.id !== p.id) 
                  }))} 
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16}/>
                </button>
                
                <div className="space-y-4">
                   <input 
                     value={p.title || ''} 
                     onChange={(e) => setFormData({
                       ...formData, 
                       projects: formData.projects.map(pj => pj.id === p.id ? {...pj, title: e.target.value} : pj)
                     })} 
                     placeholder="Work Title" 
                     className="w-full bg-transparent font-black text-lg outline-none dark:text-white border-none p-0" 
                   />
                   <textarea 
                     value={p.desc || ''} 
                     onChange={(e) => setFormData({
                       ...formData, 
                       projects: formData.projects.map(pj => pj.id === p.id ? {...pj, desc: e.target.value} : pj)
                     })} 
                     placeholder="Describe the impact and technical stack..." 
                     className="w-full bg-transparent text-sm text-gray-500 outline-none leading-relaxed resize-none p-0" 
                   />
                   
                   {/* Project Image Upload */}
                   <label className="block w-full py-2 border border-dashed border-gray-200 dark:border-gray-800 text-gray-400 text-center rounded-xl text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                      {p.image ? "Change Visual" : "Upload Case Visual"}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'project', p.id)} />
                   </label>
                </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Form;