export class PassportClass {
  dateDebut: string;
  dateFin: string;
  pays: string;
  type: string;
  valeur: string;

  constructor(dateDebut: string,
              dateFin: string,
              pays: string,
              type: string,
              valeur: string) {

    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.pays = pays;
    this.type = type;
    this.valeur = valeur;
  }
}
