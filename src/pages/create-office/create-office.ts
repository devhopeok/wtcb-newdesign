import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {BuildingProvider} from '../../providers/building';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-create-office',
    templateUrl: 'create-office.html',
})
export class CreateOfficePage {

    buildings: any;
    floors: any;
    office: any;
    //loading: Loading;
    //offices: FirebaseListObservable<any>;
    owner: any;
    renter: any;
    phoneMask: any;
    isConnected: any;
    token: any;
    loading:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
        public buildingService: BuildingProvider, public userService: UserService, public storage: Storage,
        public alertCtrl: AlertController) {
        //this.offices = this.db.list('/offices', {preserveSnapshot: true});
        this.phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.isConnected = true;
        this.init();
    }

    ionViewWillEnter() {
        this.storage.get('userdata').then(val=>{
          console.log("userdata", val);
          this.token = val.token;
          this.office.token = this.token;
        });
    }

    ionViewDidLoad() {

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
        this.owner = {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            level: 3.1, // Office Renter (Owner)
            password: this.makePassword(),
            blood_type: '',
            officeKey: ''
        };
        this.renter = {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            level: 3.2, // Office Renter (Owner)
            password: this.makePassword(),
            blood_type: '',
            officeKey: ''
        }
    }

    private makePassword() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
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
                this.owner.officeKey = data.office_id;
                this.renter.officeKey = data.office_id;
                this.userService.signUp(this.owner)
                .subscribe(
                  (data) => {
                    this.userService.signUp(this.renter)
                        .subscribe(
                          (data1) => {
                            this.navCtrl.pop();
                          },
                          (data1) => {
                            
                          });
                  },
                  (data) => {
                    
                  });
                
            }
          },
          (data) => {
            this.loading.dismiss();
          });
    }
}
