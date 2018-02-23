import {Component} from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-technician',
    templateUrl: 'technician.html',
})
export class TechnicianPage {

    technicians1: any;
    technicians2: any;
    authUser: any;
    token: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
        public storage: Storage, public loadingCtrl: LoadingController) {
       this.getTechnicians();
    }

    ionViewDidLoad() {

    }

    getTechnicians(){
        this.userService.getUsersByLevel("3.1")
          .subscribe(
            (data) => {
                console.log("technicians", data);
                this.technicians1 = data;
            },
            (data) => {
              
            });

        this.userService.getUsersByLevel("3.2")
          .subscribe(
            (data) => {
                console.log("technicians", data);
                this.technicians2 = data;
            },
            (data) => {
              
            });
    }

    ionViewWillEnter(){
        this.storage.get('userdata').then(val=>{
          console.log("userdata", val);
          if (val != null){
            this.authUser = val.user;
            this.token = val.token;
          }
        });
    }

    edit(item){
        console.log(item);
    }

    delete(item){
        let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.deleteUser(item._id)
          .subscribe(
            (data) => {
                loading.dismiss();
                this.getTechnicians();
            },
            (data) => {
                  loading.dismiss();
            });
    }
}
