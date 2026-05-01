import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
// Explicitly adding the .jsx extension to resolve compilation errors in the build environment
import { useAuth } from '../context/AuthContext.jsx';

/**
 * AUTH PAGES COMPONENT
 * Handles Login and Signup views with unified logic and error handling.
 * Integrates with the backend API to authenticate architects and grant access to cloud features.
 */
export default function AuthPages({ mode, setView }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * HANDLES FORM SUBMISSION
   * Calls the backend authentication endpoints and updates global state on success.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || 'Authentication failed. Please verify your credentials.');
      }

      // SUCCESS: Update global AuthContext with user data and JWT token
      login(data.user, data.token);

      // ROUTING: Redirect back to the builder workspace as requested
      setView('builder');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Navigation back to the home hub */}
        <button 
          onClick={() => setView('home')} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </button>

        {/* Dynamic Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">
            {mode === 'signup' ? 'Create' : 'Sign'}<br/>
            <span className="text-blue-600">{mode === 'signup' ? 'Account' : 'In'}</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] pt-2">
            {mode === 'signup' ? 'Join the architect network' : 'Enter your digital workspace'}
          </p>
        </div>

        {/* Error Feedback Display */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
            <AlertCircle size={16} className="shrink-0" /> 
            <span>{error}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                name="name" 
                type="text" 
                required 
                placeholder="DISPLAY NAME" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d] dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium" 
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="EMAIL ADDRESS" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d] dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium" 
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="PASSWORD" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d] dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <span>{mode === 'signup' ? 'Build Account' : 'Authenticate'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Navigation between login and signup modes */}
        <div className="text-center pt-6">
          <button 
            onClick={() => {
              setError('');
              setView(mode === 'signup' ? 'login' : 'signup');
            }} 
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-blue-600 transition-all border-b border-transparent hover:border-blue-600 pb-1"
          >
            {mode === 'signup' ? 'Existing Member? Log In' : "New Architect? Forge ID"}
          </button>
        </div>
      </div>
    </div>
  );
}