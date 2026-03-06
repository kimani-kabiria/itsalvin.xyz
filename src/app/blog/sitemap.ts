import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsQuery = `*[_type == "post" && defined(slug.current)]{
    slug,
    publishedAt
  }`;

  const posts = await client.fetch(postsQuery, {}, { next: { revalidate: 86400 } });

  return posts.map((post: any) => ({
    url: `https://itsalvin.xyz/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
}
