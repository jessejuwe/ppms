import { Header, Sections } from '../../exports/exports';

export const metadata = {
  title: {
    default: 'PPMS',
    template: '%s | PPMS',
  },
  description: 'Programs and Project Management System',
};

export default function Home() {
  return (
    <main>
      <Header />
      <Sections />
    </main>
  );
}
