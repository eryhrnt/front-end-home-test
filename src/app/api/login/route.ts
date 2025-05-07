import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === 'test@example.com' && password === 'password') {
    // Redirect to articles
    return NextResponse.redirect(new URL('/articles', req.url));
  }

  // Redirect back to login on failure
  return NextResponse.redirect(new URL('/login', req.url));
}