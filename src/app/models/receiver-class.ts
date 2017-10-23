export class ReceiverClass {
  nom: string;
  prenom: string;
  telephone: string;
  address: string;
  account_id: number;
  profil: string;

  constructor( nom: string,
               prenom: string,
               telephone: string,
               address: string,
               account_id: number,
               profil: string) {

    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.address = address;
    this.account_id = account_id;
    this.profil = profil;
  }
}
