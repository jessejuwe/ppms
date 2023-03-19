import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get('loggedIn');
  const url = req.url;

  // for localhost
  if (!loggedIn && url === 'http://localhost:3000/dashboard') {
    return NextResponse.redirect('http://localhost:3000/');
  }

  if (loggedIn && url === 'http://localhost:3000/sign-in') {
    return NextResponse.redirect('http://localhost:3000/dashboard');
  }

  // for production
  if (!loggedIn && url === 'http://ppms.vercel.app/dashboard') {
    return NextResponse.redirect('http://ppms.vercel.app/');
  }

  if (loggedIn && url === 'http://ppms.vercel.app/sign-in') {
    return NextResponse.redirect('http://ppms.vercel.app/dashboard');
  }
}
