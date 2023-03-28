import { Dashboard } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard | HYPPADEC',
  },
  description: 'HYPPADEC User Dashboard',
};

export default function DashboardPage() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
