import React, { useState } from 'react';
import { Search, UserPlus, Hash } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'top' | 'people' | 'posts'>('top');

  return (
    <div className="flex w-full flex-col">
      {/* Sticky Search Bar */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-slate-800/60 bg-[#0B0F19]/80 px-4 backdrop-blur-md">
        <div className="flex w-full items-center gap-3 rounded-full bg-slate-900 px-4 py-2.5 border border-slate-800 focus-within:border-cyan-500/50 transition">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search Nexus..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder-slate-600"
          />
        </div>
      </header>

      {/* Tab Nav */}
      <div className="flex border-b border-slate-800/60">
        {(['top', 'people', 'posts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${
              activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results Logic Area */}
      <div className="p-4">
        {query ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900/40 transition">
              <Hash className="h-8 w-8 text-slate-700" />
              <div>
                <p className="text-sm font-semibold text-slate-100">#webdevelopment</p>
                <p className="text-xs text-slate-500">12.5k posts</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-600 text-sm italic">
            Search for people, posts, or tags...
          </div>
        )}
      </div>
    </div>
  );
};