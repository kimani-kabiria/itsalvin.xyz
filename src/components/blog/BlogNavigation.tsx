'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Post } from '@/types/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';
import { useState, useEffect, useRef } from 'react';

interface BlogNavigationProps {
  previousPost: Post | null;
  nextPost: Post | null;
}

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export function BlogNavigation({ previousPost, nextPost }: BlogNavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav 
      ref={navRef}
      className={`
        border-t border-gray-200 dark:border-gray-700 mt-16 pt-8
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Previous Post */}
        {previousPost && (
          <Link
            href={`/blog/${previousPost.slug.current}`}
            className={`
              group flex flex-col space-y-3 p-6 rounded-lg border border-gray-200 dark:border-gray-700 
              hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 hover:shadow-xl
              transform hover:-translate-y-2 hover:scale-[1.02] animate-in fade-in slide-in-from-left-4 duration-700
            `}
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-2" />
              Previous Post
            </div>
            
            {previousPost.mainImage && (
              <div className="relative w-full h-32 rounded-md overflow-hidden">
                <Image
                  src={urlFor(previousPost.mainImage)?.url() || ''}
                  alt={previousPost.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 line-clamp-2 group-hover:translate-x-1">
              {previousPost.title}
            </h3>
            
            <time className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
              {new Date(previousPost.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </Link>
        )}

        {/* Next Post */}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug.current}`}
            className={`
              group flex flex-col space-y-3 p-6 rounded-lg border border-gray-200 dark:border-gray-700 
              hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 hover:shadow-xl
              transform hover:-translate-y-2 hover:scale-[1.02] md:text-right animate-in fade-in slide-in-from-right-4 duration-700
            `}
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 md:justify-end">
              Next Post
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
            
            {nextPost.mainImage && (
              <div className="relative w-full h-32 rounded-md overflow-hidden">
                <Image
                  src={urlFor(nextPost.mainImage)?.url() || ''}
                  alt={nextPost.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 line-clamp-2 group-hover:-translate-x-1">
              {nextPost.title}
            </h3>
            
            <time className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
              {new Date(nextPost.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </Link>
        )}
      </div>
    </nav>
  );
}
