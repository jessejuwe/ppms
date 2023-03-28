import { Emergency } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Emergency Management | HYPPADEC',
    template: '%s | Emergency Management | HYPPADEC',
  },
  description: 'HYPPADEC - Emergency Management',
};

export default function EmergencyMM() {
  return <Emergency />;
}
