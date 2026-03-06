import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import type { Post } from "@/types/sanity";
import { BlogPostHero } from "@/components/blog/BlogPostHero";
import { BlogPostContent } from "@/components/blog/BlogPostContent";

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

const options = { next: { revalidate: 30 } };

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogPostHero post={post} />
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <BlogPostContent post={post} />
        </div>
      </section>
    </div>
  );
}
