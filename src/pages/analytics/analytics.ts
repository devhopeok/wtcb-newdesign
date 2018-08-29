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
  openedSteps = [];
  closedSteps = [];
  rejectedSteps = [];
  paidSteps = [];
  starSteps = [];
  stars: any;

  five_stars = [];
  four_stars = [];
  three_stars = [];
  two_stars = [];
  one_star = [];

  star_flags: any = [false, false, false, false, false ]

  avg_time1 : any;
  avg_time2: any;
  avg_time3: any;
  avg_time4: any;
  avg_time5: any;
  avg_time6: any;

  update_time_array1 : any;
  update_time_array2: any;
  update_time_array3: any;
  update_time_array4: any;
  update_time_array5: any;
  update_time_array6: any;

  fromDate: any;
  toDate: any;

  renter_email = '';

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public userService: UserService,
  	public loadingCtrl: LoadingController,
  	public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController) {

      this.star_flags = [false, false, false, false, false ]
  
  }

  go(){
    this.getSteps();
  }

  ionViewDidLoad(){
    
  }

  ionViewWillEnter(){
    this.storage.get('userdata').then(val=>{
      if (val != null){
        this.authUser = val.user;
        this.token = val.token;
        

        this.getSteps();
      }
    });
  }

  onChange(event){
    this.renter_email = event;
  }

  getSteps(){
    this.closedSteps = [];
    this.openedSteps = [];
    this.starSteps = [];
    this.paidSteps = [];
    this.rejectedSteps = [];
    
    let from_date: any;
    let to_date: any;
    if (this.fromDate){
      from_date = new Date(this.fromDate);
    }
    else{
      from_date = new Date("2017-01-01");
    }

    if (this.toDate){
      to_date = new Date(this.toDate);
    }
    else{
      to_date = new Date("2100-01-01");
    }
    let loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getSteps(this.token)
          .subscribe(
            (data) => {
              loading.dismiss();
              this.stars = [];
              this.avg_time1 = 0;
              this.avg_time2 = 0;
              this.avg_time3 = 0;
              this.avg_time4 = 0;
              this.avg_time5 = 0;
              this.avg_time6 = 0;

              this.update_time_array1 = [];
              this.update_time_array2 = [];
              this.update_time_array3 = [];
              this.update_time_array4 = [];
              this.update_time_array5 = [];
              this.update_time_array6 = [];

              for (let i=0; i<data.length; i++){

                if (data[i].updated_at5 && (data[i].email == this.renter_email || this.renter_email== '')){
                  let start_date: any = new Date(data[i].updated_at5);
                  let start_difference = start_date - from_date;
                  let to_difference = to_date - start_date;
                  if (start_difference >= 0 && to_difference >=0){

                      if (data[i].status5 == 1){
                        this.starSteps.push(data[i]);
                      }

                      if (data[i].step == 6){
                        this.closedSteps.push(data[i]);
                      }
                      else if(data[i].status1 == 2){
                        this.rejectedSteps.push(data[i]);
                      }

                      if (data[i].step <=5){
                        this.openedSteps.push(data[i]);
                      }
                      if (data[i].step>=5){
                        this.paidSteps.push(data[i]);
                      }

                      
                      if (data[i].updated_at4){
                        let date4: any = new Date(data[i].updated_at4);
                        this.update_time_array4.push(date4 - start_date);
                      }

                      if (data[i].updated_at3){
                        let date3: any = new Date(data[i].updated_at3);
                        this.update_time_array3.push(date3 - start_date);
                      }
                      
                      if (data[i].updated_at2){
                        let date2: any = new Date(data[i].updated_at2);
                        this.update_time_array2.push(date2 - start_date);
                      }
                      
                      if (data[i].updated_at1){
                        let date1: any = new Date(data[i].updated_at1);
                        this.update_time_array1.push(date1 - start_date);
                      }

                      if (data[i].updated_at1_5){
                        let date5: any = new Date(data[i].updated_at1_5);
                        this.update_time_array5.push(date5 - start_date);
                      }

                      if (data[i].updated_at6){
                        let date6: any = new Date(data[i].updated_at6);
                        this.update_time_array6.push(date6 - start_date);
                      }
                  }
                  
                }
              }

              for (let i1=0; i1<this.update_time_array1.length; i1++){
                this.avg_time1 += this.update_time_array1[i1]/this.update_time_array1.length;
              }

              for (let i2=0; i2<this.update_time_array2.length; i2++){
                this.avg_time2 += this.update_time_array2[i2]/this.update_time_array2.length;
              }

              for (let i3=0; i3<this.update_time_array3.length; i3++){
                this.avg_time3 += this.update_time_array3[i3]/this.update_time_array3.length;
              }

              for (let i4=0; i4<this.update_time_array4.length; i4++){
                this.avg_time4 += this.update_time_array4[i4]/this.update_time_array4.length;
              }

              for (let i5=0; i5<this.update_time_array5.length; i5++){
                this.avg_time5 += this.update_time_array5[i5]/this.update_time_array5.length;
              }

              for (let i6=0; i6<this.update_time_array6.length; i6++){
                this.avg_time6 += this.update_time_array6[i6]/this.update_time_array6.length;
              }

              this.avg_time6 = this.timeConversion(this.avg_time6);
              this.avg_time5 = this.timeConversion(this.avg_time5);
              this.avg_time4 = this.timeConversion(this.avg_time4);
              this.avg_time3 = this.timeConversion(this.avg_time3);
              this.avg_time2 = this.timeConversion(this.avg_time2);
              this.avg_time1 = this.timeConversion(this.avg_time1);

              let xxx = this.groupBy(this.starSteps, 'email');
              for (let key in xxx){
                console.log("key", key);
                let ave = 0;
                for (let j=0; j< xxx[key].length; j++){
                  ave += xxx[key][j].star / xxx[key].length;
                }
                this.stars.push({email: key, star: ave});
              }

              this.getStarReview();

              // let loading1 = this.loadingCtrl.create();
              // loading1.present();
              // this.userService.getAllRequests(this.token)
              //   .subscribe(
              //     (data) => {
              //       loading1.dismiss();
              //       for (let i=0; i<data.length; i++){
              //          if (data[i].updated_at5 && data[i].step<=5){
              //             let start_date: any = new Date(data[i].updated_at5);
              //             let start_difference = start_date - from_date;
              //             let to_difference = to_date - start_date;
              //             console.log("start-to-difference", start_difference, to_difference);
              //             if (start_difference >= 0 && to_difference >=0){
                     
              //               this.openedSteps.push(data[i]);
              //             }
              //           }

                      
              //       }

                    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
                        type: 'doughnut',
                        data: {       
                            datasets: [{
                                
                                data: [this.openedSteps.length, this.closedSteps.length, this.rejectedSteps.length, this.paidSteps.length],
                                label: '# of Votes',
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(255, 206, 86, 0.5)',
                                    'rgba(75, 192, 192, 0.5)'
                                ],
                                hoverBackgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56",
                                    "#FF6384"
                                ]
                            }],
                            labels: ["Abiertas", "Cerradas", "Rechazadas", "Pagadas"]
                        }
             
                    });
                  // },
                  // (data) => {
                  //   loading1.dismiss();
                    
                  // });
              
            },
            (data) => {
              loading.dismiss();
              
            });
  }

  timeConversion(millisec) {

        var seconds = (millisec / 1000);

        var minutes = (millisec / (1000 * 60));

        var hours = (millisec / (1000 * 60 * 60));

        var days = (millisec / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return seconds.toFixed(0) + " Secs";
        } else if (minutes < 60) {
            return minutes.toFixed(0) + " Mins";
        } else if (hours < 24) {
            return hours.toFixed(0) + " Hrs";
        } else {
            return days.toFixed(0) + " Days"
        }
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

  itemShow(event, index){
    this.star_flags[index] = !this.star_flags[index];
    
  }
}
