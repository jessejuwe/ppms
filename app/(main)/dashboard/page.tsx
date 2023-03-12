import { Dashboard } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard | PPMS',
  },
  description: 'PPMS User Dashboard',
};

export default function DashboardPage() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
