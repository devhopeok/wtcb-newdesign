import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {UserService} from './user-service';
import { OneSignal } from '@ionic-native/onesignal';
/*
 Generated class for the PushServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class PushServiceProvider {

    public authOpt: RequestOptions;
    private PUSH_CREATE_URL = 'https://onesignal.com/api/v1/notifications';

    constructor(public http: Http, public userService: UserService, public oneSignal: OneSignal) {
        //console.log('Hello PushServiceProvider Provider');

        let myHeaders: Headers = new Headers;
        myHeaders.set('Authorization', "Basic YTUzYzE2NmYtNDZjZC00M2Q4LThkMmYtMjY3ZTJiYTY1MWQy");
        myHeaders.set('Content-Type', 'application/json; charset=utf-8');
        this.authOpt = new RequestOptions({
            headers: myHeaders,
        });
    }

    public notiBuildingManagerForRequest(requestId, message, token) {
        

        this.userService.getUsersByLevel(7)
          .subscribe(
            (data) => {
                let userDevices = [];
                for (let i=0; i<data.length; i++){
                    this.userService.getDeviceById(data[i].email, token)
                    .subscribe(
                    (data1)=>{
                        
                        userDevices.push(data1.device_token);

                        //if (userDevices.length == data.length){
                            console.log("requestid and message", requestId, message, userDevices);

                            // //let notificationObj: OSNotification = new OSNotification();
                            // this.notificationObj.contents = {en: message};
                            // this.notificationObj.include_player_ids = userDevices;
                            // console.log("this.notificationObj", this.notificationObj);
                            // this.oneSignal.postNotification(this.notificationObj).then(
                            //     (successResponse) => {
                            //         console.log("Notification Post Success:", successResponse);
                            //     },
                            //     (failedResponse) => {
                            //         console.log("Notification Post Failed: ", failedResponse);
                            //     });
                            
                            let pushData = {
                                "app_id": "ae60cbd3-3a45-469c-b6c7-bcb6104c31b4",
                                "include_player_ids": userDevices,
                                "contents": {'en': message}
                            };

                            console.log("push Data", pushData);
                            this.http.post(this.PUSH_CREATE_URL, pushData, this.authOpt).map(res => res.json()).subscribe(
                                data => {
                                    console.log('Notification sent successfully!');
                                },
                                err => {
                                    console.log('Notification sending error!');
                                },
                                () => console.log('Create Notification')
                            );
                        //}
                    },
                    (data1)=>{

                    });
                }


              
            },
            (data) => {
              
            });
    }

    public notiUserForRequest(userId, requestId, message, token) {
        this.userService.getUserById(userId)
          .subscribe(
            (data) => {
                  this.userService.getDeviceById(data.email, token)
                    .subscribe(
                    (data1)=>{
                        let userDevice = data1;

                        let pushData = {
                                "app_id": "ae60cbd3-3a45-469c-b6c7-bcb6104c31b4",
                                "include_player_ids": [userDevice['device_token']],
                                "contents": {'en': message},
                                "data": {
                                    "type": "request",
                                    "typeKey": requestId
                                }
                            };

                        console.log("push Data", pushData);
                        this.http.post(this.PUSH_CREATE_URL, pushData, this.authOpt).map(res => res.json()).subscribe(
                            data => {
                                console.log('Notification sent successfully!');
                            },
                            err => {
                                console.log('Notification sending error!');
                            },
                            () => console.log('Create Notification')
                        );
                        // let pushData = {
                        //     "tokens": [userDevice['device_token']],
                        //     "profile": "prod",
                        //     "notification": {
                        //         "message": message,
                        //         "payload": {
                        //             "type": "request",
                        //             "typeKey": requestId
                        //         }
                        //     }
                        // };

                        // this.http.post(this.PUSH_CREATE_URL, pushData, this.authOpt).map(res => res.json()).subscribe(
                        //     data => {
                        //         console.log('Notification sent successfully!');
                        //     },
                        //     err => {
                        //         console.log('Notification sending error!');
                        //     },
                        //     () => console.log('Create Notification')
                        // );
                    },
                    (data1)=>{

                    });
            },
            (data) => {
              
            });
    }


    public getNotifiactionList() {
        return new Promise((resolve, reject) => {
            this.http.get(this.PUSH_CREATE_URL, this.authOpt).map(res => res.json()).subscribe(
                data => {
                    //console.log(data);
                    resolve(data);
                },
                err => {
                    reject(false);
                },
                () => console.log('Get Notification List')
            );
        });
    }
}
