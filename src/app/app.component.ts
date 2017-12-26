import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { MaintenanceViewPage } from '../pages/maintenance-view/maintenance-view';
import { BuildingListPage } from '../pages/building-list/building-list';

import { Storage } from '@ionic/storage';
import {Push, PushToken} from '@ionic/cloud-angular';
import { Badge } from '@ionic-native/badge';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public storage: Storage, public push : Push, public events: Events, public toastCtrl: ToastController, public badge:Badge) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Mantenimiento', component: MaintenanceViewPage },
      { title: 'Edificios', component: BuildingListPage},
      { title: 'Sign Out', component: null}
    ];

    if (!this.platform.is('core')) {
            //push configuration
            platform.ready().then(() => {

                this.push.register().then((t: PushToken) => {
                    return this.push.saveToken(t);
                }).then((t: PushToken) => {
                    console.log('Token saved:', t.token);
                    // this.auth.setDeviceToken(t.token).then(res => {
                    //     this.auth.registerDeviceToken();
                    // });
                    this.storage.set('device_token', t.token);
                });

                this.push.rx.notification()
                    .subscribe((msg) => {
                      this.badge.increase(1);
//                        //console.log(msg);
                        alert(msg.title + ': ' + msg.text);
                        let duration:number = 4000;

                        let timeoutHandler = setTimeout( () => { toast.dismiss({autoclose:true}); },duration);

                        let toast = this.toastCtrl.create({
                            message: msg.text,
                            showCloseButton: true,
                            closeButtonText: 'View',
                            position: 'top'
                        });


                        toast.onDidDismiss((data) => {
                            clearTimeout(timeoutHandler);
//                            //console.log('time elapsed',data);
                            if(!data || !data.autoclose) {
                                if (msg.payload['type'] == "request") {
                                    this.nav.setRoot(MaintenanceViewPage).then(() => {
                                        this.events.publish('noti:request', msg.payload['typeKey']);
                                    });
                                }
                            }
                        });
                        toast.present();

                    });
            });
        }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == undefined){
      this.storage.remove("userdata");
      this.nav.setRoot(LoginPage);
    }
    else{
      this.nav.setRoot(page.component);
    }
    
  }
}
