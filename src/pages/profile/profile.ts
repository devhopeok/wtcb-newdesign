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
  user = {
    _id: '',
    level: 1,
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    job_speciality: '',
    officeKey: '',
    company: ''
  };

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

        if (this.user.level == 3){
            this.getOffice();
        }
        else{
          console.log(this.user, "Technician info");
          let loading = this.loadingCtrl.create();

          if (this.user.officeKey){
            loading.present();
            this.userService.getOfficesById(this.user.officeKey, this.token)
              .subscribe(
                (data) => {
                  loading.dismiss();
                  this.office = data[0];

                    let buildings = this.buildingService.list();
                    for (let i = 0; i < buildings.length; i ++) {
                        if (buildings[i].id == this.office.buildingId) {
                            this.office.buildingName = buildings[i].name;

                            for (let j = 0; j < buildings[i].floors.length; j ++) {
                                if (this.office.floorId == buildings[i].floors[j].id) {
                                    this.office.floorName = buildings[i].floors[j].name;
                                }
                            }
                        }
                    }
                },
                (data) => {
                  loading.dismiss();
                  
                });
          }
          
          this.create_or_update = 1;
        }

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
            client_email: '',
            direction: '',
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

    if (this.user.level == 3){
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
                    title: "¡Genial!", subTitle: "La información ha sido guardada.", 
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
                    title: "Éxito", subTitle: "¡Genial! El perfil ha sido creado con éxito.", 
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
    else{
      this.updateTechnician();
    }
  }

  onEdit(){
    this.edit_or_save = 1;
    console.log("this.edit_or_save", this.edit_or_save);
  }

  updateTechnician(){
    let params = {
      token: this.token,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      phone_number: this.user.phone_number,
      job_speciality: this.user.job_speciality,
      company: this.user.company,
      _id: this.user._id
    }

    console.log("update user", params);
    this.userService.updateUser(params)
        .subscribe(
          (data) => {
              console.log("result update user", data);
              this.storage.get('userdata').then(val=>{
                val.user = data.user;
                this.storage.set('userdata', val);

              });
              this.navCtrl.setRoot(MaintenanceViewPage);
            }
           ,
          (data) => {
             this.navCtrl.setRoot(MaintenanceViewPage);
          });
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
