import { Resume } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Sign In | HYPPADEC',
    template: '%s | Sign In | HYPPADEC',
  },
  description: 'HYPPADEC sign in page',
};

export default function SignIn() {
  return (
    <main>
      <Resume />
    </main>
  );
}
