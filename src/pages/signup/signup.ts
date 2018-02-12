import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { MaintenanceViewPage } from '../maintenance-view/maintenance-view';
import { HomePage } from '../home/home';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user:any;
  device_token = "1";
  
  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public loadingCtrl: LoadingController,
    public userService: UserService, public storage: Storage, public events: Events) {
      this.user = {
          username: 'aaa',
          email: '',
          password: '',
          level: 7
      };
  }

  ionViewWillEnter(){
    this.storage.get('device_token').then(val=>{
      console.log("device_token", val);
      if (val != null){
        this.device_token = val;
      }
    });
  }

  doSignUp(){
    if (this.user.email == '' || this.user.password == '' || this.user.email == ''){
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Please fill in the blanks.',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let loading = this.loadingCtrl.create();
      loading.present();
      this.user.email = this.user.email.toLowerCase();
      this.userService.signUp(this.user)
        .subscribe(
          (data) => {
            loading.dismiss();
            console.log("Signup Data:", data);

            if(data.message == 'user created!'){
              this.storage.set('userdata', data);

              let params = {
                token : data.token,
                device_token: this.device_token
              };

              this.userService.insertDeviceToken(params)
                .subscribe(
                  (data1)=>{
                    if (data.user.level == 7 || data.user.level == 8){
                      this.navCtrl.setRoot(HomePage);
                    }
                    else{
                      this.navCtrl.setRoot(MaintenanceViewPage);
                    }
                    this.events.publish("user:changed");
                  },
                  (data1)=>{
                    if (data.uesr.level == 7 || data.uesr.level == 8){
                      this.navCtrl.setRoot(HomePage);
                    }
                    else{
                      this.navCtrl.setRoot(MaintenanceViewPage);
                    }
                    this.events.publish("user:changed");
                  });
              //this.navCtrl.setRoot(HomePage);
            } else{
              let alert = this.alertCtrl.create({
                title: "Error", subTitle: "Signup Error", buttons: ['OK']
              });
              alert.present();
              this.navCtrl.pop();
            }
          },
          (data) => {
            loading.dismiss();
            console.log("SignupError");
            let alert = this.alertCtrl.create({
              title: "Error", subTitle: "Signup Error", buttons: ['OK']
            });
            alert.present();
            this.navCtrl.pop();
          });
    }
  }
}
