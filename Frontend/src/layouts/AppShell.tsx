import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Compass, MessageSquare, Bell, 
  User as UserIcon, Settings, PlusSquare, LogOut, Menu 
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const navigationItems: NavItem[] = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 3 },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: 5 },
    { label: 'Profile', path: '/profile/me', icon: UserIcon },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar (Mobile Only) */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-800/60 bg-[#0B0F19]/80 px-4 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Nexus</span>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-full bg-slate-800 p-2 text-slate-200 hover:bg-slate-700 transition"
        >
          <PlusSquare className="h-5 w-5" />
        </button>
      </header>

      <div className="mx-auto flex max-w-7xl px-0 sm:px-4 md:px-8">
        
        {/* Left Sidebar (Desktop/Tablet Navigation) */}
        <aside className="sticky top-0 hidden h-screen w-20 flex-col items-center justify-between border-r border-slate-800/60 py-6 md:flex xl:w-64 xl:items-start xl:px-4">
          <div className="flex w-full flex-col gap-8">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 px-2 xl:px-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20" />
              <span className="hidden text-xl font-black tracking-wider text-slate-100 xl:block">NEXUS</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="flex w-full flex-col gap-1.5 px-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all group ${
                      isActive 
                        ? 'bg-slate-800/60 text-cyan-400' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 transition-transform group-hover:scale-105 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="hidden xl:block">{item.label}</span>
                    
                    {item.badge && item.badge > 0 && (
                      <span className="absolute right-4 top-3.5 flex h-5 min-w-[20px] items-center justify-between rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950 shadow-md xl:static xl:ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 hidden w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 hover:opacity-95 transition-all xl:flex hover:shadow-cyan-500/20"
              >
                <PlusSquare className="h-4 w-4" />
                <span>Create Post</span>
              </button>
            </nav>
          </div>

          {/* User Footer Profile Button */}
          <div className="w-full px-2">
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-slate-900 transition text-left group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Profile" 
                className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-800/80 group-hover:ring-cyan-500/50 transition"
              />
              <div className="hidden flex-col xl:flex">
                <span className="text-xs font-semibold text-slate-200 line-clamp-1">Sarah Jenkins</span>
                <span className="text-[11px] text-slate-500 line-clamp-1">@sarah_j</span>
              </div>
              <LogOut className="ml-auto hidden h-4 w-4 text-slate-500 hover:text-rose-400 xl:block" />
            </button>
          </div>
        </aside>

        {/* Content Viewport Area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen border-r border-slate-800/60 pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-around border-t border-slate-800/60 bg-[#0B0F19]/90 px-2 backdrop-blur-md md:hidden">
        {navigationItems.slice(0, 5).map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 relative ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-0.5 text-[9px] font-bold text-slate-950">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Basic Modal Backdrop Skeleton for Creation Feature */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0F1524] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-100">Create New Post</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-xs text-slate-500 hover:text-slate-300">Close</button>
              </div>
              <textarea 
                placeholder="What's happening?" 
                className="w-full min-h-[120px] bg-transparent text-slate-100 placeholder-slate-500 resize-none outline-none text-sm"
              />
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-800/60">
                <button className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition">Draft</button>
                <button className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition">Post</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};