import { Register } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Sign Up | HYPPADEC',
    template: '%s | Sign Up | HYPPADEC',
  },
  description: 'HYPPADEC sign up page',
};

export default async function SignUp() {
  return (
    <main>
      <Register />
    </main>
  );
}
