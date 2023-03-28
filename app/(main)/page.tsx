import { Header, Sections } from '../../exports/exports';

export const metadata = {
  title: {
    default: 'HYPPADEC | PPMS',
    template: '%s | HYPPADEC',
  },
  description: 'HYPPADEC Programs and Project Management System',
};

export default function Home() {
  return (
    <main>
      <Header />
      <Sections />
    </main>
  );
}
