import {Component} from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-technician-detail',
    templateUrl: 'technician-detail.html',
})
export class TechnicianDetailPage {

    authUser: any;
    token: any;
    technician: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
        public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
       this.technician = this.navParams.get('tech_data');
       console.log("this.technician", this.technician);
    }

    ionViewDidLoad() {

    }

    ionViewWillEnter(){
        this.storage.get('userdata').then(val=>{
          if (val != null){
            this.authUser = val.user;
            this.token = val.token;
          }
        });
    }

    update(){
        let params = {
          token: this.token,
          first_name: this.technician.first_name,
          last_name: this.technician.last_name,
          phone_number: this.technician.phone_number,
          blood_type: this.technician.blood_type,
          company: this.technician.company,
          _id: this.technician._id
        }

        let loading = this.loadingCtrl.create();
        loading.present();

        this.userService.updateUser(params)
            .subscribe(
              (data) => {
                  console.log("result update user", data);
                  loading.dismiss();
                  let alert = this.alertCtrl.create({
                    title: "Éxito", subTitle: "¡Genial! El perfil se ha guardado con éxito.", 
                    buttons: [
                      { 
                        text: 'OK',
                        handler: ()=>{
                         this.navCtrl.pop();
                        }
                      }
                    ]
                  });
                  alert.present();
                  
                }
               ,
              (data) => {
                 //this.navCtrl.setRoot(MaintenanceViewPage);
                 loading.dismiss();
              });
    }
}
