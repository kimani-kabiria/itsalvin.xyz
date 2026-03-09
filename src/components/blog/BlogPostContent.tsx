'use client';

import { PortableText } from 'next-sanity';
import type { Post } from '@/types/sanity';
import { useState, useEffect, useRef } from 'react';

interface BlogPostContentProps {
  post: Post;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article 
      ref={contentRef}
      className="max-w-4xl mx-auto"
    >
      <div className={`
        prose prose-lg prose-gray dark:prose-invert max-w-none
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      >
        <PortableText 
          value={post.body}
          components={{
            block: {
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white mt-8 mb-4 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white mt-6 mb-3 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 border-l-4 border-transparent hover:border-blue-500 pl-4 -ml-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white mt-5 mb-2 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300 hover:translate-x-1">
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300 rounded-r-lg transition-all duration-300 hover:shadow-md hover:translate-x-2">
                  {children}
                </blockquote>
              ),
            },
            marks: {
              link: ({ children, value }) => (
                <a 
                  href={value.href}
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-all duration-300 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            },
            types: {
              image: ({ value }) => (
                <div className="my-8 group">
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                    <img
                      src={value.asset?.url}
                      alt={value.alt || 'Blog post image'}
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {value.caption && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                      {value.caption}
                    </p>
                  )}
                </div>
              ),
            },
          }}
        />
      </div>
    </article>
  );
}
