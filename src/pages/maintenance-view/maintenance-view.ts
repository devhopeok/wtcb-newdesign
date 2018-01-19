import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';
import { OtrsRequestPage } from '../otrs-request/otrs-request';
import { MaintenanceTrackerPage } from '../maintenance-tracker/maintenance-tracker';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';
import { NotificationPage } from '../notification/notification';

@Component({
  selector: 'page-maintenance-view',
  templateUrl: 'maintenance-view.html'
})
export class MaintenanceViewPage {

  user: any;
  userKey: any;
  officeKey: any;
  requests: any;
  openedRequests: any;
  closedRequests: any;
  token: any;
  count: any;
  constructor(public navCtrl: NavController, public storage: Storage, public userService: UserService, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public events: Events) {
      this.user = {
            level: 4
        };
      this.requests = [];
      this.openedRequests = [];
      this.closedRequests = [];

      // this.events.subscribe('user:signin', (requestKey) => {
      //     this.navCtrl.push('MaintenanceTrackerPage', {requestKey: requestKey});
      // });
  }

  ionViewWillEnter(){

    this.storage.get('userdata').then(val=>{
      
      if (val != null){
        this.user = val.user;
        this.userKey = val.user._id;
        this.officeKey = val.user.officeKey;
        this.token = val.token;

        if (this.user.level == "7") {
            this.loadRequestByUser();
        }else {
            this.loadRequestByOffice();
        }
        console.log("userdata", this.user);
      }
    });

    this.storage.get('notification_count').then(val=>{
      this.count = val;
    });

    this.events.subscribe("noti2:changed", ()=>{
      this.storage.get('notification_count').then(val=>{
        this.count = val;
      });
    });
  }

  gotoNotification(){
      this.navCtrl.setRoot(NotificationPage);
    }

  delete(item){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.deleteRequest(item._id, this.token)
      .subscribe(
          (data) => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: "", subTitle: "La solicitud fue elimina con éxito!", buttons: ['OK']
            });
            alert.present();
            if (this.user.level == "7") {
                this.loadRequestByUser();
            }else {
                this.loadRequestByOffice();
            }
          },
          (data) => {
            loading.dismiss();
            
          });
  }

  edit(item){
    this.navCtrl.push(OtrsRequestPage, {requestItem: item});
  }

  createNewRequest(){
      this.navCtrl.push(OtrsRequestPage);
  }

  loadRequestByOffice() {
        
        this.requests = [];
        this.openedRequests = [];
        this.closedRequests = [];

        let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getRequestsByOffice(this.officeKey, this.token)
          .subscribe(
            (data) => {
              loading.dismiss();
              for (let i=0; i<data.length; i++){
                if (data[i].step > 5) {
                  this.closedRequests.push(data[i]);
                }else {
                  this.openedRequests.push(data[i]);
                }
              }
              console.log("openedRequests:", this.officeKey, this.openedRequests)
            },
            (data) => {
              loading.dismiss();
              
            });
    }

    loadRequestByUser() {
        this.requests = [];
        this.openedRequests = [];
        this.closedRequests = [];

        let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getAllRequests(this.token)
          .subscribe(
            (data) => {
              loading.dismiss();
              for (let i=0; i<data.length; i++){
                if (data[i].step > 5) {
                  this.closedRequests.push(data[i]);
                }else {
                  this.openedRequests.push(data[i]);
                }
              }
            },
            (data) => {
              loading.dismiss();
              
            });
    }

    viewRequest(request) {
      //console.log("requestKey:", request._id);
      if (this.user.level == '7' && request.opened7 == false){
        let params = {
              token: this.token,
              opened7: true
          }
          this.userService.updateRequest(request._id, params)
          .subscribe(
            (data) => {
                //loading.dismiss();
              this.navCtrl.push(MaintenanceTrackerPage, {requestKey: request._id});
            },
            (data) => {
              //loading.dismiss();
            });
      }
      else if (request.opened3_1 == false && this.user.level == "3.1"){
          let params = {
              token: this.token,
              opened3_1: true
          }
          this.userService.updateRequest(request._id, params)
          .subscribe(
            (data) => {
                //loading.dismiss();
              this.navCtrl.push(MaintenanceTrackerPage, {requestKey: request._id});
            },
            (data) => {
              //loading.dismiss();
            });
      }
      else if (request.opened3_2 == false && this.user.level == "3.2"){
          let params = {
              token: this.token,
              opened3_2: true
          }
          this.userService.updateRequest(request._id, params)
          .subscribe(
            (data) => {
                //loading.dismiss();
              this.navCtrl.push(MaintenanceTrackerPage, {requestKey: request._id});
            },
            (data) => {
              //loading.dismiss();
            });
      }
      else{
        // this.firebaseAnalytics.logEvent('page_view', {page: "dashboard"})
        //   .then((res: any) => console.log("firebase analytics -success ", res))
        //   .catch((error: any) => console.error("firebase analytics - fail", error));
        this.navCtrl.push(MaintenanceTrackerPage, {requestKey: request._id});
      }
      
    }
}
