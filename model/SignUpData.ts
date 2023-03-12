const generatedID = `user-${Math.floor(Math.random() * 100000000)}`;

class SignUpData {
  key?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;

  constructor() {
    this.key = '';
    this.id = this.id ? this.id : generatedID;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.password = '';
  }
}

export default SignUpData;
