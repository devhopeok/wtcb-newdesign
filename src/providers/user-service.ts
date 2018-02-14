import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  constructor(public http: Http, public baseService: BaseService) {
  }

  signUp(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.signUpUrl, JSON.stringify(user), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error));
  }

  login(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.loginUrl, JSON.stringify(user), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createOffice(office){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.officeUrl, JSON.stringify(office), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getOffices(buildingId, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(this.baseService.officeUrl + "/" + buildingId + "?token=" + token);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.officeUrl + "/" + buildingId + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getOfficesById(id, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(this.baseService.officeUrl + "/id/" + id + "?token=" + token);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.officeUrl + "/id/" + id + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getOfficeByEmail(token){
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(this.baseService.officeUrl + "/by/email?token=" + token);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.officeUrl + "/by/email?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getAllOffices(token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.officeUrl + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  updateOffice(office){
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(this.baseService.officeUrl + "/" + office._id);
    let options = new RequestOptions({headers: headers});

    return this.http.patch(this.baseService.officeUrl + "/" + office._id, JSON.stringify(office), options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  createRequest(request){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.baseService.requestUrl, request);
    return this.http.post(this.baseService.requestUrl, JSON.stringify(request), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createStep(step){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.stepUrl, JSON.stringify(step), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateStep(id, step){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(this.baseService.stepUrl + "/" + id, JSON.stringify(step), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSteps(token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.stepUrl + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getRequestsByOffice(officeKey, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.requestUrl + '/officeKey/' + officeKey + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getRequestsByUser(userKey, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.requestUrl + '/userKey/' + userKey + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  deleteRequest(id, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.delete(this.baseService.requestUrl + '/' + id + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getAllRequests(token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.requestUrl + '/' + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getRequestsById(id, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.requestUrl + '/id/' + id + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getStepById(id, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.stepUrl + '/' + id + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getUserById(userKey){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.getUserUrl + '/' + userKey, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getUsersByLevel(level){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.getUserUrl + 'bylevel/' + level, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getUserByEmail(email){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.getUserUrl + 'byemail/' + email, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  updateRequest(id, request){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(this.baseService.requestUrl + "/" + id, JSON.stringify(request), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  insertDeviceToken(device_token){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.deviceTokenUrl, JSON.stringify(device_token), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDeviceById(id, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.deviceTokenUrl + '/' + id + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  addNotification(notification){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.notificationUrl, JSON.stringify(notification), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getNotifications(token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseService.notificationUrl + '?token=' + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  updateNotification(id, data){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(this.baseService.notificationUrl + "/" + id, JSON.stringify(data), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteNotification(id, token){
    let headers = new Headers({'Content-Type': 'application/json'});
    
    let options = new RequestOptions({headers: headers});

    return this.http.delete(this.baseService.notificationUrl + '/' + id + "?token=" + token, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
}
