import GhostAdminAPI from '@tryghost/admin-api';
import { NextResponse } from 'next/server';

const admin = new GhostAdminAPI({
  url: process.env.GHOST_API_URL || 'https://spark.ghost.io',
  key: process.env.GHOST_ADMIN_API_KEY || '',
  version: 'v5.0',
});

async function addMember(email: string) {
  return await admin.members.add(
    { email },
    { send_email: true, email_type: 'subscribe' }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Valid email required' },
      { status: 400 }
    );
  }

  try {
    const res = await addMember(email);
    return NextResponse.json(res);
  } catch (err: any) {
    console.error('Ghost API Error:', {
      message: err.message,
      context: err.context,
      type: err.type,
      statusCode: err.statusCode,
      fullError: err,
    });

    const context = err?.context ? err.context.toLowerCase() : '';
    const message = err?.message ? err.message.toLowerCase() : '';

    // Check for existing member in both context and message
    if (
      context.includes('already exists') ||
      context.includes('member already exists') ||
      message.includes('already exists')
    ) {
      return NextResponse.json(
        {
          success: true,
          message: 'Already subscribed!',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error: err.message,
        details: err.context || 'No additional context',
      },
      { status: 400 }
    );
  }
}
