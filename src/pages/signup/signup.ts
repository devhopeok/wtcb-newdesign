import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { MaintenanceViewPage } from '../maintenance-view/maintenance-view';
import { HomePage } from '../home/home';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignUp page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user:any;
  device_token = "1"; // Device token for push notification. It is set 1 as initial value.
  
  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public loadingCtrl: LoadingController,
    public userService: UserService, public storage: Storage, public events: Events) {
      this.user = {
        username: 'aaa',
        email: '',
        password: '',
        level: 3
      };
  }

  /**
   * To get the device token stored in local storage.
   */
  ionViewWillEnter(){
    this.storage.get('device_token').then(val=>{
      if (val != null){
        this.device_token = val;
      }
    });
  }

  /**
   * Sign Up function
   */
  doSignUp(){
    if (this.user.email == '' || this.user.password == ''){ //If any of input fields is blank, return warning.
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Please fill in the blanks.',
        buttons: ['OK']
      });
      alert.present();
    }
    else{ // If all of input fields has been filled.
      // Show the loading icon while processing the sign up.
      let loading = this.loadingCtrl.create();
      loading.present();

      // Ignore all of Uppercase and make it to lowercase.
      this.user.email = this.user.email.toLowerCase();

      // Call the sign up api
      this.userService.signUp(this.user)
      .subscribe(
        (data) => {
          // Remove the loading icon after api call has been completed.
          loading.dismiss();

          // Process based on the response of api call.
          if(data.message == 'user created!'){ // If success
            this.storage.set('userdata', data);

            // Insert the device token to the database throught api call.
            let params = {
              token : data.token,
              device_token: this.device_token
            };

            this.userService.insertDeviceToken(params)
            .subscribe(
              (data1)=>{
                if (data.user.level == 7 || data.user.level == 8){ // If the user is admin, please go to the home page.
                  this.navCtrl.setRoot(HomePage);
                }
                else{                                              // If not, please go to the maintenance view page.
                  this.navCtrl.setRoot(MaintenanceViewPage);
                }
                this.events.publish("user:changed");
              },
              (data1)=>{
                if (data.uesr.level == 7 || data.uesr.level == 8){ // If the user is admin, please go to the home page.
                  this.navCtrl.setRoot(HomePage);
                }
                else{                                              // If not, please go to the maintenance view page.
                  this.navCtrl.setRoot(MaintenanceViewPage);
                }
                this.events.publish("user:changed");
              });
          } else{ // If user hasn't been created
            let alert = this.alertCtrl.create({
              title: "Error", subTitle: "Signup Error", buttons: ['OK']
            });
            alert.present();
            this.navCtrl.pop();
          }
        },
        (data) => { // Signup api call failed
          loading.dismiss();
          
          if (data.status == 403){ // User already exists.
            let alert = this.alertCtrl.create({
              title: "Error", subTitle: "User already exists.", buttons: ['OK']
            });
            alert.present();
          }
          else{                    // Internal Server Error.
            let alert = this.alertCtrl.create({
              title: "Error", subTitle: "Server Error", buttons: ['OK']
            });
            alert.present();
          }
          this.navCtrl.pop();
        });
    }
  }
}
