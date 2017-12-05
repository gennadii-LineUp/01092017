export class UrlParams {

  private static baseUrl = 'http://50.116.97.25:8080/cash-ws/CashWalletServiceWS?wsdl';
  // private static baseUrl = 'http://82.117.251.13/api/';
  // private static baseUrl = 'http://api.lab.sygma-online.fr/';


  public static get backendUrl(): string {
    return UrlParams.baseUrl;
  }
  // public static get LOGIN(): string {
  //   return UrlParams.baseUrl + `login`;
  // }


}
