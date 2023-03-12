import { Inventory } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Store Inventory Program Management | PPMS',
    template: '%s | Education Support Program Management | PPMS',
  },
  description: 'Get to know what PPMS is all about',
};

export default function StoreInventoryMM() {
  return <Inventory />;
}
