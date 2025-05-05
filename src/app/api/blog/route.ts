import { NextResponse } from 'next/server';
import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: 'https://spark.ghost.io',
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: 'v5.0',
});

// Define the Ghost API post type
interface GhostPost {
  title: string;
  slug: string;
  feature_image: string | null;
  excerpt: string | null;
  authors?: Array<any>; // You're including authors but not using them
  tags?: Array<any>; // You're including tags but not using them
}

// Define the type for your formatted posts
interface FormattedPost {
  title: string;
  slug: string;
  image: string;
  alt: string;
  subtext: string | null;
}

// Named export for GET method
export async function GET() {
  try {
    const posts = await api.posts.browse({
      limit: 5,
      include: ['authors', 'tags'],
    });

    const formattedPosts = posts.map(
      (post: GhostPost): FormattedPost => ({
        title: post.title,
        slug: post.slug,
        image: post.feature_image || '/fallback.jpg',
        alt: post.title,
        subtext: post.excerpt,
      })
    );

    return NextResponse.json(formattedPosts);
  } catch (error: any) {
    console.error('Ghost API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts from Ghost' },
      { status: 500 }
    );
  }
}
