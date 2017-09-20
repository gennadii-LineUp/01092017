export class RegistrationClass {
  email: string;
  company: string;
  address: string;
  postalCode: string;
  city: string;
  billingAddressIfDifferent: boolean;
  diffName: string;
  diffAddress: string;
  diffPostalCode: string;
  diffCity: string;
  phone: string;
  numberSiret: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  employeesLimit: number;

  constructor( email: string,
               company: string,
               address: string,
               postalCode: string,
               city: string,
               billingAddressIfDifferent: boolean,
               diffName: string = '',
               diffAddress: string = '',
               diffPostalCode: string = '',
               diffCity: string = '',
               phone: string,
               numberSiret: string,
               contactName: string = '',
               contactPhone: string = '',
               contactEmail: string = '',
               employeesLimit: number) {

    this.email = email;
    this.company = company;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.billingAddressIfDifferent = billingAddressIfDifferent;
    this.diffName = diffName;
    this.diffAddress = diffAddress;
    this.diffPostalCode = diffPostalCode;
    this.diffCity = diffCity;
    this.phone = phone;
    this.numberSiret = numberSiret;
    this.contactName = contactName;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
    this.employeesLimit = employeesLimit;
  }
}
