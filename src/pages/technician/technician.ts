import {Component} from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { TechnicianDetailPage } from '../technician-detail/technician-detail';
import { ItemSliding } from 'ionic-angular';
import { PushServiceProvider } from '../../providers/push-service';

@Component({
    selector: 'page-technician',
    templateUrl: 'technician.html',
})
export class TechnicianPage {

    technicians1: any;
    technicians2: any;
    authUser: any;
    token: any;
    request ={
        officeKey: '',
        _id: ''
    };
    constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
        public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
        public pushService: PushServiceProvider) {
       this.request = this.navParams.get('request');
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

    edit(item, slidingItem){
        slidingItem.close();
        this.navCtrl.push(TechnicianDetailPage, {tech_data: item});
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

    selectTech(item){
      if (this.request){
          let alert = this.alertCtrl.create({
            title: "", subTitle: "¿Seguro que quieres compartir el ticket con este técnico?", 
            buttons: [
              { 
                text: 'OK',
                handler: ()=>{
                  this.selectTech1(item);
                }
              },
              {
                text: 'Cancel',
                handler: ()=>{
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
      }
      
    }

    selectTech1(item){
        
        if (this.request){
            let params = {
              token: this.token,
              officeKey: this.request.officeKey,
              _id: item._id
            }

            let loading = this.loadingCtrl.create();
            loading.present();

            console.log("update user", params);
            this.userService.updateUser(params)
                .subscribe(
                  (data) => {
                      console.log("result update user", data);
                      loading.dismiss();
                      let alert = this.alertCtrl.create({
                        title: "Éxito", subTitle: "El ticket ha sido asignado a este técnico con éxito", 
                        buttons: [
                          { 
                            text: 'OK',
                            handler: ()=>{
                                this.pushService.notiUserForRequest(item._id, this.request._id, "El administrador del edificio le asignó el boleto.", this.token);
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
}
