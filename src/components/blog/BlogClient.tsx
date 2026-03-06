'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PostCard } from './PostCard';
import { BlogSidebar } from './BlogSidebar';
import { LoadingSpinner } from './LoadingSpinner';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import type { Post, Category } from '@/types/sanity';

interface BlogClientProps {
  initialPosts: Post[];
  categories: Category[];
  totalPosts: number;
}

const POSTS_PER_PAGE = 6;

export function BlogClient({ initialPosts, categories, totalPosts }: BlogClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    try {
      const categoryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      const skip = selectedCategory ? filteredPosts.length : posts.length;
      
      const response = await fetch(
        `/api/posts?limit=${POSTS_PER_PAGE}&skip=${skip}${categoryParam}`
      );
      
      if (response.ok) {
        const newPosts: Post[] = await response.json();
        
        if (selectedCategory) {
          setFilteredPosts(prev => [...prev, ...newPosts]);
        } else {
          setPosts(prev => [...prev, ...newPosts]);
        }
        
        setHasMore(newPosts.length === POSTS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, selectedCategory, filteredPosts.length, posts.length]);

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
    const filterPosts = async () => {
      if (selectedCategory) {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/posts?category=${encodeURIComponent(selectedCategory)}&limit=${POSTS_PER_PAGE}`
          );
          
          if (response.ok) {
            const filtered = await response.json() as Post[];
            setFilteredPosts(filtered);
            setHasMore(filtered.length === POSTS_PER_PAGE);
          }
        } catch (error) {
          console.error('Error filtering posts:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredPosts(posts);
        setHasMore(posts.length < totalPosts);
      }
    };

    filterPosts();
  }, [selectedCategory, posts, totalPosts]);

  const displayPosts = selectedCategory ? filteredPosts : posts;

  return (
    <div className="relative">
      {/* Mobile Menu */}
      <MobileMenuDrawer
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {displayPosts.map((post, index) => {
              // Determine grid span based on index for bento effect
              const isFeatured = index === 0;
              const isLarge = index === 1 || index === 4;
              
              return (
                <div
                  key={post._id}
                  ref={index === displayPosts.length - 3 ? lastPostRef : undefined}
                  className={`
                    ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}
                    ${isLarge ? 'lg:col-span-2' : ''}
                    ${index === 2 || index === 5 ? 'lg:row-span-2' : ''}
                  `}
                >
                  <PostCard post={post} isFeatured={isFeatured} />
                </div>
              );
            })}
          </div>
          
          {loading && <LoadingSpinner />}
          
          {!hasMore && displayPosts.length > 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No more posts to load
            </div>
          )}
          
          {displayPosts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {selectedCategory ? `No posts found in "${selectedCategory}"` : 'No posts found'}
              </p>
            </div>
          )}
        </div>
        
        {/* Desktop Sidebar - Hidden on Mobile */}
        <div className="hidden lg:block">
          <BlogSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
