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
<div className="min-h-screen bg-bg-primary text-text-primary antialiased selection:bg-accent-primary/30 selection:text-accent-primary">
      
      {/* Top Navbar (Mobile Only) */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border-primary bg-bg-primary/80 px-4 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-primary to-indigo-600" />
          <span className="text-lg font-bold tracking-tight text-text-primary">Nexus</span>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-full bg-bg-secondary p-2 text-text-secondary hover:bg-bg-tertiary transition"
        >
          <PlusSquare className="h-5 w-5" />
        </button>
      </header>

      <div className="mx-auto flex max-w-7xl px-0 sm:px-4 md:px-8">
        
        {/* Left Sidebar (Desktop/Tablet Navigation) */}
        <aside className="sticky top-0 hidden h-screen w-20 flex-col items-center justify-between border-r border-border-primary py-6 md:flex xl:w-64 xl:items-start xl:px-4">
          <div className="flex w-full flex-col gap-8">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 px-2 xl:px-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-primary to-indigo-600 shadow-lg shadow-accent-primary/20" />
              <span className="hidden text-xl font-black tracking-wider text-text-primary xl:block">NEXUS</span>
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
                        ? 'bg-bg-secondary text-accent-primary' 
                        : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 transition-transform group-hover:scale-105 ${isActive ? 'text-accent-primary' : 'text-text-secondary'}`} />
                    <span className="hidden xl:block">{item.label}</span>
                    
                    {item.badge && item.badge > 0 && (
                      <span className="absolute right-4 top-3.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-primary px-1 text-[10px] font-bold text-bg-primary shadow-md xl:static xl:ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 hidden w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-indigo-600 py-3.5 text-sm font-semibold text-bg-primary shadow-lg shadow-accent-primary/10 hover:opacity-95 transition-all xl:flex hover:shadow-accent-primary/20"
              >
                <PlusSquare className="h-4 w-4" />
                <span>Create Post</span>
              </button>
            </nav>
          </div>

          {/* User Footer Profile Button */}
          <div className="w-full px-2">
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-bg-secondary transition text-left group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Profile" 
                className="h-9 w-9 rounded-full object-cover ring-2 ring-border-primary group-hover:ring-accent-primary/50 transition"
              />
              <div className="hidden flex-col xl:flex">
                <span className="text-xs font-semibold text-text-secondary line-clamp-1">Sarah Jenkins</span>
                <span className="text-[11px] text-text-muted line-clamp-1">@sarah_j</span>
              </div>
              <LogOut className="ml-auto hidden h-4 w-4 text-text-muted hover:text-danger xl:block" />
            </button>
          </div>
        </aside>

        {/* Content Viewport Area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen border-r border-border-primary pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-around border-t border-border-primary bg-bg-primary/90 px-2 backdrop-blur-md md:hidden">
        {navigationItems.slice(0, 5).map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 relative ${isActive ? 'text-accent-primary' : 'text-text-muted'}`}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-primary px-0.5 text-[9px] font-bold text-bg-primary">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/70 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-border-primary bg-bg-secondary p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-text-primary">Create New Post</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-xs text-text-muted hover:text-text-secondary">Close</button>
              </div>
              <textarea 
                placeholder="What's happening?" 
                className="w-full min-h-[120px] bg-transparent text-text-primary placeholder:text-text-muted resize-none outline-none text-sm"
              />
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border-primary">
                <button className="rounded-xl bg-bg-tertiary px-4 py-2 text-xs font-medium text-text-secondary hover:bg-bg-primary transition">Draft</button>
                <button className="rounded-xl bg-accent-primary px-4 py-2 text-xs font-semibold text-bg-primary hover:opacity-90 transition">Post</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};