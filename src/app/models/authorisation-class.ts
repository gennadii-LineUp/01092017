export class AuthorisationClass {
  phone: string;
  password: string;
  mode: string;

  constructor( phone: string,
               password: string,
               mode: string) {

    this.phone = phone;
    this.password = password;
    this.mode = mode;
  }
}
