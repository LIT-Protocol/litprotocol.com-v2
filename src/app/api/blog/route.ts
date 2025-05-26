import { NextResponse } from 'next/server';
import GhostContentAPI from '@tryghost/content-api';

let api: InstanceType<typeof GhostContentAPI> | null = null;

try {
  if (process.env.GHOST_CONTENT_API_KEY) {
    api = new GhostContentAPI({
      url: 'https://spark.ghost.io',
      key: process.env.GHOST_CONTENT_API_KEY,
      version: 'v5.0',
    });
  }
} catch (error) {
  console.error('Failed to initialize Ghost API:', error);
}

interface GhostPost {
  title: string;
  slug: string;
  feature_image: string | null;
  excerpt: string | null;
  custom_excerpt?: string | null;
  html?: string;
  authors?: Array<any>;
  tags?: Array<any>;
}

interface FormattedPost {
  title: string;
  slug: string;
  image: string;
  alt: string;
  subtext: string;
}

function extractTextFromHtml(html: string, maxLength: number = 200): string {
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export async function GET() {
  if (!api) {
    console.error('Ghost API not initialized - check GHOST_CONTENT_API_KEY');
    return NextResponse.json(
      { error: 'Ghost API not configured' },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching posts from Ghost API...');

    const posts = await api.posts.browse({
      limit: 20, // fetch more to reduce need for client-side fetching
      include: ['authors', 'tags'],
      fields: ['title', 'slug', 'feature_image', 'excerpt', 'custom_excerpt', 'html'],
      order: 'published_at DESC',
    });

    console.log(`Fetched ${posts.length} posts from Ghost`);

    const formattedPosts: FormattedPost[] = posts.map((post: GhostPost) => {
      let subtext = post.custom_excerpt || post.excerpt;

      if (!subtext && post.html) {
        subtext = extractTextFromHtml(post.html);
      }

      if (!subtext) {
        subtext = 'Read more about this article.';
      }

      return {
        title: post.title || 'Untitled',
        slug: post.slug,
        image: post.feature_image || '/api/placeholder/400/300',
        alt: post.title || 'Blog post image',
        subtext,
      };
    });

    return new NextResponse(JSON.stringify(formattedPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error: any) {
    console.error('Ghost API error:', {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack,
    });

    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(
      {
        error: 'Failed to fetch posts from Ghost',
        ...(isDevelopment && {
          details: error.message,
          code: error.code,
        }),
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  if (!api) {
    return new NextResponse(null, { status: 503 });
  }

  try {
    await api.posts.browse({ limit: 1 });
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
