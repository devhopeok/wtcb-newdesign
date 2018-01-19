import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

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
  	public storage: Storage) {

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
}
