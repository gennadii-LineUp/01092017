export class ReceiverClass {
  nom: string;
  prenom: string;
  telephone: string;
  address: string;
  id_account: number;
  profil: string;
  email: string;
  numTel: string;
  status: string;
  type: string;
  uoId: string;

  constructor( nom: string,
               prenom: string,
               telephone: string,
               address: string,
               id_account: number,
               profil: string,
               email: string,
               numTel: string,
               status: string,
              type: string,
              uoId: string) {

    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.address = address;
    this.id_account = id_account;
    this.profil = profil;
    this.email = email;
    this.numTel = numTel;
    this.status = status;
    this.type = type;
    this.uoId = uoId;
  }
}
