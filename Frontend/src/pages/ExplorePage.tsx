import React from 'react';

const MOCK_EXPLORE_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ExplorePage: React.FC = () => {
  return (
<div className="w-full">
      {/* Header */}
      <div className="p-4 border-b border-border-primary">
        <h1 className="text-lg font-bold text-text-primary">Explore</h1>
      </div>

      {/* Masonry-inspired Grid */}
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {MOCK_EXPLORE_ITEMS.map((item, idx) => (
          <div 
            key={item} 
            className={`relative aspect-square bg-bg-secondary overflow-hidden group ${
              idx % 5 === 0 ? 'col-span-2 row-span-2' : '' // Create hero tiles
            }`}
          >
            <img 
              src={`https://images.unsplash.com/photo-${1600000000000 + idx}?w=800&auto=format&fit=crop&q=60`}
              alt="Discovery content"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
              <span className="text-xs font-semibold text-white">View Post</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};