import { Inventory } from '@/exports/exports';

export const metadata = {
  title: {
    default: 'Store Inventory Management | HYPPADEC',
    template: '%s | Store Inventory Management | HYPPADEC',
  },
  description: 'HYPPADEC - Store Inventory Management',
};

export default function StoreInventoryMM() {
  return <Inventory />;
}
