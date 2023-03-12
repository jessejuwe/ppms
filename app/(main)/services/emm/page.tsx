import { Emergency } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Emergency Program Management | PPMS',
    template: '%s | Emergency Program Management | PPMS',
  },
  description: 'Get to know what PPMS is all about',
};

export default function EmergencyMM() {
  return <Emergency />;
}
