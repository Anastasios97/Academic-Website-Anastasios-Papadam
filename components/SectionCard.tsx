import React from 'react';

interface SectionCardProps {
  id?: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, icon, children }) => {
  return (
    <section id={id} className="bg-white/80 dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:-translate-y-1 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-sky-100 dark:bg-sky-900/50 p-2 rounded-lg text-sky-600 dark:text-sky-400 mr-4">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">{title}</h2>
        </div>
        <div className="text-slate-600 dark:text-slate-300">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionCard;
