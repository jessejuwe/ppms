import { FieldValue } from 'firebase/firestore';

export const initialValues: ItemEnlistment = {
  item_code: '',
  item_model: '',
  item_qty: '',
  category: '',
  vendor: '',
  timeStamp: undefined,
};

class ItemEnlistment {
  id?: string;
  item_code: string;
  item_model: string;
  item_qty: string;
  category: string;
  vendor: string;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.item_code = '';
    this.item_model = '';
    this.item_qty = '';
    this.category = '';
    this.vendor = '';
    this.timeStamp = undefined;
  }
}

export default ItemEnlistment;
