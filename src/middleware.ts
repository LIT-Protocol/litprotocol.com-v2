import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Content negotiation for AI agents: a request for the homepage with
// `Accept: text/markdown` gets the markdown site overview (llms.txt) instead
// of HTML. `Vary: Accept` keeps CDNs from serving one variant to callers of
// the other.
export const config = { matcher: '/' };

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';
  const wantsMarkdown =
    accept.includes('text/markdown') && !accept.includes('text/html');

  const response = wantsMarkdown
    ? NextResponse.rewrite(new URL('/llms.txt', request.url))
    : NextResponse.next();

  response.headers.set('Vary', 'Accept');
  return response;
}
