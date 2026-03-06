interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateBlogJsonLd(posts: Array<{ 
  title: string; 
  slug: { current: string }; 
  publishedAt: string; 
  categories?: Array<{ title: string }> 
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Thinking Out Loud - Blog by Alvin',
    description: 'Where half-formed ideas, lessons, and curiosities come to stretch their legs.',
    author: {
      '@type': 'Person',
      name: 'Alvin',
    },
    publisher: {
      '@type': 'Organization',
      name: "Alvin's Blog",
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://itsalvin.xyz/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: 'Alvin',
      },
      publisher: {
        '@type': 'Organization',
        name: "Alvin's Blog",
      },
      about: post.categories?.map(cat => cat.title) || [],
    })),
  };
}

export function generatePostJsonLd(post: { 
  title: string; 
  slug: { current: string }; 
  publishedAt: string; 
  author?: { name: string };
  categories?: Array<{ title: string }>;
  mainImage?: any;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.title,
    image: post.mainImage ? [post.mainImage] : [],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Alvin',
    },
    publisher: {
      '@type': 'Organization',
      name: "Alvin's Blog",
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://itsalvin.xyz/blog/${post.slug.current}`,
    },
    about: post.categories?.map(cat => cat.title) || [],
  };
}
