import { Register } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Sign Up | PPMS',
    template: '%s | Sign Up | PPMS',
  },
  description: 'PPMS sign up page',
};

export default async function SignUp() {
  return (
    <main>
      <Register />
    </main>
  );
}
