import {Component} from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { PushServiceProvider } from '../../providers/push-service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {BuildingProvider} from '../../providers/building';
import * as AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";


/**
 * Generated class for the OtrsRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-otrs-request',
    templateUrl: 'otrs-request.html',
})
export class OtrsRequestPage {
    token: any;
    office = {company : '', name: '', buildingId: '', floorId: ''};
    officeKey: any;
    userKey: any;
    requests: any;
    steps: any;
    otrsRequest = {
            _id: '',
            comment: '',
            is_urgent: true,
            photos: [],
            step: 1,
            created_at: new Date(),
            userKey: '',
            officeKey: '',
            officeName: '',
            buildingName: '',
            floorName: '',
            token:''
        };

    filename: any;
    myfile:any;
    file:any;
    create_or_update: boolean = false;

    building_name: any;
    floor_name: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,  private loadingCtrl: LoadingController, 
        public actionSheetCtrl: ActionSheetController, public userService: UserService, public storage: Storage, 
        public camera: Camera, public alertCtrl: AlertController, public pushService: PushServiceProvider,
        public buildingService: BuildingProvider) {
        if (this.navParams.get('requestItem')){
          this.otrsRequest = this.navParams.get('requestItem');
          this.create_or_update = true;
        }
    }

    ionViewWillEnter(){
        this.storage.get('userdata').then(val=>{
          console.log("userdata", val);
          if (val != null){
            this.token = val.token;
            this.officeKey = val.user.officeKey;
            this.userKey = val.user._id;

            if (this.officeKey == null){
              this.officeKey = this.otrsRequest.officeKey;
            }

            let loading = this.loadingCtrl.create();
            loading.present();
            this.userService.getOfficesById(this.officeKey, this.token)
            .subscribe(
              (data) => {
                loading.dismiss();
                console.log("Getting Offices:", data);

                this.office = data[0];

                let buildingId = this.office.buildingId;
                let floorId = this.office.floorId;
                let buildings = this.buildingService.list();
                let building = {
                    name: '',
                    floors: []
                };
                let floor = {
                    name: ''
                };
                for (let i = 0; i < buildings.length; i ++) {
                    if (buildings[i].id.toString() == buildingId) {
                        building = buildings[i];
                        break;
                    }
                }
                if (floorId) {
                    for (let j = 0; j < building.floors.length; j ++) {
                        if (building.floors[j].id.toString() == floorId) {
                            floor = building.floors[j];
                            console.log("floor", floor);
                            break;
                        }
                    }
                }

                this.building_name = building.name;
                this.floor_name = floor.name;
              },
              (data) => {
                loading.dismiss();
              });
          }
        });
      }
    ionViewDidLoad() {
        //console.log('ionViewDidLoad OtrsRequestPage');
    }

    ionViewDidEnter() {
      
    }

    fileEvent(event){
      var files = event.target.files;
      var file = files[0];
      this.file = file;
      this.filename = new Date().getTime() + this.file.name;
      console.log("this.file:" + JSON.stringify(this.filename));
      AWS.config.accessKeyId = 'AKIAJNHK7OBATDPIEJJA';
      AWS.config.secretAccessKey = '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';
      // AWS.config.accessKeyId = 'AKIAIPQAVOWPUIP2ENSA';
      // AWS.config.secretAccessKey = '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';
      var s3 = new S3({
            region: 'us-east-2',
            apiVersion: '2006-03-01',
            params: {Bucket: 'wtcb'}
        });

      // let bucket = new S3({params: {Bucket: 'YOUR-BUCKET-NAME'}});
      // let params = {BucketName: 'YOUR-BUCKET-NAME', Key: this.file.name, Body: this.file};

      var params = {Bucket: 'wtcb', Key: this.filename, Body: this.file, ContentType: this.file.type, ACL: 'public-read', ServerSideEncrytion: 'AES256'};
       console.log("params", params);
      let that = this;
      let loading = this.loadingCtrl.create();
      loading.present();
      s3.upload(params, function (err, data) {
          loading.dismiss();
          console.log("data: " + JSON.stringify(data) + "err: " + JSON.stringify(err));
          if (data){
            var image_url = 'https://s3-us-east-2.amazonaws.com/wtcb/' + that.filename;
            that.otrsRequest.photos.push(image_url);
          }
          
      });

  }

    addPhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Take Photo',
                    handler: () => {
                        const options: CameraOptions = {
                          quality: 100,
                          destinationType: this.camera.DestinationType.DATA_URL,
                          sourceType: this.camera.PictureSourceType.CAMERA,
                          encodingType: this.camera.EncodingType.JPEG,
                          mediaType: this.camera.MediaType.PICTURE
                        }

                        this.camera.getPicture(options).then((imageData) => {
                         // imageData is either a base64 encoded string or a file URI
                         // If it's base64:
                         let base64Image = 'data:image/jpeg;base64,' + imageData;
                         this.otrsRequest.photos.push(base64Image);
                        }, (err) => {
                         // Handle error
                        });
                    }
                },
                {
                    text: 'Choose Photo',
                    handler: () => {
                        const options: CameraOptions = {
                          quality: 100,
                          destinationType: this.camera.DestinationType.DATA_URL,
                          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                          encodingType: this.camera.EncodingType.JPEG,
                          mediaType: this.camera.MediaType.PICTURE
                        }

                        this.camera.getPicture(options).then((imageData) => {
                         // imageData is either a base64 encoded string or a file URI
                         // If it's base64:
                         let base64Image = 'data:image/jpeg;base64,' + imageData;
                         this.otrsRequest.photos.push(base64Image);
                        }, (err) => {
                         // Handle error
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler:() => {
                        //console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    createNewRequest() {
        
        this.otrsRequest.userKey = this.userKey;
        this.otrsRequest.officeKey = this.officeKey;
        this.otrsRequest.token = this.token;
        this.otrsRequest.officeName = this.office.name;
        this.otrsRequest.created_at = new Date();

        this.otrsRequest.buildingName = this.building_name;
        this.otrsRequest.floorName = this.floor_name;
        console.log("this.otrsRequest", this.otrsRequest);

        if (this.create_or_update == false){
            let loading = this.loadingCtrl.create();
            loading.present();
            this.userService.createRequest(this.otrsRequest)
            .subscribe(
              (data) => {
                loading.dismiss();
                console.log("requestdata", data);

                if (data.message == "Success"){
                    let requestKey = data.data._id;

                    console.log("keys", this.userKey, this.officeKey, requestKey);
                    this.pushService.notiBuildingManagerForRequest(requestKey, "Nueva solicitud fue creada!", this.token);
                    // this.pushService.notiBuildingManagerForRequest(requestKey, "New request is created!", this.token);

                    let newSteps = {
                        token: this.token,
                        request_id: requestKey,
                        step: 1,

                        quote: '',
                        updated_at1: '',
                        
                        technician_info: {
                            date: '',
                            time: '',
                            name: '',
                            company: '',
                            phone: ''
                        },
                        updated_at2: '',

                        invoice: '',
                        is_completed: false,
                        updated_at3: '',
                       
                        is_paid: false,
                        updated_at4: '',
                       
                        star: '',
                        comment: '',
                        updated_at5: this.otrsRequest.created_at
                    };

                    this.userService.createStep(newSteps)
                    .subscribe(
                      (data1) => {
                        
                        
                          let alert = this.alertCtrl.create({
                            title: "éxito", subTitle: "Su solicitud ha sido enviada exitosamente!", buttons: ['OK']
                          });
                          alert.present();
                          this.navCtrl.pop();
                      },
                      (data1) => {
                        
                      });
                }
                
              },
              (data) => {
                loading.dismiss();
               
              });
          }
          else if (this.create_or_update == true){
            let loading = this.loadingCtrl.create();
            loading.present();
            //console.log("qqqqqqqqqqqqqqq", this.otrRequest);
            this.userService.updateRequest(this.otrsRequest._id, this.otrsRequest)
            .subscribe(
              (data) => {
                  loading.dismiss();
                  let alert = this.alertCtrl.create({
                    title: "Success", subTitle: "Request is updated successfully!", buttons: ['OK']
                  });
                  alert.present();
                  this.navCtrl.pop();
              },
              (data) => {
                loading.dismiss();
              });
          }
        
    }

}
