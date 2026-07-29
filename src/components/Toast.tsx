import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: 'lucide-check-circle text-emerald-500',
    error: 'lucide-alert-circle text-rose-500',
    info: 'lucide-info text-[#1E5AA8]'
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/80',
    error: 'border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/80',
    info: 'border-[#1E5AA8]/30 bg-blue-50/90 dark:bg-slate-900/90'
  };

  return (
    <div
      className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 transform translate-y-0 ${borders[toast.type]}`}
    >
      <i className={`${icons[toast.type]} text-xl mt-0.5 flex-shrink-0`}></i>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
          {toast.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
      >
        <i className="lucide-x text-sm"></i>
      </button>
    </div>
  );
};
