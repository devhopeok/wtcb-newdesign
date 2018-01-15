import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MaintenanceViewPage } from '../maintenance-view/maintenance-view';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user = {
        username: '',
        email: '',
        password: '',
        level: 3
    };
  device_token = "1";
  
  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public loadingCtrl: LoadingController,
    public userService: UserService, public storage: Storage) {

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
                    this.navCtrl.setRoot(MaintenanceViewPage);
                  },
                  (data1)=>{
                    this.navCtrl.setRoot(MaintenanceViewPage);
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
