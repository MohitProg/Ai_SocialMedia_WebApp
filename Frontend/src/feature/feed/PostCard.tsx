import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Bookmark, 
  MoreHorizontal,
  Send
} from 'lucide-react';
import type { Post ,User} from '../../types';


interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Local UI state for interactions
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked ?? false);
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);
  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved ?? false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    // In a real app, dispatch to backend here
    setCommentText('');
  };

  return (
<article className="border-b border-border-primary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary sm:p-5">
      <div className="flex gap-4">
        
        {/* Avatar Sidebar */}
        <div className="flex flex-col items-center">
          <img 
            src={post.user.avatarUrl} 
            alt={post.user.username} 
            className="h-10 w-10 shrink-0 rounded-full object-cover border border-border-primary"
          />
          {/* Threadline for visual continuity */}
          <div className="mt-2 w-[2px] grow rounded-full bg-border-primary" />
        </div>

        {/* Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate text-sm">
              <span className="font-semibold text-text-primary hover:underline cursor-pointer">
                {post.user.displayName}
              </span>
              <span className="text-text-muted truncate">@{post.user.username}</span>
              <span className="text-text-muted">·</span>
              <span className="text-text-muted">{post.createdAt}</span>
            </div>
            <button className="text-text-muted hover:text-accent-primary transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Text Content */}
          <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed text-text-secondary">
            {post.content}
          </p>

          {/* Optional Media Container */}
          {post.mediaUrl && (
            <div className="mt-3 overflow-hidden rounded-md border border-border-primary">
              {post.mediaType === 'video' ? (
                <video src={post.mediaUrl} controls className="w-full max-h-[500px] object-cover" />
              ) : (
                <img src={post.mediaUrl} alt="Post media" className="w-full max-h-[500px] object-cover" />
              )}
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-4 flex items-center justify-between max-w-md text-text-muted">
            {/* Reply */}
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 group transition-colors ${showComments ? 'text-accent-primary' : 'hover:text-accent-primary'}`}
            >
              <div className="rounded-full p-1.5 group-hover:bg-bg-tertiary">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">{post.commentsCount}</span>
            </button>

            {/* Repost */}
            <button className="flex items-center gap-1.5 group hover:text-success transition-colors">
              <div className="rounded-full p-1.5 group-hover:bg-bg-tertiary">
                <Repeat2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">{post.sharesCount}</span>
            </button>

            {/* Like */}
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 group transition-colors ${isLiked ? 'text-danger' : 'hover:text-danger'}`}
            >
              <motion.div 
                whileTap={{ scale: 0.8 }}
                className="rounded-full p-1.5 group-hover:bg-bg-tertiary"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.div>
                <span className="text-xs font-medium">{likesCount}</span>
            </button>

            {/* Save */}
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1.5 group transition-colors ${isSaved ? 'text-info' : 'hover:text-info'}`}
            >
              <div className="rounded-full p-1.5 group-hover:bg-bg-tertiary">
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </div>
            </button>
          </div>

          {/* Expandable Comments Area */}
          <AnimatePresence>
            {showComments && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <form onSubmit={submitComment} className="mt-4 flex items-start gap-3 border-t border-border-primary pt-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                    alt="Current user" 
                    className="h-8 w-8 rounded-full object-cover border border-border-primary"
                  />
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Post a reply..."
                      className="w-full rounded-xl border border-border-secondary bg-bg-primary py-2 pl-4 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-border-focus transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={!commentText.trim()}
                      className="absolute right-1 top-1 rounded-full p-1.5 text-accent-primary disabled:text-text-muted hover:bg-bg-tertiary transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </article>
  );
};