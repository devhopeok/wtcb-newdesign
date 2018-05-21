import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController, ItemSliding } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { MaintenanceTrackerPage } from '../maintenance-tracker/maintenance-tracker';
import { PushServiceProvider } from '../../providers/push-service';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  
  notifications = [];
  token: any;
  authUser: any;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public userService: UserService,
  	public loadingCtrl: LoadingController,
  	public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
    public pushService: PushServiceProvider) {

  }

  ionViewWillEnter(){
    this.storage.get('userdata').then(val=>{
      console.log("userdata", val);
      if (val != null){
        this.authUser = val.user;
        this.token = val.token;
        this.getNotifications(this.token);
      }
    });
  }

  getNotifications(token){
  	let loading = this.loadingCtrl.create();
    loading.present();
  	this.userService.getNotifications(token)
	  .subscribe(
	    (data) => {
	      loading.dismiss();
	      this.notifications = data;
	      console.log("notifications", data);
	    },
	    (data) => {
	      loading.dismiss();
	      
	    });
  }

  gotoMaintenanceView(notification){
    notification.read = true;
    let data = {
      token: this.token,
      read: true
    }
    console.log("update noti data", notification.requestId, data);
    this.userService.updateNotification(notification._id, data)
    .subscribe(
      (data) => {
        console.log("updated read data", data);
        this.events.publish("noti1:changed");
        this.events.publish("noti2:changed");
        this.events.publish("notification:changed");
        this.navCtrl.push(MaintenanceTrackerPage, {requestKey: notification.requestId});
      },
      (data) => {

      });
  }

  delete(id){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.deleteNotification(id, this.token)
    .subscribe(
      (data) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: "", subTitle: "La notificación ha sido eliminada con éxito.", buttons: ['OK']
        });
        alert.present();
        this.events.publish("noti1:changed");
        this.events.publish("noti2:changed");
        this.events.publish("notification:changed");
        this.getNotifications(this.token);
      },
      (data) => {
        loading.dismiss();
      });
  }

  accept(notification, slidingItem) {
    slidingItem.close();
    let alert = this.alertCtrl.create({
      title: "", subTitle: "You have accpeted the assignment of administrator.", buttons: ['OK']
    });
    alert.present();
    this.pushService.notiBuildingManagerForRequest(notification.requestId, this.authUser.first_name + " " + this.authUser.last_name + "(Technician) accepted your assignment.", this.token);
  }
}
