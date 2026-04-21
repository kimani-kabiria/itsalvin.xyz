'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PostCard } from './PostCard';
import { BlogSidebar } from './BlogSidebar';
import { LoadingSpinner } from './LoadingSpinner';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { BlogHeader } from './BlogHeader';
import { usePosts } from '@/hooks/api/posts';
import type { Post, Category } from '@/types/sanity';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface BlogClientProps {
  initialPosts: Post[];
  categories: Category[];
  totalPosts: number;
  onSearchChange?: (query: string) => void;
}

const POSTS_PER_PAGE = 6;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function BlogClient({ initialPosts, categories, totalPosts }: BlogClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  const { posts: filteredPostsData, isLoading: filteredLoading } = usePosts({
    limit: POSTS_PER_PAGE,
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
  });

  const { posts: morePosts, isLoading: moreLoading } = usePosts({
    limit: POSTS_PER_PAGE,
    skip: selectedCategory || searchQuery ? filteredPosts.length : posts.length,
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
  });

  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;
    
    if (morePosts.length > 0) {
      if (selectedCategory || searchQuery) {
        setFilteredPosts(prev => [...prev, ...morePosts]);
      } else {
        setPosts(prev => [...prev, ...morePosts]);
      }
      
      setHasMore(morePosts.length === POSTS_PER_PAGE);
    }
  }, [loading, hasMore, selectedCategory, searchQuery, morePosts]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePosts]
  );

  useEffect(() => {
    if (selectedCategory || searchQuery) {
      setFilteredPosts(filteredPostsData);
      setHasMore(filteredPostsData.length === POSTS_PER_PAGE);
    } else {
      setFilteredPosts(posts);
      setHasMore(posts.length < totalPosts);
    }
  }, [selectedCategory, searchQuery, filteredPostsData, posts, totalPosts]);

  useEffect(() => {
    setLoading(filteredLoading || moreLoading);
  }, [filteredLoading, moreLoading]);

  const displayPosts = selectedCategory || searchQuery ? filteredPosts : posts;

  return (
    <div className="relative">
      <BlogHeader onSearchChange={setSearchQuery} />
      
      {/* Mobile Menu */}
      <MobileMenuDrawer
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Bento Grid Layout with Framer Motion */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${selectedCategory}-${searchQuery}`} // Re-trigger animation on filter
          >
            <AnimatePresence>
              {displayPosts.map((post, index) => {
                // Determine grid span based on index for bento effect
                const isFeatured = index === 0;
                const isLarge = index === 1 || index === 4;
                
                return (
                  <motion.div
                    key={post._id}
                    ref={index === displayPosts.length - 3 ? lastPostRef : undefined}
                    className={`
                      ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}
                      ${isLarge ? 'lg:col-span-2' : ''}
                      ${index === 2 || index === 5 ? 'lg:row-span-2' : ''}
                    `}
                    variants={itemVariants}
                    layout
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <PostCard post={post} isFeatured={isFeatured} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {/* Loading Spinner with animation */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="flex justify-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <LoadingSpinner />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* No more posts message */}
          <AnimatePresence>
            {!hasMore && displayPosts.length > 0 && (
              <motion.div 
                className="text-center py-8 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                No more posts to load
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* No posts found message */}
          <AnimatePresence>
            {displayPosts.length === 0 && !loading && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery 
                    ? `No posts found matching "${searchQuery}"`
                    : selectedCategory 
                      ? `No posts found in "${selectedCategory}"` 
                      : 'No posts found'
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Desktop Sidebar - Hidden on Mobile */}
        <motion.div 
          className="hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <BlogSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>
      </div>
    </div>
  );
}
