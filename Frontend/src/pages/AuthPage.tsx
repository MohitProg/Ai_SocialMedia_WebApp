import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../feature/auth/AuthCard'; 
import { Mail, Lock, User, AtSign } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Form input field local variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI Mock Validation Logic Hook -> Instantly routes user to app core
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0B0F19] px-4 py-12 text-slate-100">
      {authMode === 'login' ? (
        <AuthCard
          title="Welcome Back"
          subtitle="Enter your details to re-verify your secure node session."
          submitLabel="Sign In"
          onSubmit={handleAuthSubmit}
          footerText="New to Nexus?"
          footerActionLabel="Create an account"
          footerAction={() => setAuthMode('signup')}
        >
          {/* Email Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/40 focus-within:border-cyan-500/50 transition">
              <Mail className="absolute left-3.5 h-4 w-4 text-slate-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Password Field Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-500">Password</label>
              <button type="button" className="text-[11px] text-cyan-500 hover:underline">Forgot password?</button>
            </div>
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/40 focus-within:border-cyan-500/50 transition">
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder-slate-600"
              />
            </div>
          </div>
        </AuthCard>
      ) : (
        <AuthCard
          title="Create Account"
          subtitle="Join the dark-mode engineering space today."
          submitLabel="Get Started"
          onSubmit={handleAuthSubmit}
          footerText="Already have an account?"
          footerActionLabel="Sign in"
          footerAction={() => setAuthMode('login')}
        >
          {/* Display Name Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/40 focus-within:border-cyan-500/50 transition">
              <User className="absolute left-3.5 h-4 w-4 text-slate-600" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Unique Username Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Username</label>
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/40 focus-within:border-cyan-500/50 transition">
              <AtSign className="absolute left-3.5 h-4 w-4 text-slate-600" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sarah_j"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Email Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/40 focus-within:border-cyan-500/50 transition">
              <Mail className="absolute left-3.5 h-4 w-4 text-slate-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Password Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Password</label>
            <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/40 focus-within:border-cyan-500/50 transition">
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-slate-100 outline-none placeholder-slate-600"
              />
            </div>
          </div>
        </AuthCard>
      )}
    </div>
  );
};