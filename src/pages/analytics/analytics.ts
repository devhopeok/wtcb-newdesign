import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { MaintenanceTrackerPage } from '../maintenance-tracker/maintenance-tracker';

@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html'
})
export class AnalyticsPage {
  
  token: any;
  authUser: any;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public userService: UserService,
  	public loadingCtrl: LoadingController,
  	public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    this.storage.get('userdata').then(val=>{
      console.log("userdata", val);
      if (val != null){
        this.authUser = val.user;
        this.token = val.token;

        let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getSteps(this.token)
          .subscribe(
            (data) => {
              loading.dismiss();
              console.log("steps", data);
            },
            (data) => {
              loading.dismiss();
              
            });
      }
    });
  }
}
