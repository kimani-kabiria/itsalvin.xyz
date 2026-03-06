import { PortableText } from 'next-sanity';
import type { Post } from '@/types/sanity';

interface BlogPostContentProps {
  post: Post;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <PortableText 
          value={post.body}
          components={{
            block: {
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white mt-8 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white mt-6 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white mt-5 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300">
                  {children}
                </blockquote>
              ),
            },
            marks: {
              link: ({ children, value }) => (
                <a 
                  href={value.href}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            },
            types: {
              image: ({ value }) => (
                <div className="my-8">
                  <img
                    src={value.asset?.url}
                    alt={value.alt || 'Blog post image'}
                    className="w-full rounded-lg shadow-lg"
                  />
                  {value.caption && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
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
