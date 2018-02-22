import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BuildingProvider} from '../../providers/building';
import { UserService } from '../../providers/user-service';
import { MaintenanceViewPage } from '../maintenance-view/maintenance-view';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  buildings: any;
  floors: any;
  office: any;

  token: any;
  loading: any;
  create_or_update = 0;
  edit_or_save = 0;
  officeKey:any;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public buildingService: BuildingProvider, public loadingCtrl: LoadingController, public userService: UserService,
    public alertCtrl: AlertController) {
    this.init();
  }

  ionViewWillEnter() {
      this.storage.get('userdata').then(val=>{
        console.log("userdata", val);
        this.token = val.token;
        this.office.token = this.token;
        this.officeKey = val.user.officeKey;
        this.user = val.user;
        this.getOffice();

      });
  }

  init() {
        this.buildings = this.buildingService.list();
        this.floors = this.buildings[0].floors;
        console.log("office_token", this.token);
        this.office = {
            token: this.token,
            name: '',
            buildingId: 1,
            floorId: 1,
            company: '',
            area: '',
            garages: '',
            coPay: '',
            is_rented: false,
            employees: {}
        };

        
    }

  getOffice(){
    this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.userService.getOfficeByEmail(this.token)
        .subscribe(
          (data) => {
            this.loading.dismiss();
            console.log("office Data:", data);
            this.office = data;
            this.office.token=this.token;
            this.create_or_update = 1;
          },
          (data) => {
            console.log("office data: failure", data);
            this.loading.dismiss();
            this.create_or_update = 0;
          });
  }
  
  public updateFloors() {
      for (let i = 0; i < this.buildings.length; i ++) {
          if (this.buildings[i].id == this.office.buildingId) {
              this.floors = this.buildings[i].floors;
              break;
          }
      }
  }
  
  public createOffice() {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      console.log("param", this.office);

      if (this.create_or_update == 0){
        this.userService.createOffice(this.office)
        .subscribe(
          (data) => {
            this.loading.dismiss();
            console.log("office Data:", data);
            if(data.message == 'Success'){
                let alert = this.alertCtrl.create({
                    title: "Success", subTitle: "Office has been created successfully.", 
                    buttons: [
                      { 
                        text: 'OK',
                        handler: ()=>{
                          this.officeKey = data.office_id;
                          this.updateUser();
                          
                        }
                      }
                    ]
                });
                alert.present();
            }
          },
          (data) => {
            this.loading.dismiss();
          });
      }
      else if(this.edit_or_save == 1){
        this.userService.updateOffice(this.office)
        .subscribe(
          (data) => {
            this.loading.dismiss();
            console.log("office Data:", data);
            if(data == 'Success'){
                let alert = this.alertCtrl.create({
                    title: "¡Genial!", subTitle: "El perfil ha sido creado.", 
                    buttons: [
                      { 
                        text: 'OK',
                        handler: ()=>{
                          this.officeKey = this.office._id;
                          this.updateUser();
                        }
                      }
                    ]
                });
                alert.present();
            }
          },
          (data) => {
            this.loading.dismiss();
          });
      }
      
  }

  onEdit(){
    this.edit_or_save = 1;
    console.log("this.edit_or_save", this.edit_or_save);
  }

  updateUser(){

    let params = {
      token: this.token,
      officeKey: this.officeKey,
      _id: this.user._id
    }

    console.log("update user", params);
    this.userService.updateUser(params)
        .subscribe(
          (data) => {
              console.log("result update user", data);
              this.storage.get('userdata').then(val=>{
                val.user.officeKey = data.officeKey;
                this.storage.set('userdata', val);

              });
              this.navCtrl.setRoot(MaintenanceViewPage);
            }
           ,
          (data) => {
             this.navCtrl.setRoot(MaintenanceViewPage);
          });
  }
}
