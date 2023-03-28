import { ModulesPage } from '../../../exports/exports';

export const metadata = {
  title: {
    default: 'Services | HYPPADEC',
    template: '%s | Services | HYPPADEC',
  },
  description: 'HYPPADEC - Project Management',
};

export default function Modules() {
  return (
    <main>
      <ModulesPage />
    </main>
  );
}
