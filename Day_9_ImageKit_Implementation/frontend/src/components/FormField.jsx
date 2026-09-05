import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormField = ({ label, icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-violet-200/70">
      <Icon size={12} strokeWidth={2.25} />
      {label}
    </label>

    {children}

    <div
      className={`grid transition-all duration-200 ${
        error ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="flex items-center gap-1 pt-0.5 text-[11px] font-medium text-amber-300">
          <AlertCircle size={11} />
          {error?.message}
        </p>
      </div>
    </div>
  </div>
);

export default FormField;