import { Head } from 'next/document';
import { JsonLd } from './JsonLd';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  jsonLd?: object;
}

export function SeoHead({
  title,
  description,
  keywords,
  canonical,
  openGraph,
  twitter,
  jsonLd,
}: SeoHeadProps) {
  return (
    <>
      {/* Basic Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      {openGraph && (
        <>
          <meta property="og:title" content={openGraph.title || title || ''} />
          <meta property="og:description" content={openGraph.description || description || ''} />
          <meta property="og:type" content={openGraph.type || 'website'} />
          {openGraph.image && <meta property="og:image" content={openGraph.image} />}
          <meta property="og:locale" content="en_US" />
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
          <meta name="twitter:title" content={twitter.title || title || ''} />
          <meta name="twitter:description" content={twitter.description || description || ''} />
          {twitter.image && <meta name="twitter:image" content={twitter.image} />}
          <meta name="twitter:creator" content="@alvin" />
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Alvin" />
      <meta name="theme-color" content="#000000" />
      
      {/* Structured Data */}
      {jsonLd && <JsonLd data={jsonLd} />}
    </>
  );
}
