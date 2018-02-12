import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BuildingProvider} from '../../providers/building';
import { UserService } from '../../providers/user-service';

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
          },
          (data) => {
            this.loading.dismiss();
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
      this.userService.createOffice(this.office)
      .subscribe(
        (data) => {
          this.loading.dismiss();
          console.log("office Data:", data);
          if(data.message == 'Success'){
              let alert = this.alertCtrl.create({
                  title: "Success", subTitle: "Office has been created successfully.", buttons: ['OK']
              });
              alert.present();
          }
        },
        (data) => {
          this.loading.dismiss();
        });
  }
}
