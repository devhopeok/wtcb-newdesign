import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BaseService {

  public baseUrl = "https://polar-scrubland-87428.herokuapp.com/api/";
  public signUpUrl = this.baseUrl + "signup";
  public loginUrl = this.baseUrl + "login";
  public deleteUrl = this.baseUrl + "delete";
  public officeUrl = this.baseUrl + "office";
  public requestUrl = this.baseUrl + "request";
  public stepUrl = this.baseUrl + "step";
  public getUserUrl = this.baseUrl + "getuser";
  public deviceTokenUrl = this.baseUrl + "device";
  public notificationUrl = this.baseUrl + "notification";
  
  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }
}
