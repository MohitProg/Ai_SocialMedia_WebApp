export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate: string;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatSession {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  issuer: User;
  postId?: string;
  createdAt: string;
  isRead: boolean;
}