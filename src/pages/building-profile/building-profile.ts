import {Component} from '@angular/core';
import {NavController, NavParams, ItemSliding} from 'ionic-angular';
import {BuildingProvider} from '../../providers/building';
import {LoadingController, Loading} from 'ionic-angular';

import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { CreateOfficePage } from '../create-office/create-office';
/**
 * Generated class for the BuildingProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-building-profile',
    templateUrl: 'building-profile.html',
})
export class BuildingProfilePage {

    building: any;
    buildingId: any;
    offices: any;
    loading: Loading;
    floorId: any;
    floor: any;
    token: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, private buildingService: BuildingProvider, 
        private loadingCtrl: LoadingController, public storage: Storage, public userService: UserService) {
        this.buildingId = navParams.get('buildingId');
        this.floorId = navParams.get('floorId');
        let buildings = this.buildingService.list();
        this.building = {
            name: ''
        };
        this.floor = {
            name: ''
        };
        for (let i = 0; i < buildings.length; i ++) {
            if (buildings[i].id == this.buildingId) {
                this.building = buildings[i];
                break;
            }
        }
        if (this.floorId) {
            for (let i = 0; i < this.building.floors.length; i ++) {
                if (this.building.floors[i].id == this.floorId) {
                    this.floor = this.building.floors[i];
                    break;
                }
            }
        }
        this.offices = [];
    }

    ionViewDidEnter() {
        this.storage.get('userdata').then(val=>{
          console.log("userdata", val);
          this.token = val.token;
          let loading = this.loadingCtrl.create();
          loading.present();
          this.userService.getOffices(this.buildingId, this.token)
            .subscribe(
              (data) => {
                loading.dismiss();
                console.log("Getting Offices:", data);

                this.offices = data;
              },
              (data) => {
                loading.dismiss();
              });
        });
    }

    ionViewDidLoad() {
//        //console.log('ionViewDidLoad BuildingProfilePage');
    }

    public viewOffice(office) {
        
    }

    public editOffice(office) {
        // slidingItem.close();
        // this.navCtrl.push('EditOfficePage', {officeId: office.$id});
        this.navCtrl.push(CreateOfficePage, {office: office});
    }
}
