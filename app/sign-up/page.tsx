// 'use client';

import { Register } from '../../exports/exports';

export const metadata = {
  title: {
    default: 'Sign Up | PPMS',
    template: '%s | Sign Up | PPMS',
  },
  description: 'PPMS sign up page',
};

export default function SignUp() {
  return (
    <main>
      <Register />
    </main>
  );
}
