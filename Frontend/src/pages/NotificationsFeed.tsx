import React, { useState } from 'react';
import { Sparkles, CheckCheck } from 'lucide-react';
import type { Notification, User } from '../types';
import { NotificationItem } from '../feature/notifications/NotificationItem';


const MOCK_ISSUER: User = {
  id: 'u3',
  username: 'marcus_k',
  displayName: 'Marcus Kane',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  joinDate: '2024',
  followersCount: 420,
  followingCount: 500,
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    issuer: MOCK_ISSUER,
    createdAt: '12m ago',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'mention',
    issuer: {
      id: 'u2',
      username: 'design_by_mia',
      displayName: 'Mia Roberts',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      joinDate: '2022',
      followersCount: 8430,
      followingCount: 120,
    },
    createdAt: '1h ago',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'follow',
    issuer: MOCK_ISSUER,
    createdAt: '3h ago',
    isRead: true,
  }
];

export const NotificationsFeed: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const handleMarkRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
<div className="flex w-full flex-col bg-bg-primary">
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border-primary bg-bg-primary/80 px-4 backdrop-blur-md">
        <h1 className="text-lg font-bold text-text-primary tracking-tight">Notifications</h1>
        <button 
          onClick={handleMarkAllAllRead}
          className="flex items-center gap-1.5 rounded-xl border border-border-primary px-3 py-1.5 text-xs font-semibold text-text-muted hover:bg-bg-secondary hover:text-text-secondary transition"
        >
          <CheckCheck className="h-3.5 w-3.5" />
          <span>Mark all as read</span>
        </button>
      </header>

      <div className="flex flex-col pb-20 md:pb-0">
        {notifications.length > 0 ? (
          notifications.map(n => (
            <NotificationItem key={n.id} notification={n} onMarkRead={handleMarkRead} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-2">
            <Sparkles className="h-6 w-6 text-border-primary" />
            <p className="text-sm">You are completely caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};