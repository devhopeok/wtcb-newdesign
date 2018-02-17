import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
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
        public storage: Storage) {
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

    ionViewDidLoad() {

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
}
