import { AboutUs } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'About | HYPPADEC',
    template: '%s | About | HYPPADEC',
  },
  description: 'Get to know what HYPPADEC is all about',
};

export default function About() {
  return (
    <main>
      <AboutUs />
    </main>
  );
}
