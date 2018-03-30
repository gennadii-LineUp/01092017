export class BeneficiaryClass {
  banque: string;
  compte: string;
  guichet: string;
  id: string;
  nom: string;
  prenom: string;
  rib: string;

  constructor(banque: string,
              compte: string,
              guichet: string,
              id: string,
              nom: string,
              prenom: string,
              rib: string) {

    this.banque = banque;
    this.compte = compte;
    this.guichet = guichet;
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.rib = rib;
  }
}
