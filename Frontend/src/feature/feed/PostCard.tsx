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
    <article className="border-b border-slate-800/60 bg-[#0B0F19] p-4 transition-colors hover:bg-slate-900/20 sm:p-5">
      <div className="flex gap-4">
        
        {/* Avatar Sidebar */}
        <div className="flex flex-col items-center">
          <img 
            src={post.user.avatarUrl} 
            alt={post.user.username} 
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-800"
          />
          {/* Threadline for visual continuity */}
          <div className="mt-2 w-[2px] grow rounded-full bg-slate-800/40" />
        </div>

        {/* Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate text-sm">
              <span className="font-semibold text-slate-100 hover:underline cursor-pointer">
                {post.user.displayName}
              </span>
              <span className="text-slate-500 truncate">@{post.user.username}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">{post.createdAt}</span>
            </div>
            <button className="text-slate-500 hover:text-cyan-400 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Text Content */}
          <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-200">
            {post.content}
          </p>

          {/* Optional Media Container */}
          {post.mediaUrl && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-800/60">
              {post.mediaType === 'video' ? (
                <video src={post.mediaUrl} controls className="w-full max-h-[500px] object-cover" />
              ) : (
                <img src={post.mediaUrl} alt="Post media" className="w-full max-h-[500px] object-cover" />
              )}
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-4 flex items-center justify-between max-w-md text-slate-500">
            {/* Reply */}
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 group transition-colors ${showComments ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
            >
              <div className="rounded-full p-1.5 group-hover:bg-cyan-500/10">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">{post.commentsCount}</span>
            </button>

            {/* Repost */}
            <button className="flex items-center gap-1.5 group hover:text-emerald-400 transition-colors">
              <div className="rounded-full p-1.5 group-hover:bg-emerald-500/10">
                <Repeat2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">{post.sharesCount}</span>
            </button>

            {/* Like */}
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 group transition-colors ${isLiked ? 'text-rose-500' : 'hover:text-rose-500'}`}
            >
              <motion.div 
                whileTap={{ scale: 0.8 }}
                className="rounded-full p-1.5 group-hover:bg-rose-500/10"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.div>
              <span className="text-xs font-medium">{likesCount}</span>
            </button>

            {/* Save */}
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1.5 group transition-colors ${isSaved ? 'text-indigo-400' : 'hover:text-indigo-400'}`}
            >
              <div className="rounded-full p-1.5 group-hover:bg-indigo-500/10">
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
                <form onSubmit={submitComment} className="mt-4 flex items-start gap-3 border-t border-slate-800/40 pt-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                    alt="Current user" 
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-800"
                  />
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Post a reply..."
                      className="w-full rounded-full border border-slate-800 bg-slate-900/50 py-2 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={!commentText.trim()}
                      className="absolute right-1 top-1 rounded-full p-1.5 text-cyan-500 disabled:text-slate-600 hover:bg-cyan-500/10 transition-colors"
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