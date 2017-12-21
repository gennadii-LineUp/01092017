export class MarkerClass {
  latitude: number;
  longitude: number;
  nom: string;
  telephone: string;
  iconUrl: string;

  constructor(latitude: number,
              longitude: number,
              nom: string,
              telephone: string,
              iconUrl: string) {

    this.latitude = latitude;
    this.longitude = longitude;
    this.nom = nom;
    this.telephone = telephone;
    this.iconUrl = iconUrl;
  }
}
