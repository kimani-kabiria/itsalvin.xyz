import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <Link href="/blog" className="mb-8 inline-block">
        ← Back to posts
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage)?.url()}
          alt={post.title}
          className="w-full h-64 object-cover mb-8"
        />
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>
      <p className="text-gray-500 mt-8">
        Published: {new Date(post.publishedAt).toLocaleDateString()}
      </p>
    </main>
  );
}
