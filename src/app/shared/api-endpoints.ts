import { environment } from 'src/environments/environment';

export class Endpoint {
  public static GET_SUBSCRIPTIONS = `${environment.apiEndpoint}/user/subscriptions`;
  
  /**
   * Needs a callback code attached
   */
  public static GET_AUTH_CALLBACK = `${environment.apiEndpoint}/auth/callback?code=`;
  
  public static GET_AUTH_REDIRECT = `${environment.apiEndpoint}/auth`;
}