const generatedID = `user-${Math.floor(Math.random() * 100000000)}`;

class SignInData {
  key?: string;
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor() {
    this.key = '';
    this.id = this.id ? this.id : generatedID;
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

export default SignInData;
