import React, { useState } from 'react';
import { Image as ImageIcon, Smile, Sparkles } from 'lucide-react';
import { PostCard } from '../feature/feed/PostCard';
import type { Post, User } from '../types';



// Mock Data conforming strictly to our TypeScript interfaces
const MOCK_USER_1: User = {
  id: 'u1',
  username: 'alex_dev',
  displayName: 'Alex Chen',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  joinDate: '2023-01-15',
  followersCount: 1205,
  followingCount: 340,
};

const MOCK_USER_2: User = {
  id: 'u2',
  username: 'design_by_mia',
  displayName: 'Mia Roberts',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  joinDate: '2022-11-04',
  followersCount: 8430,
  followingCount: 120,
};

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: MOCK_USER_1,
    content: "Just migrated our entire component library to strict TypeScript and Tailwind. The developer experience is night and day. No more 'any' types slipping into production! 🚀💻",
    createdAt: '2h',
    likesCount: 142,
    commentsCount: 12,
    sharesCount: 5,
    isLiked: true,
  },
  {
    id: 'p2',
    user: MOCK_USER_2,
    content: "Experimenting with dark mode palettes. Found this incredible neon cyan accent that plays perfectly with deep slate blues.",
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    mediaType: 'image',
    createdAt: '5h',
    likesCount: 890,
    commentsCount: 45,
    sharesCount: 112,
    isSaved: true,
  }
];

export const HomeFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');

  return (
    <div className="flex w-full flex-col">
      
      {/* Sticky Header Tabs */}
      <header className="sticky top-0 z-30 flex h-14 w-full border-b border-slate-800/60 bg-[#0B0F19]/80 backdrop-blur-md">
        <button 
          onClick={() => setActiveTab('forYou')}
          className="relative flex flex-1 items-center justify-center text-sm font-semibold transition-colors hover:bg-slate-800/30"
        >
          <span className={activeTab === 'forYou' ? 'text-slate-100' : 'text-slate-500'}>
            For You
          </span>
          {activeTab === 'forYou' && (
            <div className="absolute bottom-0 h-1 w-12 rounded-t-full bg-cyan-500" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('following')}
          className="relative flex flex-1 items-center justify-center text-sm font-semibold transition-colors hover:bg-slate-800/30"
        >
          <span className={activeTab === 'following' ? 'text-slate-100' : 'text-slate-500'}>
            Following
          </span>
          {activeTab === 'following' && (
            <div className="absolute bottom-0 h-1 w-12 rounded-t-full bg-cyan-500" />
          )}
        </button>
      </header>

      {/* Quick Compose Area (Desktop specific logic handled in AppShell usually, but good here too) */}
      <div className="hidden border-b border-slate-800/60 p-4 sm:flex gap-4">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
          alt="User avatar" 
          className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-800"
        />
        <div className="flex flex-1 flex-col justify-center">
          <input 
            type="text" 
            placeholder="What is happening?!" 
            className="w-full bg-transparent text-lg text-slate-100 placeholder-slate-600 outline-none"
          />
          <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3">
            <div className="flex gap-2 text-cyan-500">
              <button className="rounded-full p-2 hover:bg-cyan-500/10 transition"><ImageIcon className="h-5 w-5" /></button>
              <button className="rounded-full p-2 hover:bg-cyan-500/10 transition"><Smile className="h-5 w-5" /></button>
            </div>
            <button className="rounded-full bg-cyan-500 px-5 py-1.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Main Feed Content */}
      <div className="flex flex-col pb-20 md:pb-0">
        {activeTab === 'forYou' && (
           <div className="flex items-center justify-center py-4 border-b border-slate-800/60 text-xs text-slate-500 gap-2">
             <Sparkles className="h-3 w-3 text-cyan-500" /> Curated based on your interests
           </div>
        )}
        
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};