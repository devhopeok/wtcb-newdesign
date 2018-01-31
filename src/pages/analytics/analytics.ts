import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
// import { MaintenanceTrackerPage } from '../maintenance-tracker/maintenance-tracker';

@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html'
})
export class AnalyticsPage {
  
  token: any;
  authUser: any;
  closedSteps: any;
  stars: any;
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
        this.closedSteps = [];

        this.getSteps();
      }
    });
  }

  getSteps(){
    let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getSteps(this.token)
          .subscribe(
            (data) => {
              loading.dismiss();
              this.stars = [];
              for (let i=0; i<data.length; i++){
                if (data[i].status5 == 1){
                  this.closedSteps.push(data[i]);
                }
              }
              
              let xxx = this.groupBy(this.closedSteps, 'email');
              for (let key in xxx){
                console.log("key", key);
                let ave = 0;
                for (let j=0; j< xxx[key].length; j++){
                  ave += xxx[key][j].star / xxx[key].length;
                }
                this.stars.push({email: key, star: ave});

                this.getStarReview();
              }
              console.log("closed request steps", this.stars);
            },
            (data) => {
              loading.dismiss();
              
            });
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getStarReview(){
    let count=0;
     for (let i=0; i< this.stars.length; i++){
       let loading = this.loadingCtrl.create();
        loading.present();

        this.userService.getUserByEmail(this.stars[i].email).subscribe(
          (data)=>{
              loading.dismiss();
              
              this.userService.getOfficesById(data.officeKey, this.token).subscribe(
                (data1)=>{
                    console.log(this.stars[i].email, data1[0].name, this.stars[i].star);
                },
                (data1)=>{
                    
                });
          },
          (data)=>{
              loading.dismiss();
          });
     }
  }
}
