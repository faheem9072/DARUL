import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, isOpen, onCloseMobile }) => {
  const { role } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'lucide-layout-dashboard', badge: null },
    { id: 'students', label: 'Student Management', icon: 'lucide-users', badge: null },
    { id: 'attendance', label: 'Attendance Module', icon: 'lucide-calendar-check', badge: null },
    { id: 'leave', label: 'Leave Requests', icon: 'lucide-clipboard-list', badge: 'New' },
    { id: 'notices', label: 'Notice Board', icon: 'lucide-megaphone', badge: null },
    { id: 'timetable', label: 'Class Timetable', icon: 'lucide-clock', badge: null },
    { id: 'documents', label: 'Study Documents', icon: 'lucide-file-text', badge: null },
    { id: 'settings', label: 'System Settings', icon: 'lucide-settings', badge: null, adminOnly: true },
    { id: 'future', label: 'Future Ready ERP', icon: 'lucide-sparkles', badge: '15+' },
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 z-50 lg:z-20 h-screen lg:h-[calc(100vh-4rem)] w-64 glass-sidebar transition-transform duration-300 ease-in-out flex flex-col justify-between p-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header on mobile */}
          <div className="flex items-center justify-between lg:hidden mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#1E5AA8] flex items-center justify-center text-white font-bold">
                <i className="lucide-graduation-cap"></i>
              </div>
              <span className="font-bold text-slate-800 dark:text-white">DISE Portal</span>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <i className="lucide-x text-xl"></i>
            </button>
          </div>

          <div className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-3 mb-2">
            Navigation Menu
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              if (item.adminOnly && role !== 'admin') return null;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1E5AA8] text-white shadow-md shadow-[#1E5AA8]/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${item.icon} text-lg ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}></i>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#F5C400] text-slate-900'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 text-xs border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
              <span>Campus System</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Firebase Connected • Storage Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
