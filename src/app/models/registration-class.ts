export class RegistrationClass {
  nom: string;
  prenom: string;
  countryCode: number;
  telephone: string;
  mail: string;
  password: string;
  repeatPassword: string;
  profil: string;
  agreeTermsAndConditions: boolean;

  constructor( nom: string,
               prenom: string,
               countryCode: number,
               telephone: string,
               mail: string,
               password: string,
               repeatPassword: string,
               profil: string,
               agreeTermsAndConditions: boolean) {

    this.nom = nom;
    this.prenom = prenom;
    this.countryCode = countryCode;
    this.telephone = telephone;
    this.mail = mail;
    this.password = password;
    this.repeatPassword = repeatPassword;
    this.profil = profil;
    this.agreeTermsAndConditions = agreeTermsAndConditions;
  }
}
