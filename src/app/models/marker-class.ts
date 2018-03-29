export class MarkerClass {
  latitude: number;
  longitude: number;
  nom: string;
  prenom: string;
  telephone: string;
  iconUrl: string;

  constructor(latitude: number,
              longitude: number,
              nom: string,
              prenom: string,
              telephone: string,
              iconUrl: string) {

    this.latitude = latitude;
    this.longitude = longitude;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.iconUrl = iconUrl;
  }
}
