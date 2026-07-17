import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import type { User } from '../../types';


interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [displayName, setDisplayName] = useState<string>(user.displayName);
  const [bio, setBio] = useState<string>(user.bio || '');
  const [location, setLocation] = useState<string>(user.location || '');
  const [website, setWebsite] = useState<string>(user.website || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ displayName, bio, location, website });
    onClose();
  };

  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-primary bg-bg-primary shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="rounded-full p-1 text-text-muted hover:bg-bg-secondary hover:text-text-primary transition">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-base font-bold text-text-primary">Edit Profile</h2>
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-full bg-text-primary px-5 py-1.5 text-xs font-bold text-bg-primary hover:opacity-90 transition"
          >
            Save
          </button>
        </div>

        {/* Media Upload Area */}
        <div className="relative h-32 bg-bg-secondary">
          <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/40">
            <button type="button" className="rounded-full bg-bg-primary/60 p-2.5 text-text-primary backdrop-blur-sm hover:bg-bg-primary/80 transition">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          
          {/* Avatar Position */}
          <div className="absolute -bottom-10 left-4 relative h-20 w-20">
            <img
              src={user.avatarUrl}
              alt="Avatar edit preview"
              className="h-20 w-20 rounded-full border-4 border-bg-primary object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-bg-primary/40">
              <button type="button" className="text-text-primary hover:scale-105 transition">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-4 p-5">
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border border-border-primary bg-bg-secondary/40 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-border-focus transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full rounded-xl border border-border-primary bg-bg-secondary/40 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted resize-none outline-none focus:border-border-focus transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full rounded-xl border border-border-primary bg-bg-secondary/40 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-border-focus transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="yoursite.com"
                className="w-full rounded-xl border border-border-primary bg-bg-secondary/40 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-border-focus transition"
              />
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};