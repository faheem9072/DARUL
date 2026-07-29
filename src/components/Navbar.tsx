import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

interface NavbarProps {
  onToggleSidebar: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, activeTab, onSelectTab }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-30 glass-nav px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Mobile Menu Button & Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            title="Toggle Menu"
          >
            <i className="lucide-menu text-xl"></i>
          </button>

          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E5AA8] to-[#3B7DD8] flex items-center justify-center text-white font-bold text-xl shadow-md border border-white/20">
              <i className="lucide-graduation-cap"></i>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-800 dark:text-white">
                  DISE <span className="hidden sm:inline text-[#1E5AA8] dark:text-[#3B7DD8]">PORTAL</span>
                </h1>
                <span className="bg-[#F5C400]/20 text-[#1E5AA8] dark:text-[#F5C400] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#F5C400]/40 hidden md:inline-block">
                  2026-2027
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Darul Irshad School of Excellence
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Quick Role Switcher (Admin / Teacher) */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center text-xs font-semibold shadow-inner border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                role === 'admin'
                  ? 'bg-[#1E5AA8] text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="lucide-shield-check text-sm"></i>
              <span className="hidden md:inline">Admin</span>
            </button>
            <button
              onClick={() => switchRole('teacher')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                role === 'teacher'
                  ? 'bg-[#1E5AA8] text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="lucide-user-check text-sm"></i>
              <span className="hidden md:inline">Teacher</span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <i className="lucide-sun text-yellow-400 text-lg"></i>
            ) : (
              <i className="lucide-moon text-slate-600 text-lg"></i>
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button 
              onClick={() => onSelectTab('notices')}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
              title="Notices & Announcements"
            >
              <i className="lucide-bell text-lg"></i>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            </button>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                {user?.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize font-medium">
                {user?.role === 'admin' ? 'System Administrator' : user?.classTeacherOf || 'Faculty Member'}
              </div>
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition"
              title="Sign Out"
            >
              <i className="lucide-log-out text-lg"></i>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
