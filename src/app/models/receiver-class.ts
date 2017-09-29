export class ReceiverClass {
  firstName: string;
  lastName: string;
  phone: string;
  id_receiver: string;

  constructor( firstName: string,
               lastName: string,
               phone: string,
               id_receiver: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.id_receiver = id_receiver;
  }
}
