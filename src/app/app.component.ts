import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TechnicianPage } from '../pages/technician/technician';
import { LoginPage } from '../pages/login/login';
import { MaintenanceViewPage } from '../pages/maintenance-view/maintenance-view';
import { BuildingListPage } from '../pages/building-list/building-list';
import { NotificationPage } from '../pages/notification/notification';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { ProfilePage } from '../pages/profile/profile';
import { Storage } from '@ionic/storage';
import { Push } from '@ionic/cloud-angular';
import { Badge } from '@ionic-native/badge';
import { OneSignal } from '@ionic-native/onesignal';
import { UserService } from '../providers/user-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: any}>;
  count=0;
  token: any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public storage: Storage, public push : Push, public events: Events, public toastCtrl: ToastController, public badge:Badge,
    public oneSignal: OneSignal, public userService: UserService, public loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, icon: 'md-home' },
      { title: 'Mantenimiento', component: MaintenanceViewPage, icon: 'md-paper' },
      { title: 'Torres', component: BuildingListPage, icon: 'md-easel'},
      { title: 'Notificaciones', component: NotificationPage, icon: 'md-notifications'},
      { title: 'Indicadores de Gestión', component: AnalyticsPage, icon: 'md-analytics'},
      { title: 'Perfil', component: ProfilePage, icon: 'md-person'},
      { title: 'Técnico', component: TechnicianPage, icon: 'md-calculator'},
      { title: 'Cerrar Sesión', component: null, icon: 'md-log-out'}
    ];

    if (!this.platform.is('core')) {
            //push configuration
            platform.ready().then(() => {

                // this.push.register().then((t: PushToken) => {
                //     return this.push.saveToken(t);
                // }).then((t: PushToken) => {
                //     console.log('Token saved:', t.token);
                //     //this.storage.set('device_token', t.token);
                // });

                // this.push.rx.notification()
                //     .subscribe((msg) => {
                //       this.badge.increase(1);
                //         alert(msg.title + ': ' + msg.text);
                //         let duration:number = 4000;

                //         let timeoutHandler = setTimeout( () => { toast.dismiss({autoclose:true}); },duration);

                //         let toast = this.toastCtrl.create({
                //             message: msg.text,
                //             showCloseButton: true,
                //             closeButtonText: 'View',
                //             position: 'top'
                //         });


                //         toast.onDidDismiss((data) => {
                //             clearTimeout(timeoutHandler);
                //             if(!data || !data.autoclose) {
                //                 if (msg.payload['type'] == "request") {
                //                     this.nav.setRoot(MaintenanceViewPage).then(() => {
                //                         this.events.publish('noti:request', msg.payload['typeKey']);
                //                     });
                //                 }
                //             }
                //         });
                //         toast.present();

                //     });


            });
        }

    this.storage.get('notification_count').then(val=>{
      this.count = val;
    });
     this.events.subscribe("user:changed", ()=> {
        this.storage.get('userdata').then(val=>{
          if (val != null){
            if (val.user.level == 7 || val.user.level == 8){
              this.pages = [
                { title: 'Inicio', component: HomePage, icon: 'md-home' },
                { title: 'Mantenimiento', component: MaintenanceViewPage, icon: 'md-paper' },
                { title: 'Torres', component: BuildingListPage, icon: 'md-easel'},
                { title: 'Notificaciones', component: NotificationPage, icon: 'md-notifications'},
                { title: 'Indicadores de Gestión', component: AnalyticsPage, icon: 'md-analytics'},
                { title: 'Técnico', component: TechnicianPage, icon: 'md-calculator'},
                { title: 'Cerrar Sesión', component: null, icon: 'md-log-out'}
              ];
            }
            else if (val.user.level == 3){
              this.pages = [
                
                { title: 'Mantenimiento', component: MaintenanceViewPage, icon: 'md-paper' },
                { title: 'Notificaciones', component: NotificationPage, icon: 'md-notifications'},
                { title: 'Perfil', component: ProfilePage, icon: 'md-person'},
                { title: 'Cerrar Sesión', component: null, icon: 'md-log-out'}
              ];
            }
            else{
              this.pages = [
                { title: 'Mantenimiento', component: MaintenanceViewPage, icon: 'md-paper' },
                { title: 'Notificaciones', component: NotificationPage, icon: 'md-notifications'},
                { title: 'Perfil', component: ProfilePage, icon: 'md-person'},
                { title: 'Cerrar Sesión', component: null, icon: 'md-log-out'}
              ];
            }
            this.token=val.token;
            this.storage.get('notification_count').then(val=>{
              this.count = val;
            });
            //this.getNotifications(val.token);
            this.events.publish("noti1:changed");
            this.events.publish("noti2:changed");
          }
        });
      });

     this.events.subscribe("notification:changed", ()=>{
       this.storage.get('userdata').then(val=>{
          if (val != null){
            
            this.token=val.token;
            this.getNotifications(val.token);
          }
        });
     });
  }

  getNotifications(token){
    this.count = 0;
    this.userService.getNotifications(token)
    .subscribe(
      (data) => {
        for (let i=0; i<data.length; i++){
          if (data[i].read == false){
            this.count++;
          }
        }
        this.storage.set("notification_count", this.count);
        this.events.publish("noti1:changed");
        this.events.publish("noti2:changed");
      },
      (data) => {
       
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.configOnesignal();
    });
  }

  configOnesignal() {
    this.oneSignal.startInit('ae60cbd3-3a45-469c-b6c7-bcb6104c31b4', '348010185137');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
       this.getNotifications(this.token);
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      this.nav.setRoot(NotificationPage);
    });

    this.oneSignal.getIds().then((ids)=> {
      this.storage.set('device_token', ids.userId);
    });

    this.oneSignal.endInit();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == undefined){
      this.storage.remove("userdata");
      this.storage.remove("notification_count");
      let params = {
        token : this.token,
        device_token: "2",
      };
      let loading = this.loadingCtrl.create();
      loading.present();
      this.userService.updateDeviceToken(params)
        .subscribe(
          (data1)=>{
            console.log("data1-success", data1);
            loading.dismiss();
            this.nav.setRoot(LoginPage);
          },
          (data1)=>{
            loading.dismiss();
            this.nav.setRoot(LoginPage);
          });
    }
    else{
      this.nav.setRoot(page.component);
    }
    
  }
}
