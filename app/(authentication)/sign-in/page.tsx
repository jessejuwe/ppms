import { Resume } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Sign In | PPMS',
    template: '%s | Sign In | PPMS',
  },
  description: 'PPMS sign in page',
};

export default function SignIn() {
  return (
    <main>
      <Resume />
    </main>
  );
}
