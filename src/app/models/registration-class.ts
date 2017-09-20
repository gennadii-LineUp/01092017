export class RegistrationClass {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  profile: string;

  constructor( firstName: string,
               lastName: string,
               phone: string,
               email: string,
               password: string,
               profile: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
}
