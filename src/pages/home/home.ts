import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import {BuildingProvider} from '../../providers/building';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { BuildingListPage } from '../building-list/building-list';
import { MaintenanceViewPage } from '../maintenance-view/maintenance-view';
import { NotificationPage } from '../notification/notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	offices: any;
    buildings: any;
    authUser: any;
    token: any;
    count=0;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public userService:UserService, 
    	public buildingService: BuildingProvider, public storage: Storage, public events: Events) {
    	this.offices = [];
        this.buildings = this.buildingService.list();

        this.authUser = {
            level: 4
        };
  	}

  	ionViewWillEnter() {
       
        this.storage.get('userdata').then(val=>{
          console.log("userdata", val);
          this.token = val.token;
          this.authUser = val.user;
          let loading = this.loadingCtrl.create();
          loading.present();
          this.userService.getAllOffices(this.token)
            .subscribe(
              (data) => {
                loading.dismiss();
                console.log("Getting All Offices:", data);

                this.offices = data;
                
              },
              (data) => {
                loading.dismiss();
              });
        });

        this.storage.get('notification_count').then(val=>{
          this.count = val;
          });

        this.events.subscribe("noti1:changed", ()=>{

         this.storage.get('notification_count').then(val=>{
          this.count = val;
          console.log("noti1:changed", val, this.count);
          });
       });
    }

    rentedOffices(buildingId) {
        let count = 0;
        for (let i = 0; i < this.offices.length; i ++) {
            if (this.offices[i]['buildingId'] == buildingId && this.offices[i]['is_rented']) {
                count ++;
            }
        }
        return count;
    }
    
    vacantOffices(buildingId) {
        let count = 0;
        for (let i = 0; i < this.offices.length; i ++) {
            if (this.offices[i]['buildingId'] == buildingId && !this.offices[i]['is_rented']) {
                count ++;
            }
        }
        return count;
    }

    occupancyOffices(buildingId) {
        let count = 0;
        let officeCount = 0;
        for (let i = 0; i < this.offices.length; i ++) {
            if (this.offices[i]['buildingId'] == buildingId) {
                officeCount ++;
                if (this.offices[i]['is_rented']) count ++;
            }
        }
        return count / officeCount * 100;
    }

    public viewBuildingList() {
        this.navCtrl.setRoot(BuildingListPage);
    }

    gotoMaintenance(){
      this.navCtrl.setRoot(MaintenanceViewPage);
    }

    gotoNotification(){
      this.navCtrl.setRoot(NotificationPage);
    }

    viewFloorOfffice(floorId, buildingId){
      
    }
}
