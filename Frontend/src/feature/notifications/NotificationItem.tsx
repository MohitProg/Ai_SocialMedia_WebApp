import React from 'react';
import { Heart, MessageSquare, UserPlus, AtSign } from 'lucide-react';
import type { Notification } from '../../types';


interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkRead }) => {
  const { id, type, issuer, createdAt, isRead } = notification;

  const getIcon = () => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-rose-500 fill-current" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-cyan-400" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-emerald-400" />;
      case 'mention':
        return <AtSign className="h-4 w-4 text-indigo-400" />;
    }
  };

  const getActivityText = () => {
    switch (type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'replied to your thread';
      case 'follow':
        return 'started following you';
      case 'mention':
        return 'mentioned you in a post';
    }
  };

  return (
    <div 
      onClick={() => onMarkRead(id)}
      className={`flex items-start gap-4 border-b border-slate-900/60 px-4 py-4 transition-colors cursor-pointer hover:bg-slate-900/20 ${
        !isRead ? 'bg-cyan-950/5 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-cyan-500' : ''
      }`}
    >
      <div className="mt-1 shrink-0 rounded-full p-1.5 bg-slate-900 border border-slate-800">
        {getIcon()}
      </div>

      <div className="flex flex-1 gap-3 min-w-0">
        <img 
          src={issuer.avatarUrl} 
          alt={issuer.displayName} 
          className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-800"
        />
        <div className="flex flex-col min-w-0">
          <p className="text-sm text-slate-300 leading-normal">
            <span className="font-semibold text-slate-100 hover:underline">{issuer.displayName}</span>{' '}
            <span className="text-slate-400">{getActivityText()}</span>
          </p>
          <span className="mt-1 text-[11px] text-slate-500">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};