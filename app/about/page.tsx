import { AboutUs } from '../../exports/exports';

export const metadata = {
  title: {
    default: 'About | PPMS',
    template: '%s | About | PPMS',
  },
  description: 'Get to know what PPMS is all about',
};

export default function About() {
  return (
    <main>
      <AboutUs />
    </main>
  );
}
