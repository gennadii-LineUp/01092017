export class RegistrationClass {
  nom: string;
  prenom: string;
  telephone: string;
  mail: string;
  password: string;
  profil: string;
  agreeTermsAndConditions: boolean;

  constructor( nom: string,
               prenom: string,
               telephone: string,
               mail: string,
               password: string,
               profil: string,
               agreeTermsAndConditions: boolean) {

    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.mail = mail;
    this.password = password;
    this.profil = profil;
    this.agreeTermsAndConditions = agreeTermsAndConditions;
  }
}
