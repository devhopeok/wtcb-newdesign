import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

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
    public userService: UserService, public storage: Storage) {

  }

  ionViewWillEnter(){

    this.storage.get('userdata').then(val=>{
      console.log("userdata", val);
      if (val != null){
        this.navCtrl.setRoot(HomePage);
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
          subTitle: 'Fill user email and password',
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
              let params = {
                token : data.token,
                device_token: this.device_token
              };

              this.userService.insertDeviceToken(params)
                .subscribe(
                  (data1)=>{
                    this.navCtrl.setRoot(HomePage);
                  },
                  (data1)=>{
                    this.navCtrl.setRoot(HomePage);
                  });
              this.navCtrl.setRoot(HomePage);
            } else{
              let alert = this.alertCtrl.create({
                title: "Error", subTitle: "Invalid Credential", buttons: ['OK']
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
