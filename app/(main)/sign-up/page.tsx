import { SignUpURL } from '@/helpers/urls';
import { Register } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Sign Up | PPMS',
    template: '%s | Sign Up | PPMS',
  },
  description: 'PPMS sign up page',
};

// Data fetching - getServerSideProps()
async function getUsers() {
  const res = await fetch(`${SignUpURL}`, { cache: 'no-store' });
  const data = await res.json();

  return data;
}

export default async function SignUp() {
  const users = await getUsers();

  return (
    <main>
      <Register users={users} />
    </main>
  );
}
