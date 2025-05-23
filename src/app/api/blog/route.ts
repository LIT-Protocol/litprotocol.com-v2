import { NextResponse } from 'next/server';
import GhostContentAPI from '@tryghost/content-api';

// Initialize API with error handling
let api: GhostContentAPI | null = null;

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

// Define the Ghost API post type
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

// Define the type for your formatted posts
interface FormattedPost {
  title: string;
  slug: string;
  image: string;
  alt: string;
  subtext: string;
}

// Helper function to extract text from HTML (fallback for excerpt)
function extractTextFromHtml(html: string, maxLength: number = 200): string {
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Named export for GET method
export async function GET() {
  // Check if API is initialized and environment variable exists
  if (!api) {
    console.error(
      'Ghost API not initialized - check GHOST_CONTENT_API_KEY environment variable'
    );
    return NextResponse.json(
      { error: 'Ghost API not configured' },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching posts from Ghost API...');

    const posts = await api.posts.browse({
      limit: 5,
      include: ['authors', 'tags'],
      fields: [
        'title',
        'slug',
        'feature_image',
        'excerpt',
        'custom_excerpt',
        'html',
      ],
      order: 'published_at DESC', // Get most recent posts
    });

    console.log(`Successfully fetched ${posts.length} posts from Ghost`);

    if (!posts || posts.length === 0) {
      console.warn('No posts returned from Ghost API');
      return NextResponse.json([]);
    }

    const formattedPosts: FormattedPost[] = posts.map((post: GhostPost) => {
      // Use custom_excerpt first, then excerpt, then extract from HTML, finally fallback
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
        image: post.feature_image || '/api/placeholder/400/300', // Better placeholder
        alt: post.title || 'Blog post image',
        subtext: subtext,
      };
    });

    console.log(
      'Formatted posts:',
      formattedPosts.map(p => ({ title: p.title, slug: p.slug }))
    );

    return NextResponse.json(formattedPosts);
  } catch (error: any) {
    console.error('Ghost API error details:', {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack,
    });

    // Return more specific error information in development
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

// Optional: Add a health check endpoint
export async function HEAD() {
  if (!api) {
    return new NextResponse(null, { status: 503 });
  }

  try {
    await api.posts.browse({ limit: 1 });
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}
