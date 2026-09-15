import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Content negotiation for AI agents: a request for the homepage with
// `Accept: text/markdown` gets the markdown site overview (llms.txt) instead
// of HTML. `Vary: Accept` keeps CDNs from serving one variant to callers of
// the other.
export const config = { matcher: ['/', '/preview/:path*'] };

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/preview')) {
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
    return NextResponse.next();
  }

  const accept = request.headers.get('accept') ?? '';
  const wantsMarkdown =
    accept.includes('text/markdown') && !accept.includes('text/html');

  const response = wantsMarkdown
    ? NextResponse.rewrite(new URL('/llms.txt', request.url))
    : NextResponse.next();

  response.headers.set('Vary', 'Accept');
  return response;
}
