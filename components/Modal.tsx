import React, { useEffect } from 'react';
import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 animate-fadeIn p-3 sm:p-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleUp {
            animation: scaleUp 0.3s ease-out forwards;
        }
      `}</style>
      <div 
        className="modal-panel rounded-2xl transition-all duration-300 w-full max-w-5xl max-h-[92vh] flex flex-col animate-scaleUp overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-700/60 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center">
            <div className="bg-cyan-100 dark:bg-cyan-950/50 p-2 rounded-lg text-cyan-600 dark:text-cyan-300 mr-4">
              {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">{title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-4 sm:p-7 overflow-y-auto">
          <div className="text-slate-600 dark:text-slate-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Modal;
