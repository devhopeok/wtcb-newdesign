import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { CreateOfficePage } from '../create-office/create-office';
import {BuildingProvider} from '../../providers/building';
import { BuildingProfilePage } from '../building-profile/building-profile';
@Component({
    selector: 'page-building-list',
    templateUrl: 'building-list.html',
})
export class BuildingListPage {

    buildings: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private buildingService: BuildingProvider) {
       this.buildings = this.buildingService.list();
    }

    ionViewDidLoad() {

    }


    public createOffice() {
        this.navCtrl.push(CreateOfficePage);
    }

    public viewBuilding(building) {
        this.navCtrl.push(BuildingProfilePage, {buildingId: building['id']});
    }
}
