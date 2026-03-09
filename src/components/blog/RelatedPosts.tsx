'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import type { Post } from '@/types/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';
import { useState, useEffect, useRef } from 'react';

interface RelatedPostsProps {
  posts: Post[];
}

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className={`
        mt-16 border-t border-gray-200 dark:border-gray-700 pt-8
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="flex items-center mb-8 animate-in fade-in slide-in-from-left-2 duration-700">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3 animate-pulse">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Related Posts
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className={`
              group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 
              overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 
              transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 hover:scale-[1.02]
              animate-in fade-in slide-in-from-bottom-4 duration-700
            `}
            style={{ animationDelay: `${200 + index * 150}ms` }}
          >
            {/* Image */}
            {post.mainImage && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={urlFor(post.mainImage)?.url() || ''}
                  alt={post.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Read more indicator */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-0 group-hover:scale-100 translate-x-2 scale-75">
                  <ArrowRight className="w-4 h-4 text-gray-900 dark:text-white" />
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 2).map((category, catIndex) => (
                    <span
                      key={category._id}
                      className={`
                        inline-block px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 
                        bg-blue-50 dark:bg-blue-900/20 rounded-full
                        transition-all duration-300 hover:scale-110 hover:bg-blue-100 dark:hover:bg-blue-900/40
                        animate-in fade-in slide-in-from-bottom-1 duration-500
                      `}
                      style={{ animationDelay: `${400 + index * 150 + catIndex * 50}ms` }}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1">
                {post.title}
              </h3>
              
              {/* Date */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                <Calendar className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View all posts link */}
      <div className="text-center mt-8 animate-in fade-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: '800ms' }}>
        <Link
          href="/blog"
          className={`
            inline-flex items-center px-6 py-3 text-sm font-medium 
            text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
            transition-all duration-300 border border-blue-200 dark:border-blue-800 rounded-lg 
            hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 hover:shadow-lg
            transform hover:-translate-y-1
          `}
        >
          View All Posts
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
