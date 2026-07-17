import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Link as LinkIcon, Grid, Image, Heart } from 'lucide-react';
import type { Post, User } from '../types';
import { PostCard } from '../feature/feed/PostCard';
import { EditProfileModal } from '../feature/profile/EditProfileModal';


// Mock targeted profile user
const INITIAL_PROFILE_USER: User = {
  id: 'me',
  username: 'sarah_j',
  displayName: 'Sarah Jenkins',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  bio: 'Senior UI/UX Designer & Frontend Architect. Obsessed with micro-interactions, custom design systems, and WebGL structures. ⚡',
  location: 'San Francisco, CA',
  website: 'sarahj.design',
  joinDate: 'Joined March 2022',
  followersCount: 1420,
  followingCount: 482,
  isVerified: true
};

const MOCK_USER_POSTS: Post[] = [
  {
    id: 'up1',
    user: INITIAL_PROFILE_USER,
    content: "Designing a clean dashboard layer tonight. The focus lies strictly on typographic hierarchies and high-contrast dark space execution. Pictures coming tomorrow!",
    createdAt: 'Yesterday',
    likesCount: 341,
    commentsCount: 18,
    sharesCount: 12,
    isLiked: false,
  }
];

export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>(INITIAL_PROFILE_USER);
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleProfileUpdate = (updatedFields: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
<div className="w-full text-text-primary bg-bg-primary">
      
      {/* Dynamic Header Toolbar */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-6 border-b border-border-primary bg-bg-primary/80 px-4 backdrop-blur-md">
        <div>
          <h1 className="text-base font-bold leading-tight">{user.displayName}</h1>
          <p className="text-xs text-text-muted">{MOCK_USER_POSTS.length} Posts</p>
        </div>
      </div>

      {/* Profile Decorative Background Banner */}
      <div className="h-36 bg-gradient-to-r from-bg-secondary via-indigo-950/20 to-accent-primary/5 border-b border-border-primary" />

      {/* Meta Profile Grid Detail Layout */}
      <div className="px-4 pb-4">
        <div className="relative flex justify-between items-end">
          {/* Profile Photo Overlapping Container */}
          <div className="-mt-14 block">
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="h-24 w-24 rounded-full border-4 border-bg-primary object-cover shadow-xl"
            />
          </div>
          
          {/* Action Trigger Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-full border border-border-primary px-4 py-1.5 text-xs font-bold text-text-secondary hover:bg-bg-secondary transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* User Descriptive Text Layer */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{user.displayName}</h2>
            {user.isVerified && <span className="h-2 w-2 rounded-full bg-accent-primary" title="Verified Architect" />}
          </div>
          <p className="text-xs text-text-muted">@{user.username}</p>
        </div>

        {/* Main Biography Body Text */}
        {user.bio && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{user.bio}</p>}

        {/* Profile Meta Links/Attributes Row */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-muted">
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-1 text-accent-primary hover:underline cursor-pointer">
              <LinkIcon className="h-3.5 w-3.5" />
              <span>{user.website}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{user.joinDate}</span>
          </div>
        </div>

        {/* Count Configurations */}
        <div className="mt-3.5 flex items-center gap-4 text-xs">
          <div className="cursor-pointer hover:underline text-text-secondary">
            <span className="font-semibold text-text-primary">{user.followingCount}</span> Following
          </div>
          <div className="cursor-pointer hover:underline text-text-secondary">
            <span className="font-semibold text-text-primary">{user.followersCount}</span> Followers
          </div>
        </div>
      </div>

      {/* Content Navigation Segmented Control Tabs */}
      <div className="flex border-b border-border-primary text-sm">
        {(['posts', 'media', 'likes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex flex-1 items-center justify-center py-3.5 font-semibold capitalize transition"
          >
            <span className={activeTab === tab ? 'text-text-primary' : 'text-text-muted'}>{tab}</span>
            {activeTab === tab && (
              <div className="absolute bottom-0 h-[2px] w-16 bg-accent-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Profile Content Feed Router Outlet Matrix */}
      <div className="flex flex-col">
        {activeTab === 'posts' && (
          MOCK_USER_POSTS.map((post) => <PostCard key={post.id} post={post} />)
        )}

        {activeTab === 'media' && (
          <div className="grid grid-cols-3 gap-1 p-1">
            <div className="aspect-square bg-bg-secondary border border-border-primary flex items-center justify-center text-xs text-text-muted">
              <Image className="h-5 w-5" />
            </div>
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="flex flex-col items-center justify-center py-12 text-sm text-text-muted gap-2">
            <Heart className="h-5 w-5 text-border-primary" />
            <span>No liked items to display yet</span>
          </div>
        )}
      </div>

      {/* Lazy Instantiated Modal Structure */}
      <AnimatePresence>
        {isEditModalOpen && (
          <EditProfileModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleProfileUpdate}
          />
        )}
      </AnimatePresence>
      
    </div>
  );
};