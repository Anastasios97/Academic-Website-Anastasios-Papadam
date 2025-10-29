import React from 'react';
import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 animate-fadeIn"
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
        className="bg-slate-50 dark:bg-slate-900 rounded-xl shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 w-11/12 max-w-5xl max-h-[90vh] flex flex-col animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center">
            <div className="bg-sky-100 dark:bg-sky-900/50 p-2 rounded-lg text-sky-600 dark:text-sky-400 mr-4">
              {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">{title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-4 sm:p-6 overflow-y-auto">
          <div className="text-slate-600 dark:text-slate-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Modal;
