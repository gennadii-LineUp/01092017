export class ReceiverClass {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  account_id: number;

  constructor( firstName: string,
               lastName: string,
               phone: string,
               address: string,
               account_id: number) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.account_id = account_id;
  }
}
