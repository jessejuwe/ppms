import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get('loggedIn');
  const url = req.url;

  if (!loggedIn && url === 'http://localhost:3000/dashboard') {
    return NextResponse.redirect('http://localhost:3000/');
  }

  if (loggedIn && url === 'http://localhost:3000/sign-in') {
    return NextResponse.redirect('http://localhost:3000/dashboard');
  }
}
