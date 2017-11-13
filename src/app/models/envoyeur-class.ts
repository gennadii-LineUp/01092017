export class EnvoyeurClass {
  nom: string;
  prenom: string;
  cellulaire: string;
  addresse: string;
  id_type: string;
  id_pays: string;
  id_valeur: string;
  id_debut: string;
  id_fin: string;

  constructor( nom: string,
               prenom: string,
               cellulaire: string,
               addresse: string,
               id_type: string,
              id_pays: string,
              id_valeur: string,
              id_debut: string,
              id_fin: string) {

    this.nom = nom;
    this.prenom = prenom;
    this.cellulaire = cellulaire;
    this.addresse = addresse;
    this.id_type = id_type;
    this.id_pays = id_pays;
    this.id_valeur = id_valeur;
    this.id_debut = id_debut;
    this.id_fin = id_fin;
  }
}
