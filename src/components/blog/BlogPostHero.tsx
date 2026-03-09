'use client';

import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from '@/sanity/client';
import type { Post } from '@/types/sanity';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface BlogPostHeroProps {
  post: Post;
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.url() : null;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Background Image with Overlay */}
      {imageUrl && (
        <>
          <div 
            className={`
              absolute inset-0 bg-cover bg-center bg-no-repeat
              transition-all duration-1000 ease-out
              ${isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}
            `}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80 animate-in fade-in duration-1000" />
        </>
      )}
      
      {/* Fallback background if no image */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 animate-pulse" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <Link 
              href="/blog"
              className={`
                inline-flex items-center gap-2 text-white/80 hover:text-white 
                transition-all duration-300 transform hover:translate-x-2 hover:scale-105
                animate-in fade-in slide-in-from-left-4 duration-700
                mb-8
              `}
              style={{ animationDelay: '200ms' }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.categories.map((category, index) => (
                  <span
                    key={category._id}
                    className={`
                      px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm text-white 
                      rounded-full border border-white/30
                      transition-all duration-300 transform hover:scale-110 hover:bg-white/30
                      animate-in fade-in slide-in-from-bottom-2 duration-500
                    `}
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className={`
              text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-acorn-bold)] 
              text-white mb-6 leading-tight
              animate-in fade-in slide-in-from-bottom-4 duration-700
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ animationDelay: '400ms' }}
            >
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className={`
              flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80
              animate-in fade-in slide-in-from-bottom-2 duration-500
            `}
            style={{ animationDelay: '600ms' }}
            >
              {post.author && (
                <div className="flex items-center gap-2 transition-all duration-300 hover:text-white hover:scale-105">
                  <User className="w-4 h-4 animate-pulse" />
                  <span>{post.author.name}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 transition-all duration-300 hover:text-white hover:scale-105">
                <Calendar className="w-4 h-4 animate-pulse" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/60">
                <Clock className="w-3 h-3" />
                <span>5 min read</span>
              </div>
            </div>

            {/* Reading progress indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent animate-in fade-in duration-1000" />
    </div>
  );
}
