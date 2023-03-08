import { ModulesPage } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Services | PPMS',
    template: '%s | Services | PPMS',
  },
  description: 'Get to know what PPMS is all about',
};

export default function Modules() {
  return (
    <main>
      <ModulesPage />
    </main>
  );
}
