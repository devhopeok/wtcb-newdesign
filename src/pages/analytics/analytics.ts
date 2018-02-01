import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
// import { MaintenanceTrackerPage } from '../maintenance-tracker/maintenance-tracker';

@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html'
})
export class AnalyticsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  token: any;
  authUser: any;
  closedSteps: any;
  stars: any;

  five_stars = [];
  four_stars = [];
  three_stars = [];
  two_stars = [];
  one_star = [];
  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public userService: UserService,
  	public loadingCtrl: LoadingController,
  	public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Open Tickets", "Closed Tickets", "Rejected Tickets", "Payed Tickets"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                        
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384"
                        
                    ]
                }]
            }
 
        });
  }

  ionViewWillEnter(){
    this.storage.get('userdata').then(val=>{
      console.log("userdata", val);
      if (val != null){
        this.authUser = val.user;
        this.token = val.token;
        this.closedSteps = [];

        this.getSteps();
      }
    });
  }

  getSteps(){
    let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getSteps(this.token)
          .subscribe(
            (data) => {
              loading.dismiss();
              this.stars = [];
              for (let i=0; i<data.length; i++){
                if (data[i].status5 == 1){
                  this.closedSteps.push(data[i]);
                }
              }
              
              let xxx = this.groupBy(this.closedSteps, 'email');
              for (let key in xxx){
                console.log("key", key);
                let ave = 0;
                for (let j=0; j< xxx[key].length; j++){
                  ave += xxx[key][j].star / xxx[key].length;
                }
                this.stars.push({email: key, star: ave});
              }

              this.getStarReview();
              console.log("closed request steps", this.stars);
            },
            (data) => {
              loading.dismiss();
              
            });
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getStarReview(){
    
    this.five_stars = [];
    this.four_stars = [];
    this.three_stars = [];
    this.two_stars = [];
    this.one_star = [];
    console.log(this.stars.length, "this.stars.length");
     for (let i=0; i< this.stars.length; i++){
       let loading = this.loadingCtrl.create();
        loading.present();

        this.userService.getUserByEmail(this.stars[i].email).subscribe(
          (data)=>{
              loading.dismiss();
              
              this.userService.getOfficesById(data.officeKey, this.token).subscribe(
                (data1)=>{
                    
                    if (this.stars[i].star >= 4.5){
                      this.five_stars.push(data1[0].name);
                    }
                    else if (this.stars[i].star >= 3.5){
                      this.four_stars.push(data1[0].name);
                    }
                    else if (this.stars[i].star >= 2.5){
                      this.three_stars.push(data1[0].name);
                    }
                    else if (this.stars[i].star > 1.5){
                      this.two_stars.push(data1[0].name);
                    }
                    else{
                      this.one_star.push(data1[0].name);
                    }
                },
                (data1)=>{
                    
                });
          },
          (data)=>{
              loading.dismiss();
          });
     }
  }
}
