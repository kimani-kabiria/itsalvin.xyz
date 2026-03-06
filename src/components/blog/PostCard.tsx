import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from '@/sanity/client';
import type { Post } from '@/types/sanity';
import { Calendar, Clock, User } from 'lucide-react';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface PostCardProps {
  post: Post;
  isFeatured?: boolean;
}

export function PostCard({ post, isFeatured = false }: PostCardProps) {
  return (
    <article className={`
      group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full
      ${isFeatured ? 'p-6' : 'p-4'}
    `}>
      <Link href={`/blog/${post.slug.current}`} className="block h-full">
        {post.mainImage && (
          <div className={`
            overflow-hidden
            ${isFeatured ? 'aspect-[16/9] mb-4' : 'aspect-video'}
          `}>
            <img
              src={urlFor(post.mainImage)?.url() || '/placeholder.jpg'}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className={`
              flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3
              ${isFeatured ? 'text-base' : 'text-sm'}
            `}>
              <time className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </span>
              )}
            </div>

            <h2 className={`
              font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors
              ${isFeatured ? 'text-2xl' : 'text-xl'}
            `}>
              {post.title}
            </h2>

            {isFeatured && post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!isFeatured && post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
