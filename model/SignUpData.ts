import { FieldValue } from 'firebase/firestore';

class SignUpData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timeStamp?: FieldValue;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.timeStamp = undefined;
  }
}

export default SignUpData;
