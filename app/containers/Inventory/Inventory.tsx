import { INVENTORY } from '@/helpers/services-helper';
import { Service } from '@/exports/exports';

const Inventory: React.FC = () => {
  return <Service {...INVENTORY} />;
};

export default Inventory;
