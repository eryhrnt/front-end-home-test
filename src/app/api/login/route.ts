import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const usename = formData.get('usename');
  const password = formData.get('password');

  if (usename === 'testExample' && password === 'password') {
    // Redirect to articles
    return NextResponse.redirect(new URL('/articles', req.url));
  }

  // Redirect back to login on failure
  return NextResponse.redirect(new URL('/login', req.url));
}