import { BlogClient } from '@/components/blog/BlogClient';
import { client } from '@/sanity/client';
import type { Post, Category } from '@/types/sanity';
import { blogMetadata } from './metadata';
import { generateBlogJsonLd } from '@/components/blog/JsonLd';
import { Metadata } from 'next';
import { JsonLd } from '@/components/blog/JsonLd';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  author->{_id, name, slug},
  categories->{_id, title}
}`;

const CATEGORIES_QUERY = `*[_type == "category"]|order(title asc){
  _id,
  title,
  description
}`;

const TOTAL_POSTS_QUERY = `count(*[_type == "post" && defined(slug.current)])`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: blogMetadata.title,
    description: blogMetadata.description,
    keywords: blogMetadata.keywords,
    openGraph: {
      ...blogMetadata.openGraph,
      url: 'https://itsalvin.xyz/blog',
    },
    twitter: blogMetadata.twitter,
    alternates: {
      canonical: 'https://itsalvin.xyz/blog',
    },
  };
}

export default async function BlogPage() {
  const [posts, categories, totalPosts] = await Promise.all([
    client.fetch<Post[]>(POSTS_QUERY, {}, options),
    client.fetch<Category[]>(CATEGORIES_QUERY, {}, options),
    client.fetch<number>(TOTAL_POSTS_QUERY, {}, options)
  ]);

  return (
    <>
      {/* Structured Data */}
      <script />
      
      <main className="container mx-auto min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <BlogClient 
            initialPosts={posts}
            categories={categories}
            totalPosts={totalPosts}
          />
        </div>
      </main>
    </>
  );
}
