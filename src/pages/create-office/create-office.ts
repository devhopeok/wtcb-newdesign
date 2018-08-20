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
    office: any = {
        _id: '',
        token: '',
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
        employees: {
            employee:{
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                level: 3.1, // Office Renter (Owner)
                password: '',
                blood_type: '',
                officeKey: ''
            },
            outsourcing : {
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                level: 3.2, // Office Renter (Owner)
                password: '',
                blood_type: '',
                officeKey: ''
            }
        }
    };
    //loading: Loading;
    //offices: FirebaseListObservable<any>;
    employee: any;
    outsourcing: any;
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
          this.token = val.token;
          this.office.token = this.token;
        });
    }

    ionViewDidLoad() {

    }

    init() {
        this.buildings = this.buildingService.list();
        this.floors = this.buildings[0].floors;

        this.office.token = this.token;
        let nav_office = this.navParams.get('office');
        if (nav_office){
            this.office._id = nav_office._id;
            this.office.name = nav_office.name;
            this.office.buildingId = nav_office.buildingId;
            this.office.company = nav_office.company;
            this.office.floorId = nav_office.floorId;
            this.office.area = nav_office.area;
            this.office.garages = nav_office.garages;
            this.office.coPay = nav_office.coPay;
            this.office.client_email = nav_office.client_email;
            this.office.direction = nav_office.direction;
            this.office.is_rented = nav_office.is_rented;

            if (nav_office.employees){
                if (nav_office.employees.employee){
                    this.office.employees.employee = nav_office.employees.employee;
                }

                if (nav_office.employees.outsourcing){
                    this.office.employees.outsourcing = nav_office.employees.outsourcing;
                }
            }
            
        }
        
    }

    // private makePassword() {
    //     let text = "";
    //     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //     for (let i = 0; i < 5; i++)
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));

    //     return text;
    // }

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
        this.userService.updateOffice(this.office)
        .subscribe(
          (data) => {
            this.loading.dismiss();
            if(data == 'Success'){
                let alert = this.alertCtrl.create({
                    title: "!Genial!", 
                    subTitle: "La información ha sido guardada.", 
                    buttons: [{
                        text: 'OK',
                        handler: () => {
                          this.navCtrl.pop();
                        }
                    }]
                    
                });
                alert.present();
                this.office.employees.employee.officeKey = this.office._id;
                this.office.employees.outsourcing.officeKey = this.office._id;

                this.userService.signUp(this.office.employees.employee)
                .subscribe(
                  (data) => {
                    
                  },
                  (data) => {
                    
                  });
                this.userService.signUp(this.office.employees.outsourcing)
                    .subscribe(
                      (data1) => {
                        // this.navCtrl.pop();
                      },
                      (data1) => {
                        
                      });
            }
          },
          (data) => {
            this.loading.dismiss();
          });
    }
}
