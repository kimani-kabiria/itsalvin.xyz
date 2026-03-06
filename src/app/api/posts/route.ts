import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import type { Post } from '@/types/sanity';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '6');
    const skip = parseInt(searchParams.get('skip') || '0');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = `*[
      _type == "post"
      && defined(slug.current)`;
    
    if (category) {
      query += ` && $category in categories[].title`;
    }
    
    if (search) {
      query += ` && (title match $search || pt::text(body) match $search)`;
    }
    
    query += `]|order(publishedAt desc)[${skip}...${skip + limit}]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      author->{_id, name, slug},
      categories->{_id, title}
    }`;

    const posts = await client.fetch<Post[]>(
      query,
      { 
        ...(category && { category }),
        ...(search && { search: `*${search}*` })
      },
      { next: { revalidate: 30 } }
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
