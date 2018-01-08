import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MaintenanceViewPage} from '../pages/maintenance-view/maintenance-view';
import { MaintenanceTrackerPage} from '../pages/maintenance-tracker/maintenance-tracker';
import { OtrsRequestPage } from '../pages/otrs-request/otrs-request';
import { BuildingListPage } from '../pages/building-list/building-list';
import { CreateOfficePage } from '../pages/create-office/create-office';
import { BuildingProfilePage } from '../pages/building-profile/building-profile';
import { PopupPage } from '../pages/popup/popup';

import { UserService } from '../providers/user-service';
import { BaseService } from '../providers/base-service';
import { BuildingProvider } from '../providers/building';
import { PushServiceProvider } from '../providers/push-service';
import { IonicStorageModule } from '@ionic/storage';
import { TextMaskModule } from 'angular2-text-mask';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
// import {AngularFireModule} from 'angularfire2';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatePicker } from '@ionic-native/date-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Badge } from '@ionic-native/badge';
import { MomentModule } from 'angular2-moment';

export const firebaseConfig = {
    apiKey: "AIzaSyDzuNnzZXieJMFnG9C2-VRjPN3IfuJ_EoI",
    authDomain: "wtcb-1ef9a.firebaseapp.com",
    databaseURL: "https://wtcb-1ef9a.firebaseio.com",
    projectId: "wtcb-1ef9a",
    storageBucket: "wtcb-1ef9a.appspot.com",
    messagingSenderId: "348010185137"
};

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '5d7af5a6'
    },
    'push': {
        'sender_id': '348010185137',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#ffffff'
            }
        }
    }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    MaintenanceViewPage,
    OtrsRequestPage,
    BuildingListPage,
    CreateOfficePage,
    BuildingProfilePage,
    MaintenanceTrackerPage,
    PopupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TextMaskModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    MaintenanceViewPage,
    OtrsRequestPage,
    BuildingListPage,
    CreateOfficePage,
    BuildingProfilePage,
    MaintenanceTrackerPage,
    PopupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    BaseService,
    BuildingProvider,
    PushServiceProvider,
    Camera,
    EmailComposer,
    DatePicker,
    InAppBrowser,
    Badge,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
