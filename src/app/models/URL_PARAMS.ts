export class UrlParams {

  private static baseUrl = 'http://sfapi:8000/app_dev.php/';
  // private static baseUrl = 'http://82.117.251.13/api/';
  // private static baseUrl = 'http://api.lab.sygma-online.fr/';


  public static get homeUrl(): string {
    return UrlParams.baseUrl;
  }
  public static get LOGIN(): string {
    return UrlParams.baseUrl + `login`;
  }


}
