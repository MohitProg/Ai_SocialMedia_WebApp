import React, { useState } from 'react';
import { Search, UserPlus, Hash } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'top' | 'people' | 'posts'>('top');

  return (
<div className="flex w-full flex-col">
      {/* Sticky Search Bar */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-border-primary bg-bg-primary/80 px-4 backdrop-blur-md">
        <div className="flex w-full items-center gap-3 rounded-full bg-bg-secondary px-4 py-2.5 border border-border-primary focus-within:border-border-focus transition">
          <Search className="h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search Nexus..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>
      </header>

      {/* Tab Nav */}
      <div className="flex border-b border-border-primary">
        {(['top', 'people', 'posts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab 
                ? 'text-accent-primary border-b-2 border-accent-primary' 
                : 'text-text-muted hover:text-text-secondary'
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
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-secondary transition">
              <Hash className="h-8 w-8 text-border-primary" />
              <div>
                <p className="text-sm font-semibold text-text-primary">#webdevelopment</p>
                <p className="text-xs text-text-muted">12.5k posts</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-text-muted text-sm italic">
            Search for people, posts, or tags...
          </div>
        )}
      </div>
    </div>
  );
};