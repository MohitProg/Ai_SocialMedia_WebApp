import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel: string;
  footerAction: () => void;
  footerText: string;
  footerActionLabel: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  onSubmit,
  children,
  submitLabel,
  footerAction,
  footerText,
  footerActionLabel,
}) => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-[#0F1524] p-6 shadow-2xl sm:p-8">
      {/* App Branding Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
          <ShieldCheck className="h-6 w-6 text-slate-950" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">{title}</h2>
        <p className="mt-1.5 text-xs text-slate-500">{subtitle}</p>
      </div>

      {/* Form Submission Pipeline */}
      <form onSubmit={onSubmit} className="space-y-4">
        {children}

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all hover:opacity-95 hover:shadow-cyan-500/20"
        >
          {submitLabel}
        </button>
      </form>

      {/* Footer Toggle Switch Link */}
      <div className="mt-6 text-center text-xs text-slate-500">
        <span>{footerText} </span>
        <button
          onClick={footerAction}
          className="font-semibold text-cyan-400 hover:underline outline-none"
        >
          {footerActionLabel}
        </button>
      </div>
    </div>
  );
};