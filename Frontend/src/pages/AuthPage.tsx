import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../feature/auth/AuthCard";
import { Mail, Lock, User, AtSign } from "lucide-react";

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Form input field local variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI Mock Validation Logic Hook -> Instantly routes user to app core
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12 font-sans bg-bg-primary text-text-primary">
      {authMode === "login" ? (
        <AuthCard
          title="Welcome Back"
          subtitle="Enter your details to re-verify your secure node session."
          submitLabel="Sign In"
          onSubmit={handleAuthSubmit}
          footerText="New to Nexus?"
          footerActionLabel="Create an account"
          footerAction={() => setAuthMode("signup")}
        >
          {/* Email Field Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-secondary">
              Email Address
            </label>
            <div className="relative flex items-center rounded-xl border border-border-secondary bg-bg-secondary focus-within:border-border-focus transition">
              <Mail className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Password Field Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-text-secondary">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] font-medium text-accent-primary hover:text-accent-primary-hover hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative flex items-center rounded-xl border border-border-secondary bg-bg-secondary focus-within:border-border-focus transition">
              <Lock className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </div>
        </AuthCard>
      ) : (
        <AuthCard
          title="Create Account"
          subtitle="Join the modern engineering space today."
          submitLabel="Get Started"
          onSubmit={handleAuthSubmit}
          footerText="Already have an account?"
          footerActionLabel="Sign in"
          footerAction={() => setAuthMode("login")}
        >
          {/* Display Name Field Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-secondary">
              Full Name
            </label>
            <div className="relative flex items-center rounded-xl border border-border-secondary bg-bg-secondary focus-within:border-border-focus transition">
              <User className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Unique Username Field Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-secondary">
              Username
            </label>
            <div className="relative flex items-center rounded-xl border border-border-secondary bg-bg-secondary focus-within:border-border-focus transition">
              <AtSign className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sarah_j"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Email Field Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-secondary">
              Email Address
            </label>
            <div className="relative flex items-center rounded-xl border border-border-secondary bg-bg-secondary focus-within:border-border-focus transition">
              <Mail className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Password Field Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-secondary">
              Password
            </label>
            <div className="relative flex items-center rounded-xl border border-border-secondary bg-bg-secondary focus-within:border-border-focus transition">
              <Lock className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </div>
        </AuthCard>
      )}
    </div>
  );
};
