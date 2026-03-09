'use client';

import { useState } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { AboutModal } from './AboutModal';
import type { Category } from '@/types/sanity';
import { BookOpen, Info } from 'lucide-react';

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function BlogSidebar({ categories, selectedCategory, onCategoryChange }: BlogSidebarProps) {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <>
      <aside className="lg:w-80 space-y-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        
        {/* About This Blog Card - Clickable */}
        <button
          onClick={() => setIsAboutModalOpen(true)}
          className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group animate-in fade-in slide-in-from-right-2 duration-700"
          style={{ animationDelay: '300ms' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                About This Blog
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Info className="w-3 h-3" />
                Click to learn more
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-left line-clamp-3">
            Welcome to my blog where I share thoughts, tutorials, and insights about web development, 
            technology, and creative coding. Stay tuned for regular updates!
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Discover more</span>
            <span className="animate-pulse">→</span>
          </div>
        </button>
      </aside>

      {/* About Modal */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />
    </>
  );
}
