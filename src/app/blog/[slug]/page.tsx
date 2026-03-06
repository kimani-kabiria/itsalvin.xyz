import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import type { Post } from "@/types/sanity";
import { BlogPostHero } from "@/components/blog/BlogPostHero";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { generatePostJsonLd } from "@/components/blog/JsonLd";
import { JsonLd } from "@/components/blog/JsonLd";
import { Metadata } from "next";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  author->{_id, name, slug},
  categories->{_id, title},
  body
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

async function generatePostMetadata(post: Post): Promise<Metadata> {
  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.url() : null;
  
  return {
    title: `${post.title} | Thinking Out Loud`,
    description: `Read ${post.title} on Thinking Out Loud - Where half-formed ideas, lessons, and curiosities come to stretch their legs.`,
    keywords: post.categories?.map(cat => cat.title).join(', ') || 'web development, technology, coding',
    openGraph: {
      title: post.title,
      description: `Read ${post.title} on Thinking Out Loud`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author?.name || 'Alvin'],
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: `Read ${post.title} on Thinking Out Loud`,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://itsalvin.xyz/blog/${post.slug.current}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug }, options);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white mb-4">
            Post not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const metadata = await generatePostMetadata(post);

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={generatePostJsonLd(post)} />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <BlogPostHero post={post} />
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <BlogPostContent post={post} />
          </div>
        </section>
      </div>
    </>
  );
}
