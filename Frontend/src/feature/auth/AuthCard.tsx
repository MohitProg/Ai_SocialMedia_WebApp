import React from "react";
import { ShieldCheck } from "lucide-react";

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
 <div className="w-full max-w-md rounded-xl border border-border-primary bg-bg-secondary p-6 shadow-shadow-card sm:p-8">
      {/* App Branding Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-tr from-accent-primary to-accent-secondary shadow-shadow-glow">
          <ShieldCheck className="h-6 w-6 text-text-inverse" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl font-display">
          {title}
        </h2>
        <p className="mt-1.5 text-xs text-text-secondary">{subtitle}</p>
      </div>

      {/* Form Submission Pipeline */}
      <form onSubmit={onSubmit} className="space-y-4">
        {children}

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-accent-primary py-3 text-sm font-semibold text-text-inverse shadow-shadow-card transition-all hover:bg-accent-primary-hover"
        >
          {submitLabel}
        </button>
      </form>

      {/* Footer Toggle Switch Link */}
      <div className="mt-6 text-center text-xs text-text-muted">
        <span>{footerText} </span>
        <button
          onClick={footerAction}
          className="font-semibold text-accent-primary hover:text-accent-primary-hover hover:underline outline-none"
        >
          {footerActionLabel}
        </button>
      </div>
    </div>
  );
};
