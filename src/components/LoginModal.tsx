import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { UserRole } from '../types/index.ts';

export const LoginModal: React.FC = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@darulirshad.edu.in');
  const [password, setPassword] = useState('dise2026pass');
  const [error, setError] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@darulirshad.edu.in');
    } else {
      setEmail('rashid.ahmed@darulirshad.edu.in');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }
    setError('');
    login(email, selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900/80 via-slate-900/95 to-slate-950 backdrop-blur-md">
      <div className="glass-modal w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border border-white/20 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#F5C400]/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#1E5AA8] to-[#3B7DD8] text-white flex items-center justify-center text-2xl font-bold shadow-xl border border-white/20">
            <i className="lucide-graduation-cap text-3xl"></i>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Darul Irshad School of Excellence
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Internal Management Portal • Authenticated Access
          </p>
        </div>

        {/* Role Picker Pills */}
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center text-xs font-bold border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              selectedRole === 'admin'
                ? 'bg-[#1E5AA8] text-white shadow-md font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <i className="lucide-shield-check text-base"></i>
            <span>Admin Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('teacher')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              selectedRole === 'teacher'
                ? 'bg-[#1E5AA8] text-white shadow-md font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <i className="lucide-user-check text-base"></i>
            <span>Teacher Portal</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-600 dark:text-rose-300 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Authorized Email
            </label>
            <div className="relative">
              <i className="lucide-mail absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Security Password
            </label>
            <div className="relative">
              <i className="lucide-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#1E5AA8] to-[#2B6EC7] hover:brightness-110 text-white font-extrabold text-sm rounded-xl shadow-lg transition active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <span>Sign In to DISE Portal</span>
            <i className="lucide-arrow-right text-base"></i>
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-400 font-medium">
          Protected by Firebase Authentication • DISE Internal Access Only
        </div>
      </div>
    </div>
  );
};
