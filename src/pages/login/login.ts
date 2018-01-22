import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { MaintenanceViewPage } from '../maintenance-view/maintenance-view';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	user = {
	    email: '',
	    password: ''
	};

  device_token = "1";
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public userService: UserService, public storage: Storage, public events: Events, public oneSignal: OneSignal) {

  }

  ionViewWillEnter(){

    this.storage.get('userdata').then(val=>{
      this.events.publish("user:changed");
      console.log("userdata", val);
      if (val != null){
        if (val.user.level == 7 || val.user.level == 8){
          this.navCtrl.setRoot(HomePage);
        }
        else{
          this.navCtrl.setRoot(MaintenanceViewPage);
        }
      }
    });

    this.storage.get('device_token').then(val=>{
      console.log("device_token", val);
      if (val != null){
        this.device_token = val;
      }
    });
  }

  doLogin(){
    if (this.user.email == "" || this.user.password==""){
       let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Ingrese email y contraseńa',
          buttons: ['OK']
        });
        alert.present();
    }
    else{
      let loading = this.loadingCtrl.create();
      loading.present();
      this.user.email = this.user.email.toLowerCase();
      this.userService.login(this.user)
        .subscribe(
          (data) => {
            loading.dismiss();
            console.log("login Data:", data);
             if(data.message == 'user logged in!'){
              this.storage.set('userdata', data);
              let count = 0;
              this.userService.getNotifications(data.token)
              .subscribe(
                (data2) => {
                  for (let i=0; i<data2.length; i++){
                    if (data2[i].read == false){
                      count++;
                    }
                  }
                  console.log("notification_login_count", count);
                  this.storage.set("notification_count", count);
                  let params = {
                    token : data.token,
                    device_token: this.device_token
                  };

                  this.userService.insertDeviceToken(params)
                    .subscribe(
                      (data1)=>{
                        console.log("data1-success", data1);
                        if (data.user.level == 7 || data.user.level == 8){
                          this.navCtrl.setRoot(HomePage);
                        }
                        else{
                          this.navCtrl.setRoot(MaintenanceViewPage);
                        }
                        this.events.publish("user:changed");
                      },
                      (data1)=>{
                        console.log("data1-failure", data1);
                        if (data.user.level == 7 || data.user.level == 8){
                          this.navCtrl.setRoot(HomePage);
                        }
                        else{
                          this.navCtrl.setRoot(MaintenanceViewPage);
                        }
                        this.events.publish("user:changed");
                      });
                    },
                    (data2) => {
                     
                    });


              
              if (data.user.level == 7 || data.user.level == 8){
                this.navCtrl.setRoot(HomePage);
              }
              else{
                this.navCtrl.setRoot(MaintenanceViewPage);
              }
            } else{
              let alert = this.alertCtrl.create({
                title: "Error", subTitle: "Credencial Invalida", buttons: ['OK']
              });
              alert.present();
            }
          },
          (data) => {
            loading.dismiss();
            console.log("LoginError", data);
            let alert = this.alertCtrl.create({
              title: "Error", subTitle: "Login Error", buttons: ['OK']
            });
            alert.present();
          });
    }
  }

  signUp() {
      this.navCtrl.push(SignupPage);
  }
}
