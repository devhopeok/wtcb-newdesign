webpackJsonp([0],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__building_list_building_list__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notification_notification__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, loadingCtrl, userService, buildingService, storage, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.buildingService = buildingService;
        this.storage = storage;
        this.events = events;
        this.count = 0;
        this.offices = [];
        this.buildings = this.buildingService.list();
        this.authUser = {
            level: 4
        };
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            _this.token = val.token;
            _this.authUser = val.user;
            var loading = _this.loadingCtrl.create();
            loading.present();
            _this.userService.getAllOffices(_this.token)
                .subscribe(function (data) {
                loading.dismiss();
                console.log("Getting All Offices:", data);
                _this.offices = data;
            }, function (data) {
                loading.dismiss();
            });
        });
        this.storage.get('notification_count').then(function (val) {
            _this.count = val;
        });
        this.events.subscribe("noti1:changed", function () {
            _this.storage.get('notification_count').then(function (val) {
                _this.count = val;
                console.log("noti1:changed", val, _this.count);
            });
        });
    };
    HomePage.prototype.rentedOffices = function (buildingId) {
        var count = 0;
        for (var i = 0; i < this.offices.length; i++) {
            if (this.offices[i]['buildingId'] == buildingId && this.offices[i]['is_rented']) {
                count++;
            }
        }
        return count;
    };
    HomePage.prototype.vacantOffices = function (buildingId) {
        var count = 0;
        for (var i = 0; i < this.offices.length; i++) {
            if (this.offices[i]['buildingId'] == buildingId && !this.offices[i]['is_rented']) {
                count++;
            }
        }
        return count;
    };
    HomePage.prototype.occupancyOffices = function (buildingId) {
        var count = 0;
        var officeCount = 0;
        for (var i = 0; i < this.offices.length; i++) {
            if (this.offices[i]['buildingId'] == buildingId) {
                officeCount++;
                if (this.offices[i]['is_rented'])
                    count++;
            }
        }
        return count / officeCount * 100;
    };
    HomePage.prototype.viewBuildingList = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__building_list_building_list__["a" /* BuildingListPage */]);
    };
    HomePage.prototype.gotoMaintenance = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
    };
    HomePage.prototype.gotoNotification = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__notification_notification__["a" /* NotificationPage */]);
    };
    HomePage.prototype.viewFloorOfffice = function (floorId, buildingId) {
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n\n        <ion-buttons end>\n              <button ion-button icon-only style="color:white;" (click)="gotoNotification();">\n                    <ion-icon name="md-notifications"></ion-icon>\n              </button>\n              <div class="badge" *ngIf="count>0"></div>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid ion-fixed style="height: 100vh">\n        <ion-row class="notice-header">\n            <ion-col style="background-color:black;color:white;">\n                <ion-slides pager="true" class="superfill">\n                    <ion-slide class="dashboard">\n                        <!-- <h1 class="bold" style="color: #1b4c5c;">EG</h1> -->\n                    </ion-slide>\n                    <!-- <ion-slide class="alerts">\n                        <h1>Alertas</h1>\n                    </ion-slide>\n                    <ion-slide class="news">\n                        <h1>Noticias</h1>\n                    </ion-slide> -->\n                </ion-slides>\n            </ion-col>\n        </ion-row>\n\n        <ion-row class="wtc-container">\n            <ion-col col-8 style="background-color:orange;color:white;">\n                <ion-slides pager="true" class="superfill">\n                    <ion-slide class="torreA">\n\n                        <h1 class="light-font-header">TORRE A</h1>\n                        <ion-list>\n                            <ion-item *ngFor="let item of buildings[0].floors" (click)="viewFloorOfffice(1, item.id)">\n                                {{item.name}}\n                            </ion-item>\n                        </ion-list>\n\n                        <ion-row class="building-info" *ngIf="authUser.level == 7 || authUser.level == 8">\n                            <ion-col>\n                                Rented Offices\n                                <p>\n                                    {{rentedOffices(1)}}\n                                </p>\n                            </ion-col>\n                            <ion-col>\n                                Occupancy\n                                <p>{{occupancyOffices(1).toFixed(2)}}%</p>\n                            </ion-col>\n                            <ion-col>\n                                Vacant Offices\n                                <p>{{vacantOffices(1)}}</p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-slide>\n                    <ion-slide class="torreB">\n                        <h1 class="light-font-header">TORRE B</h1>\n\n                        <ion-list>\n                            <ion-item *ngFor="let item of buildings[1].floors" (click)="viewFloorOfffice(2, item.id)">\n                                {{item.name}}\n                            </ion-item>\n                        </ion-list>\n\n                        <ion-row class="building-info" *ngIf="authUser.level == 7 || authUser.level == 8">\n                            <ion-col>\n                                Rented Offices\n                                <p>\n                                    {{rentedOffices(2)}}\n                                </p>\n                            </ion-col>\n                            <ion-col>\n                                Occupancy\n                                <p>{{occupancyOffices(2).toFixed(2)}}%</p>\n                            </ion-col>\n                            <ion-col>\n                                Vacant Offices\n                                <p>{{vacantOffices(2)}}</p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-slide>\n                    <ion-slide class="torreC">\n                        <h1 class="light-font-header">TORRE C</h1>\n\n                        <ion-list>\n                            <ion-item *ngFor="let item of buildings[2].floors" (click)="viewFloorOfffice(3, item.id)">\n                                {{item.name}}\n                            </ion-item>\n                        </ion-list>\n\n                        <ion-row class="building-info" *ngIf="authUser.level == 7 || authUser.level == 8">\n                            <ion-col>\n                                Rented Offices\n                                <p>\n                                    {{rentedOffices(3)}}\n                                </p>\n                            </ion-col>\n                            <ion-col>\n                                Occupancy\n                                <p>{{occupancyOffices(3).toFixed(2)}}%</p>\n                            </ion-col>\n                            <ion-col>\n                                Vacant Offices\n                                <p>{{vacantOffices(3)}}</p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-slide>\n                </ion-slides>\n            </ion-col>\n            <ion-scroll scrollY="true" col-4 style="background-color:rgba(239, 239, 239, 0);color:white;border:0;" class="menu-scroll">\n                <ion-list >\n                    <!-- Sliding item -->\n                    <ion-item-sliding menuToggle>\n                        <ion-item>\n                            <ion-icon name="ios-menu-outline"></ion-icon>\n                        </ion-item>\n                        \n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item (click)="viewBuildingList()">\n                            TORRES\n                        </ion-item>\n                        \n                    </ion-item-sliding>\n\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item (click)="gotoMaintenance()">\n                            MANTENIMIENTO\n                        </ion-item>\n                        \n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item (click)="gotoNotification()">\n                            CENTRO DE <br/>NOTIFICACIONES\n                        </ion-item>\n                        \n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item>\n                            CORREOS\n                        </ion-item>\n                        \n                    </ion-item-sliding>\n\n                </ion-list>\n            </ion-scroll>\n\n        </ion-row>\n\n\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 1218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 433,
	"./af.js": 433,
	"./ar": 434,
	"./ar-dz": 435,
	"./ar-dz.js": 435,
	"./ar-kw": 436,
	"./ar-kw.js": 436,
	"./ar-ly": 437,
	"./ar-ly.js": 437,
	"./ar-ma": 438,
	"./ar-ma.js": 438,
	"./ar-sa": 439,
	"./ar-sa.js": 439,
	"./ar-tn": 440,
	"./ar-tn.js": 440,
	"./ar.js": 434,
	"./az": 441,
	"./az.js": 441,
	"./be": 442,
	"./be.js": 442,
	"./bg": 443,
	"./bg.js": 443,
	"./bm": 444,
	"./bm.js": 444,
	"./bn": 445,
	"./bn.js": 445,
	"./bo": 446,
	"./bo.js": 446,
	"./br": 447,
	"./br.js": 447,
	"./bs": 448,
	"./bs.js": 448,
	"./ca": 449,
	"./ca.js": 449,
	"./cs": 450,
	"./cs.js": 450,
	"./cv": 451,
	"./cv.js": 451,
	"./cy": 452,
	"./cy.js": 452,
	"./da": 453,
	"./da.js": 453,
	"./de": 454,
	"./de-at": 455,
	"./de-at.js": 455,
	"./de-ch": 456,
	"./de-ch.js": 456,
	"./de.js": 454,
	"./dv": 457,
	"./dv.js": 457,
	"./el": 458,
	"./el.js": 458,
	"./en-au": 459,
	"./en-au.js": 459,
	"./en-ca": 460,
	"./en-ca.js": 460,
	"./en-gb": 461,
	"./en-gb.js": 461,
	"./en-ie": 462,
	"./en-ie.js": 462,
	"./en-nz": 463,
	"./en-nz.js": 463,
	"./eo": 464,
	"./eo.js": 464,
	"./es": 465,
	"./es-do": 466,
	"./es-do.js": 466,
	"./es-us": 467,
	"./es-us.js": 467,
	"./es.js": 465,
	"./et": 468,
	"./et.js": 468,
	"./eu": 469,
	"./eu.js": 469,
	"./fa": 470,
	"./fa.js": 470,
	"./fi": 471,
	"./fi.js": 471,
	"./fo": 472,
	"./fo.js": 472,
	"./fr": 473,
	"./fr-ca": 474,
	"./fr-ca.js": 474,
	"./fr-ch": 475,
	"./fr-ch.js": 475,
	"./fr.js": 473,
	"./fy": 476,
	"./fy.js": 476,
	"./gd": 477,
	"./gd.js": 477,
	"./gl": 478,
	"./gl.js": 478,
	"./gom-latn": 479,
	"./gom-latn.js": 479,
	"./gu": 480,
	"./gu.js": 480,
	"./he": 481,
	"./he.js": 481,
	"./hi": 482,
	"./hi.js": 482,
	"./hr": 483,
	"./hr.js": 483,
	"./hu": 484,
	"./hu.js": 484,
	"./hy-am": 485,
	"./hy-am.js": 485,
	"./id": 486,
	"./id.js": 486,
	"./is": 487,
	"./is.js": 487,
	"./it": 488,
	"./it.js": 488,
	"./ja": 489,
	"./ja.js": 489,
	"./jv": 490,
	"./jv.js": 490,
	"./ka": 491,
	"./ka.js": 491,
	"./kk": 492,
	"./kk.js": 492,
	"./km": 493,
	"./km.js": 493,
	"./kn": 494,
	"./kn.js": 494,
	"./ko": 495,
	"./ko.js": 495,
	"./ky": 496,
	"./ky.js": 496,
	"./lb": 497,
	"./lb.js": 497,
	"./lo": 498,
	"./lo.js": 498,
	"./lt": 499,
	"./lt.js": 499,
	"./lv": 500,
	"./lv.js": 500,
	"./me": 501,
	"./me.js": 501,
	"./mi": 502,
	"./mi.js": 502,
	"./mk": 503,
	"./mk.js": 503,
	"./ml": 504,
	"./ml.js": 504,
	"./mr": 505,
	"./mr.js": 505,
	"./ms": 506,
	"./ms-my": 507,
	"./ms-my.js": 507,
	"./ms.js": 506,
	"./mt": 508,
	"./mt.js": 508,
	"./my": 509,
	"./my.js": 509,
	"./nb": 510,
	"./nb.js": 510,
	"./ne": 511,
	"./ne.js": 511,
	"./nl": 512,
	"./nl-be": 513,
	"./nl-be.js": 513,
	"./nl.js": 512,
	"./nn": 514,
	"./nn.js": 514,
	"./pa-in": 515,
	"./pa-in.js": 515,
	"./pl": 516,
	"./pl.js": 516,
	"./pt": 517,
	"./pt-br": 518,
	"./pt-br.js": 518,
	"./pt.js": 517,
	"./ro": 519,
	"./ro.js": 519,
	"./ru": 520,
	"./ru.js": 520,
	"./sd": 521,
	"./sd.js": 521,
	"./se": 522,
	"./se.js": 522,
	"./si": 523,
	"./si.js": 523,
	"./sk": 524,
	"./sk.js": 524,
	"./sl": 525,
	"./sl.js": 525,
	"./sq": 526,
	"./sq.js": 526,
	"./sr": 527,
	"./sr-cyrl": 528,
	"./sr-cyrl.js": 528,
	"./sr.js": 527,
	"./ss": 529,
	"./ss.js": 529,
	"./sv": 530,
	"./sv.js": 530,
	"./sw": 531,
	"./sw.js": 531,
	"./ta": 532,
	"./ta.js": 532,
	"./te": 533,
	"./te.js": 533,
	"./tet": 534,
	"./tet.js": 534,
	"./th": 535,
	"./th.js": 535,
	"./tl-ph": 536,
	"./tl-ph.js": 536,
	"./tlh": 537,
	"./tlh.js": 537,
	"./tr": 538,
	"./tr.js": 538,
	"./tzl": 539,
	"./tzl.js": 539,
	"./tzm": 540,
	"./tzm-latn": 541,
	"./tzm-latn.js": 541,
	"./tzm.js": 540,
	"./uk": 542,
	"./uk.js": 542,
	"./ur": 543,
	"./ur.js": 543,
	"./uz": 544,
	"./uz-latn": 545,
	"./uz-latn.js": 545,
	"./uz.js": 544,
	"./vi": 546,
	"./vi.js": 546,
	"./x-pseudo": 547,
	"./x-pseudo.js": 547,
	"./yo": 548,
	"./yo.js": 548,
	"./zh-cn": 549,
	"./zh-cn.js": 549,
	"./zh-hk": 550,
	"./zh-hk.js": 550,
	"./zh-tw": 551,
	"./zh-tw.js": 551
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1218;

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
 Generated class for the PushServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
var PushServiceProvider = (function () {
    function PushServiceProvider(http, userService, oneSignal) {
        //console.log('Hello PushServiceProvider Provider');
        this.http = http;
        this.userService = userService;
        this.oneSignal = oneSignal;
        this.PUSH_CREATE_URL = 'https://onesignal.com/api/v1/notifications';
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */];
        myHeaders.set('Authorization', "Basic YTUzYzE2NmYtNDZjZC00M2Q4LThkMmYtMjY3ZTJiYTY1MWQy");
        myHeaders.set('Content-Type', 'application/json; charset=utf-8');
        this.authOpt = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: myHeaders,
        });
    }
    PushServiceProvider.prototype.notiBuildingManagerForRequest = function (requestId, message, token) {
        var _this = this;
        this.userService.getUsersByLevel(7)
            .subscribe(function (data) {
            var userDevices = [];
            var _loop_1 = function (i) {
                _this.userService.getDeviceById(data[i].email, token)
                    .subscribe(function (data1) {
                    userDevices.push(data1.device_token);
                    //if (userDevices.length == data.length){
                    console.log("requestid and message", requestId, message, userDevices);
                    var pushData = {
                        "app_id": "ae60cbd3-3a45-469c-b6c7-bcb6104c31b4",
                        "include_player_ids": userDevices,
                        "contents": { 'en': message },
                        "ios_badgeType": "Increase",
                        "ios_badgeCount": 1
                    };
                    console.log("push Data", pushData);
                    _this.http.post(_this.PUSH_CREATE_URL, pushData, _this.authOpt).map(function (res) { return res.json(); }).subscribe(function (data) {
                        console.log('Notification sent successfully!');
                    }, function (err) {
                        console.log('Notification sending error!');
                    }, function () { return console.log('Create Notification'); });
                    var notification = {
                        token: token,
                        email: data[i].email,
                        notification: message,
                        requestId: requestId,
                        read: false
                    };
                    _this.userService.addNotification(notification)
                        .subscribe(function (data) {
                        console.log("notification Data:", data);
                    }, function (data) {
                    });
                    //}
                }, function (data1) {
                });
            };
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
            }
        }, function (data) {
        });
    };
    PushServiceProvider.prototype.notiUserForRequest = function (userId, requestId, message, token) {
        var _this = this;
        this.userService.getUserById(userId)
            .subscribe(function (data) {
            _this.userService.getDeviceById(data.email, token)
                .subscribe(function (data1) {
                var userDevice = data1;
                var pushData = {
                    "app_id": "ae60cbd3-3a45-469c-b6c7-bcb6104c31b4",
                    "include_player_ids": [userDevice['device_token']],
                    "contents": { 'en': message },
                    "data": {
                        "type": "request",
                        "typeKey": requestId
                    },
                    "ios_badgeType": "Increase",
                    "ios_badgeCount": 1
                };
                console.log("push Data", pushData);
                _this.http.post(_this.PUSH_CREATE_URL, pushData, _this.authOpt).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log('Notification sent successfully!');
                }, function (err) {
                    console.log('Notification sending error!');
                }, function () { return console.log('Create Notification'); });
                var notification = {
                    token: token,
                    email: data.email,
                    notification: message,
                    requestId: requestId,
                    read: false
                };
                _this.userService.addNotification(notification)
                    .subscribe(function (data) {
                    console.log("notification Data:", data);
                }, function (data) {
                });
            }, function (data1) {
            });
        }, function (data) {
        });
    };
    PushServiceProvider.prototype.getNotifiactionList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.PUSH_CREATE_URL, _this.authOpt).map(function (res) { return res.json(); }).subscribe(function (data) {
                //console.log(data);
                resolve(data);
            }, function (err) {
                reject(false);
            }, function () { return console.log('Get Notification List'); });
        });
    };
    return PushServiceProvider;
}());
PushServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */]])
], PushServiceProvider);

//# sourceMappingURL=push-service.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__maintenance_view_maintenance_view__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, storage, buildingService, loadingCtrl, userService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.buildingService = buildingService;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.create_or_update = 0;
        this.edit_or_save = 0;
        this.user = {
            _id: '',
            level: 1,
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            blood_type: '',
            officeKey: '',
            company: ''
        };
        this.init();
    }
    ProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            _this.token = val.token;
            _this.office.token = _this.token;
            _this.officeKey = val.user.officeKey;
            _this.user = val.user;
            if (_this.user.level == 3) {
                _this.getOffice();
            }
            else {
                console.log(_this.user, "Technician info");
                var loading_1 = _this.loadingCtrl.create();
                if (_this.user.officeKey) {
                    loading_1.present();
                    _this.userService.getOfficesById(_this.user.officeKey, _this.token)
                        .subscribe(function (data) {
                        loading_1.dismiss();
                        _this.office = data[0];
                        var buildings = _this.buildingService.list();
                        for (var i = 0; i < buildings.length; i++) {
                            if (buildings[i].id == _this.office.buildingId) {
                                _this.office.buildingName = buildings[i].name;
                                for (var j = 0; j < buildings[i].floors.length; j++) {
                                    if (_this.office.floorId == buildings[i].floors[j].id) {
                                        _this.office.floorName = buildings[i].floors[j].name;
                                    }
                                }
                            }
                        }
                    }, function (data) {
                        loading_1.dismiss();
                    });
                }
                _this.create_or_update = 1;
            }
        });
    };
    ProfilePage.prototype.init = function () {
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
    };
    ProfilePage.prototype.getOffice = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.userService.getOfficeByEmail(this.token)
            .subscribe(function (data) {
            _this.loading.dismiss();
            console.log("office Data:", data);
            _this.office = data;
            _this.office.token = _this.token;
            _this.create_or_update = 1;
        }, function (data) {
            console.log("office data: failure", data);
            _this.loading.dismiss();
            _this.create_or_update = 0;
        });
    };
    ProfilePage.prototype.updateFloors = function () {
        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].id == this.office.buildingId) {
                this.floors = this.buildings[i].floors;
                break;
            }
        }
    };
    ProfilePage.prototype.createOffice = function () {
        var _this = this;
        if (this.user.level == 3) {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            console.log("param", this.office);
            if (this.create_or_update == 0) {
                this.userService.createOffice(this.office)
                    .subscribe(function (data) {
                    _this.loading.dismiss();
                    console.log("office Data:", data);
                    if (data.message == 'Success') {
                        var alert_1 = _this.alertCtrl.create({
                            title: "¡Genial!", subTitle: "La información ha sido guardada.",
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this.officeKey = data.office_id;
                                        _this.updateUser();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                    }
                }, function (data) {
                    _this.loading.dismiss();
                });
            }
            else if (this.edit_or_save == 1) {
                this.userService.updateOffice(this.office)
                    .subscribe(function (data) {
                    _this.loading.dismiss();
                    console.log("office Data:", data);
                    if (data == 'Success') {
                        var alert_2 = _this.alertCtrl.create({
                            title: "Éxito", subTitle: "¡Genial! El perfil ha sido creado con éxito.",
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this.officeKey = _this.office._id;
                                        _this.updateUser();
                                    }
                                }
                            ]
                        });
                        alert_2.present();
                    }
                }, function (data) {
                    _this.loading.dismiss();
                });
            }
        }
        else {
            this.updateTechnician();
        }
    };
    ProfilePage.prototype.onEdit = function () {
        this.edit_or_save = 1;
        console.log("this.edit_or_save", this.edit_or_save);
    };
    ProfilePage.prototype.updateTechnician = function () {
        var _this = this;
        var params = {
            token: this.token,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phone_number: this.user.phone_number,
            blood_type: this.user.blood_type,
            company: this.user.company,
            _id: this.user._id
        };
        console.log("update user", params);
        this.userService.updateUser(params)
            .subscribe(function (data) {
            console.log("result update user", data);
            _this.storage.get('userdata').then(function (val) {
                val.user = data.user;
                _this.storage.set('userdata', val);
            });
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
        }, function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
        });
    };
    ProfilePage.prototype.updateUser = function () {
        var _this = this;
        var params = {
            token: this.token,
            officeKey: this.officeKey,
            _id: this.user._id
        };
        console.log("update user", params);
        this.userService.updateUser(params)
            .subscribe(function (data) {
            console.log("result update user", data);
            _this.storage.get('userdata').then(function (val) {
                val.user.officeKey = data.officeKey;
                _this.storage.set('userdata', val);
            });
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
        }, function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
        });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n        <ion-title>Perfil</ion-title>\n\n        <ion-buttons end *ngIf="create_or_update == 1 && edit_or_save == 0">\n          <button ion-button style="color:white;" (click)="onEdit();">\n            Editar\n          </button>\n          <!-- <div class="badge" *ngIf="count>0"></div> -->\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list *ngIf="user.level == 3">\n        <ion-item>\n            <ion-label>Seleccione Edificio</ion-label>\n            <ion-select [(ngModel)]="office.buildingId" interface="popover" (ngModelChange)="updateFloors()">\n                <ion-option value="{{item.id}}" *ngFor="let item of buildings">{{item.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label>Seleccione Piso</ion-label>\n            <ion-select interface="popover" [(ngModel)]="office.floorId">\n                <ion-option value="{{item.id}}" *ngFor="let item of floors">{{item.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Oficina No.</ion-label>\n            <ion-input type="text" [(ngModel)]="office.name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Compañia</ion-label>\n            <ion-input type="text" [(ngModel)]="office.company"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Area Mts</ion-label>\n            <ion-input type="text" [(ngModel)]="office.area"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Garages</ion-label>\n            <ion-input type="text" [(ngModel)]="office.garages"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Co-Pago</ion-label>\n            <ion-input type="text" [(ngModel)]="office.coPay"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <ion-list *ngIf="user.level != 3">\n    \n        <ion-item>\n            <ion-label fixed>Compañia</ion-label>\n            <ion-input type="text" [(ngModel)]="user.company"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label fixed>Nombre</ion-label>\n            <ion-input type="text" [(ngModel)]="user.first_name"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label fixed>Apellido</ion-label>\n            <ion-input type="text" [(ngModel)]="user.last_name"></ion-input>\n        </ion-item>\n\n       \n        <ion-item>\n            <ion-label fixed>Telefono</ion-label>\n            <ion-input type="text" [(ngModel)]="user.phone_number"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Email</ion-label>\n            <ion-input type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Especialidad de Trabajo</ion-label>\n            <ion-input type="text" [(ngModel)]="user.blood_type"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <button *ngIf="create_or_update == 0 || edit_or_save == 1" ion-button class="main-btn" (click)="createOffice()">Guardar</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/profile/profile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__providers_building__["a" /* BuildingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 1300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__maintenance_tracker_maintenance_tracker__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationPage = (function () {
    function NotificationPage(navCtrl, navParams, userService, loadingCtrl, storage, events, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.notifications = [];
    }
    NotificationPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.authUser = val.user;
                _this.token = val.token;
                _this.getNotifications(_this.token);
            }
        });
    };
    NotificationPage.prototype.getNotifications = function (token) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getNotifications(token)
            .subscribe(function (data) {
            loading.dismiss();
            _this.notifications = data;
            console.log("notifications", data);
        }, function (data) {
            loading.dismiss();
        });
    };
    NotificationPage.prototype.gotoMaintenanceView = function (notification) {
        var _this = this;
        notification.read = true;
        var data = {
            token: this.token,
            read: true
        };
        console.log("update noti data", notification.requestId, data);
        this.userService.updateNotification(notification._id, data)
            .subscribe(function (data) {
            console.log("updated read data", data);
            _this.events.publish("noti1:changed");
            _this.events.publish("noti2:changed");
            _this.events.publish("notification:changed");
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: notification.requestId });
        }, function (data) {
        });
    };
    NotificationPage.prototype.delete = function (id) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.deleteNotification(id, this.token)
            .subscribe(function (data) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: "", subTitle: "La notificación ha sido eliminada con éxito.", buttons: ['OK']
            });
            alert.present();
            _this.events.publish("noti1:changed");
            _this.events.publish("noti2:changed");
            _this.events.publish("notification:changed");
            _this.getNotifications(_this.token);
        }, function (data) {
            loading.dismiss();
        });
    };
    return NotificationPage;
}());
NotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-notification',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/notification/notification.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n    </button>\n    <ion-title>NOTIFICACIONES</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list no-lines>\n	  	<ion-item-sliding style="border-bottom: 1px solid gray;" *ngFor="let notification of notifications">\n	        <ion-item (click)="gotoMaintenanceView(notification);" class="notification-content" [ngClass]="{\'notification-content-bold\' : notification.read == false}">\n	          	{{notification.notification}}\n	        </ion-item>\n\n	        <ion-item-options side="right">\n	        	<button ion-button color="danger" (click)="delete(notification._id)">\n		            <ion-icon name="ios-trash"></ion-icon>\n		            Delete\n		        </button>\n	        </ion-item-options>\n	    </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/notification/notification.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_office_create_office__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__building_profile_building_profile__ = __webpack_require__(378);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BuildingListPage = (function () {
    function BuildingListPage(navCtrl, navParams, buildingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.buildingService = buildingService;
        this.buildings = this.buildingService.list();
        console.log(this.buildings);
    }
    BuildingListPage.prototype.ionViewDidLoad = function () {
    };
    BuildingListPage.prototype.createOffice = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__create_office_create_office__["a" /* CreateOfficePage */]);
    };
    BuildingListPage.prototype.viewBuilding = function (building) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__building_profile_building_profile__["a" /* BuildingProfilePage */], { buildingId: building['id'] });
    };
    return BuildingListPage;
}());
BuildingListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-building-list',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/building-list/building-list.html"*/'<!--\n  Generated template for the BuildingListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n        <ion-title>Torres</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card *ngFor="let item of buildings; let i = index;">\n        <ion-item (click)="viewBuilding(item)">\n            <ion-avatar item-start>\n                <img src="assets/imgs/ticket.png">\n            </ion-avatar>\n            <h2>{{item.name}}</h2>\n            <p>{{item.description}}</p>\n        </ion-item>\n    </ion-card>\n    <!-- <button ion-button class="main-btn" (click)="createOffice()">Create Office</button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/building-list/building-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_building__["a" /* BuildingProvider */]])
], BuildingListPage);

//# sourceMappingURL=building-list.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateOfficePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateOfficePage = (function () {
    function CreateOfficePage(navCtrl, navParams, loadingCtrl, buildingService, userService, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.buildingService = buildingService;
        this.userService = userService;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.office = {
            _id: '',
            token: '',
            name: '',
            buildingId: 1,
            floorId: 1,
            company: '',
            area: '',
            garages: '',
            coPay: '',
            is_rented: false,
            employees: {
                employee: {
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    level: 3.1,
                    password: '',
                    blood_type: '',
                    officeKey: ''
                },
                outsourcing: {
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    level: 3.2,
                    password: '',
                    blood_type: '',
                    officeKey: ''
                }
            }
        };
        //this.offices = this.db.list('/offices', {preserveSnapshot: true});
        this.phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.isConnected = true;
        this.init();
    }
    CreateOfficePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            _this.token = val.token;
            _this.office.token = _this.token;
        });
    };
    CreateOfficePage.prototype.ionViewDidLoad = function () {
    };
    CreateOfficePage.prototype.init = function () {
        this.buildings = this.buildingService.list();
        this.floors = this.buildings[0].floors;
        console.log("office_token", this.token);
        this.office.token = this.token;
        var nav_office = this.navParams.get('office');
        console.log("nav_office", nav_office);
        if (nav_office) {
            this.office._id = nav_office._id;
            this.office.name = nav_office.name;
            this.office.buildingId = nav_office.buildingId;
            this.office.company = nav_office.company;
            this.office.floorId = nav_office.floorId;
            this.office.area = nav_office.area;
            this.office.garages = nav_office.garages;
            this.office.coPay = nav_office.coPay;
            this.office.is_rented = nav_office.is_rented;
            if (nav_office.employees) {
                if (nav_office.employees.employee) {
                    this.office.employees.employee = nav_office.employees.employee;
                }
                if (nav_office.employees.outsourcing) {
                    this.office.employees.outsourcing = nav_office.employees.outsourcing;
                }
            }
        }
    };
    // private makePassword() {
    //     let text = "";
    //     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     for (let i = 0; i < 5; i++)
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     return text;
    // }
    CreateOfficePage.prototype.updateFloors = function () {
        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].id == this.office.buildingId) {
                this.floors = this.buildings[i].floors;
                break;
            }
        }
    };
    CreateOfficePage.prototype.createOffice = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.userService.updateOffice(this.office)
            .subscribe(function (data) {
            _this.loading.dismiss();
            console.log("office Data:", data);
            if (data == 'Success') {
                var alert_1 = _this.alertCtrl.create({
                    title: "!Genial!",
                    subTitle: "La información ha sido guardada.",
                    buttons: [{
                            text: 'OK',
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }]
                });
                alert_1.present();
                _this.office.employees.employee.officeKey = _this.office._id;
                _this.office.employees.outsourcing.officeKey = _this.office._id;
                console.log("office key", _this.office._id, _this.office.employees.outsourcing);
                _this.userService.signUp(_this.office.employees.employee)
                    .subscribe(function (data) {
                }, function (data) {
                });
                _this.userService.signUp(_this.office.employees.outsourcing)
                    .subscribe(function (data1) {
                    // this.navCtrl.pop();
                }, function (data1) {
                });
            }
        }, function (data) {
            _this.loading.dismiss();
        });
    };
    return CreateOfficePage;
}());
CreateOfficePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-create-office',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/create-office/create-office.html"*/'<!--\n  Generated template for the CreateOfficePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Crear oficina</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item class="opt">\n            <ion-label>Seleccione Edificio</ion-label>\n            <ion-select [(ngModel)]="office.buildingId" interface="popover" (ngModelChange)="updateFloors()">\n                <ion-option value="{{item.id}}" *ngFor="let item of buildings">{{item.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="opt">\n            <ion-label>Seleccione Piso</ion-label>\n            <ion-select interface="popover" [(ngModel)]="office.floorId">\n                <ion-option value="{{item.id}}" *ngFor="let item of floors">{{item.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Oficina No.</ion-label>\n            <ion-input type="text" [(ngModel)]="office.name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Compañia</ion-label>\n            <ion-input type="text" [(ngModel)]="office.company"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Area Mts</ion-label>\n            <ion-input type="text" [(ngModel)]="office.area"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Garages</ion-label>\n            <ion-input type="text" [(ngModel)]="office.garages"></ion-input>\n        </ion-item>\n        <!-- <ion-item>\n            <ion-label fixed>Co-Pago</ion-label>\n            <ion-input type="text" [(ngModel)]="office.coPay"></ion-input>\n        </ion-item> -->\n    </ion-list>\n\n    <ion-list>\n        <!-- <ion-list-header>\n            Information del dueño\n        </ion-list-header> -->\n\n        <h4>Information del dueño</h4>\n        <ion-item>\n            <ion-label fixed>Nombre</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.employee.first_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Apellido</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.employee.last_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Telefono</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.employee.phone_number" [textMask]="{mask: phoneMask, guide: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Email</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.employee.email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Contraseña</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.employee.password"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Especialidad de Trabajo</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.employee.blood_type"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <!-- <ion-list-header>\n            Información del rentatario\n        </ion-list-header> -->\n\n        <h4>Información del rentatario</h4>\n        <ion-item>\n            <ion-label fixed>Nombre</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.outsourcing.first_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Apellido</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.outsourcing.last_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Telefono</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.outsourcing.phone_number" [textMask]="{mask: phoneMask, guide: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Email</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.outsourcing.email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Contraseña</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.outsourcing.password"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Especialidad de Trabajo</ion-label>\n            <ion-input type="text" [(ngModel)]="office.employees.outsourcing.blood_type"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <button ion-button class="main-btn" (click)="createOffice()" [disabled]="!isConnected">Guardar</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/create-office/create-office.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CreateOfficePage);

//# sourceMappingURL=create-office.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtrsRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_push_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_global__ = __webpack_require__(1024);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_aws_sdk_clients_s3__ = __webpack_require__(1184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_aws_sdk_clients_s3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_aws_sdk_clients_s3__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the OtrsRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OtrsRequestPage = (function () {
    function OtrsRequestPage(navCtrl, navParams, loadingCtrl, actionSheetCtrl, userService, storage, camera, alertCtrl, pushService, buildingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.userService = userService;
        this.storage = storage;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.pushService = pushService;
        this.buildingService = buildingService;
        this.office = { company: '', name: '', buildingId: '', floorId: '' };
        this.otrsRequest = {
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
            token: ''
        };
        this.create_or_update = false;
        if (this.navParams.get('requestItem')) {
            this.otrsRequest = this.navParams.get('requestItem');
            this.create_or_update = true;
        }
    }
    OtrsRequestPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.token = val.token;
                _this.officeKey = val.user.officeKey;
                _this.userKey = val.user._id;
                if (_this.officeKey == null) {
                    _this.officeKey = _this.otrsRequest.officeKey;
                    var alert_1 = _this.alertCtrl.create({
                        title: "Advertencia", subTitle: "¡Alto! Por favor cree su perfil para tramitar solicitudes.",
                        buttons: [{
                                text: 'OK',
                                handler: function () {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__profile_profile__["a" /* ProfilePage */]);
                                }
                            }]
                    });
                    alert_1.present();
                }
                else {
                    var loading_1 = _this.loadingCtrl.create();
                    loading_1.present();
                    _this.userService.getOfficesById(_this.officeKey, _this.token)
                        .subscribe(function (data) {
                        loading_1.dismiss();
                        console.log("Getting Offices:", data);
                        _this.office = data[0];
                        var buildingId = _this.office.buildingId;
                        var floorId = _this.office.floorId;
                        var buildings = _this.buildingService.list();
                        var building = {
                            name: '',
                            floors: []
                        };
                        var floor = {
                            name: ''
                        };
                        for (var i = 0; i < buildings.length; i++) {
                            if (buildings[i].id.toString() == buildingId) {
                                building = buildings[i];
                                break;
                            }
                        }
                        if (floorId) {
                            for (var j = 0; j < building.floors.length; j++) {
                                if (building.floors[j].id.toString() == floorId) {
                                    floor = building.floors[j];
                                    console.log("floor", floor);
                                    break;
                                }
                            }
                        }
                        _this.building_name = building.name;
                        _this.floor_name = floor.name;
                    }, function (data) {
                        loading_1.dismiss();
                    });
                }
            }
        });
    };
    OtrsRequestPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad OtrsRequestPage');
    };
    OtrsRequestPage.prototype.ionViewDidEnter = function () {
    };
    OtrsRequestPage.prototype.fileEvent = function (event) {
        var files = event.target.files;
        var file = files[0];
        this.file = file;
        this.filename = new Date().getTime() + this.file.name;
        console.log("this.file:" + JSON.stringify(this.filename));
        __WEBPACK_IMPORTED_MODULE_8_aws_sdk_global__["config"].accessKeyId = 'AKIAJNHK7OBATDPIEJJA';
        __WEBPACK_IMPORTED_MODULE_8_aws_sdk_global__["config"].secretAccessKey = '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';
        // AWS.config.accessKeyId = 'AKIAIPQAVOWPUIP2ENSA';
        // AWS.config.secretAccessKey = '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';
        var s3 = new __WEBPACK_IMPORTED_MODULE_9_aws_sdk_clients_s3___default.a({
            region: 'us-east-2',
            apiVersion: '2006-03-01',
            params: { Bucket: 'wtcb' }
        });
        // let bucket = new S3({params: {Bucket: 'YOUR-BUCKET-NAME'}});
        // let params = {BucketName: 'YOUR-BUCKET-NAME', Key: this.file.name, Body: this.file};
        var params = { Bucket: 'wtcb', Key: this.filename, Body: this.file, ContentType: this.file.type, ACL: 'public-read', ServerSideEncrytion: 'AES256' };
        console.log("params", params);
        var that = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        s3.upload(params, function (err, data) {
            loading.dismiss();
            console.log("data: " + JSON.stringify(data) + "err: " + JSON.stringify(err));
            if (data) {
                var image_url = 'https://s3-us-east-2.amazonaws.com/wtcb/' + that.filename;
                that.otrsRequest.photos.push(image_url);
            }
        });
    };
    OtrsRequestPage.prototype.addPhoto = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Take Photo',
                    handler: function () {
                        var options = {
                            quality: 100,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            sourceType: _this.camera.PictureSourceType.CAMERA,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            // imageData is either a base64 encoded string or a file URI
                            // If it's base64:
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            _this.otrsRequest.photos.push(base64Image);
                        }, function (err) {
                            // Handle error
                        });
                    }
                },
                {
                    text: 'Choose Photo',
                    handler: function () {
                        var options = {
                            quality: 100,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            // imageData is either a base64 encoded string or a file URI
                            // If it's base64:
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            _this.otrsRequest.photos.push(base64Image);
                        }, function (err) {
                            // Handle error
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    OtrsRequestPage.prototype.createNewRequest = function () {
        var _this = this;
        this.otrsRequest.userKey = this.userKey;
        this.otrsRequest.officeKey = this.officeKey;
        this.otrsRequest.token = this.token;
        this.otrsRequest.officeName = this.office.name;
        this.otrsRequest.created_at = new Date();
        this.otrsRequest.buildingName = this.building_name;
        this.otrsRequest.floorName = this.floor_name;
        console.log("this.otrsRequest", this.otrsRequest);
        if (this.create_or_update == false) {
            var loading_2 = this.loadingCtrl.create();
            loading_2.present();
            this.userService.createRequest(this.otrsRequest)
                .subscribe(function (data) {
                loading_2.dismiss();
                console.log("requestdata", data);
                if (data.message == "Success") {
                    var requestKey = data.data._id;
                    console.log("keys", _this.userKey, _this.officeKey, requestKey);
                    _this.pushService.notiBuildingManagerForRequest(requestKey, "Start with eclamation!", _this.token);
                    // this.pushService.notiBuildingManagerForRequest(requestKey, "New request is created!", this.token);
                    var newSteps = {
                        token: _this.token,
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
                        updated_at5: _this.otrsRequest.created_at
                    };
                    _this.userService.createStep(newSteps)
                        .subscribe(function (data1) {
                        var alert = _this.alertCtrl.create({
                            title: "Genial", subTitle: "Su solicitud ha sido enviada exitosamente.", buttons: ['OK']
                        });
                        alert.present();
                        _this.navCtrl.pop();
                    }, function (data1) {
                    });
                }
            }, function (data) {
                loading_2.dismiss();
            });
        }
        else if (this.create_or_update == true) {
            var loading_3 = this.loadingCtrl.create();
            loading_3.present();
            //console.log("qqqqqqqqqqqqqqq", this.otrRequest);
            this.userService.updateRequest(this.otrsRequest._id, this.otrsRequest)
                .subscribe(function (data) {
                loading_3.dismiss();
                var alert = _this.alertCtrl.create({
                    title: "Success", subTitle: "Request is updated successfully!", buttons: ['OK']
                });
                alert.present();
                _this.navCtrl.pop();
            }, function (data) {
                loading_3.dismiss();
            });
        }
    };
    return OtrsRequestPage;
}());
OtrsRequestPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-otrs-request',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/otrs-request/otrs-request.html"*/'<!--\n  Generated template for the OtrsRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>NUEVA SOLICITUD</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header class="header-style">\n            <!-- DESCRIBA SU SOLICITUD -->\n            REQUERIMIENTO\n        </ion-list-header>\n\n        <ion-item>\n            \n            <textarea placeholder="DESCRIPCIÓN" class="textarea-style" [(ngModel)]="otrsRequest.comment"></textarea>\n            \n        </ion-item>\n\n        <ion-item>\n            <ion-toggle color="custom" [(ngModel)]="otrsRequest.is_urgent"></ion-toggle>\n            <ion-label style="color: gray;">\n                URGENTE (SUJETO T&C)\n            </ion-label>\n        </ion-item>\n    </ion-list>\n\n    <input type="file" name="file" id="file" class="inputfile" (change)="fileEvent($event)"/>\n    <label for="file" ion-button block class="main-btn">Cargar Foto</label>\n    <!-- <button ion-button icon-left block (click)="addPhoto()">\n        <ion-icon ios="ios-camera" md="md-camera"></ion-icon>\n        CARGAR FOTO \n    </button> -->\n\n    <ion-row *ngIf="otrsRequest.photos.length > 0">\n        <ion-col col-3 *ngFor="let item of otrsRequest.photos; let i = index;">\n            <img src="{{item}}"/>\n        </ion-col>\n    </ion-row>\n\n    <ion-list style="margin-top: 30px;">\n        <!-- <ion-list-header>\n            INFORMACIÓN CLIENTE\n        </ion-list-header> -->\n        \n        <ion-avatar class="client-avatar">\n            <img src="assets/imgs/ticket.jpeg">\n        </ion-avatar>\n        \n        <h2 class="header-style" style="text-align: center;">{{office.company}}</h2>\n        <p style="text-align:center; font-size: 15px; color:gray;">{{office.name}}</p>\n        <h2 class="header-style" style="text-align: center; opacity: 0.7; margin-top: 8vw;">{{building_name}} - {{floor_name}}</h2>\n        \n        <!-- <ion-item>\n            <ion-label fixed>Office #</ion-label>\n            <ion-note item-end>{{office._id}}</ion-note>\n        </ion-item> -->\n    </ion-list>\n\n    <button class="main-btn" ion-button block (click)="createNewRequest()">ENVIAR NUEVA SOLICITUD</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/otrs-request/otrs-request.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_push_service__["a" /* PushServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_6__providers_building__["a" /* BuildingProvider */]])
], OtrsRequestPage);

//# sourceMappingURL=otrs-request.js.map

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceTrackerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_push_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__popup_popup__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__otrs_request_otrs_request__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the MaintenanceTrackerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MaintenanceTrackerPage = (function () {
    function MaintenanceTrackerPage(navCtrl, navParams, loadingCtrl, buildingService, pushService, userService, storage, emailComposer, datePicker, iab, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.buildingService = buildingService;
        this.pushService = pushService;
        this.userService = userService;
        this.storage = storage;
        this.emailComposer = emailComposer;
        this.datePicker = datePicker;
        this.iab = iab;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.quote = { date: '', time: '', comment: '', company: '', name: '', phone: '' };
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.requestKey = this.navParams.get('requestKey');
        this.request = {};
        this.requestDetail = {
            token: '',
            status1: 0,
            quote: {
                date: '',
                time: '',
                name: '',
                company: '',
                phone: '',
                comment: ''
            },
            updated_at1: '',
            statue1_5: 0,
            status2: 0,
            technician_info: {
                date: '',
                time: '',
                name: '',
                company: '',
                phone: ''
            },
            updated_at2: '',
            status3: 0,
            is_completed: false,
            updated_at3: '',
            is_paid: false,
            status4: 0,
            updated_at4: '',
            star: '',
            comment: '',
            status5: 0,
            updated_at5: ''
        };
        this.office = {};
        this.user = {};
        this.authUser = {
            level: 4
        };
        this.viewRequest = false;
        this.requestDetailKey = '';
        //step1
        this.showQuote = true;
        this.scheduleAccept1 = false;
        //step2
        this.quoteAccept = false;
        this.showSchedule = false;
        this.technician_date = '';
        this.technician_time = '';
        this.technician_name = '';
        this.technician_company = '';
        this.technician_phone = '';
        //step 3
        this.scheduleAccept = false;
        this.is_completed = false;
        //step 4
        this.is_paid = false;
        //step 5
        this.showInvoice = false;
        this.rate = 5;
        this.comment = '';
    }
    MaintenanceTrackerPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.authUser = val.user;
                _this.token = val.token;
                var loading_1 = _this.loadingCtrl.create();
                loading_1.present();
                _this.userService.getRequestsById(_this.requestKey, _this.token)
                    .subscribe(function (data) {
                    loading_1.dismiss();
                    // let steps = [
                    //   {
                    //       current: 'Received',
                    //       next: 'SEND QUOTE'
                    //   }, {
                    //       current: 'Quote',
                    //       next: 'TECHNICIAN'
                    //   }, {
                    //       current: 'Tech',
                    //       next: 'COMPLETED'
                    //   }, {
                    //       current: 'Completed',
                    //       next: 'INVOICE'
                    //   }, {
                    //       current: 'Paid',
                    //       next: 'CLOSE'
                    //   }, {
                    //       current: 'Closed',
                    //       next: ''
                    //   }
                    //  ];
                    _this.request = data[0];
                    if (_this.request.step == 1 || _this.request.step == 1.5) {
                        _this.show1 = true;
                        _this.show2 = false;
                        _this.show3 = false;
                        _this.show4 = false;
                        _this.show5 = false;
                    }
                    else if (_this.request.step == 2) {
                        _this.show1 = false;
                        _this.show2 = true;
                        _this.show3 = false;
                        _this.show4 = false;
                        _this.show5 = false;
                    }
                    else if (_this.request.step == 3) {
                        _this.show1 = false;
                        _this.show2 = false;
                        _this.show3 = true;
                        _this.show4 = false;
                        _this.show5 = false;
                    }
                    else if (_this.request.step == 4) {
                        _this.show1 = false;
                        _this.show2 = false;
                        _this.show3 = false;
                        _this.show4 = true;
                        _this.show5 = false;
                    }
                    else if (_this.request.step == 5) {
                        _this.show1 = false;
                        _this.show2 = false;
                        _this.show3 = false;
                        _this.show4 = false;
                        _this.show5 = true;
                    }
                    console.log("this.request", _this.request);
                    _this.request.stepText = 'Step ' + _this.request.step;
                    // if (this.authUser['level'] != 4) {
                    //     this.request.stepText += ' - ' + steps[this.request.step - 1].current;
                    //     this.request.stepNext = steps[this.request.step - 1].next;
                    // }
                    _this.loadStepDetail();
                    _this.loadUser();
                    _this.loadOffice();
                }, function (data) {
                    loading_1.dismiss();
                });
            }
        });
    };
    MaintenanceTrackerPage.prototype.ionViewDidLoad = function () {
        //        //console.log('ionViewDidLoad MaintenanceTrackerPage');
    };
    MaintenanceTrackerPage.prototype.onShow1 = function () {
        this.show1 = !this.show1;
    };
    MaintenanceTrackerPage.prototype.onShow2 = function () {
        this.show2 = !this.show2;
    };
    MaintenanceTrackerPage.prototype.onShow3 = function () {
        this.show3 = !this.show3;
    };
    MaintenanceTrackerPage.prototype.onShow4 = function () {
        this.show4 = !this.show4;
    };
    MaintenanceTrackerPage.prototype.onShow5 = function () {
        this.show5 = !this.show5;
    };
    MaintenanceTrackerPage.prototype.loadStepDetail = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getStepById(this.requestKey, this.token)
            .subscribe(function (data) {
            loading.dismiss();
            _this.requestDetailKey = data._id;
            _this.requestDetail = data;
            if (_this.requestDetail['status1'] == 1) {
                _this.quoteAccept = true;
            }
            if (_this.requestDetail['status1'] == 2) {
                _this.quoteDeny = true;
            }
            if (_this.requestDetail['status1_5'] == 1) {
                _this.scheduleAccept1 = true;
            }
            if (_this.requestDetail['status2'] == 1) {
                _this.scheduleAccept = true;
            }
            if (_this.requestDetail['status3'] == 1) {
                _this.is_paid = true;
            }
        }, function (data) {
            loading.dismiss();
        });
    };
    MaintenanceTrackerPage.prototype.loadUser = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getUserById(this.request['userKey'])
            .subscribe(function (data) {
            loading.dismiss();
            _this.user = data;
        }, function (data) {
            loading.dismiss();
        });
    };
    MaintenanceTrackerPage.prototype.loadOffice = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getOfficesById(this.request['officeKey'], this.token)
            .subscribe(function (data) {
            loading.dismiss();
            _this.office = data[0];
            var buildings = _this.buildingService.list();
            for (var i = 0; i < buildings.length; i++) {
                if (buildings[i].id == _this.office.buildingId) {
                    _this.office.buildingName = buildings[i].name;
                    for (var j = 0; j < buildings[i].floors.length; j++) {
                        if (_this.office.floorId == buildings[i].floors[j].id) {
                            _this.office.floorName = buildings[i].floors[j].name;
                        }
                    }
                }
            }
        }, function (data) {
            loading.dismiss();
        });
    };
    MaintenanceTrackerPage.prototype.goToStep1_5 = function () {
        var _this = this;
        if (this.quote.company == '' || this.quote.date == '' || this.quote.name == '' ||
            this.quote.phone == '' || this.quote.time == '') {
            var alert_1 = this.alertCtrl.create({
                title: "Error", subTitle: "Please fill in the blanks", buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this.requestDetail.token = this.token;
            this.requestDetail.quote = this.quote;
            this.requestDetail.step = 1.5;
            this.requestDetail.updated_at1 = new Date();
            var loading_2 = this.loadingCtrl.create();
            loading_2.present();
            this.userService.updateStep(this.requestDetailKey, this.requestDetail)
                .subscribe(function (data1) {
                var params = {
                    token: _this.token,
                    step: 1.5
                };
                _this.userService.updateRequest(_this.requestKey, params)
                    .subscribe(function (data) {
                    loading_2.dismiss();
                    _this.request.step = 1.5;
                    var alert = _this.alertCtrl.create({
                        title: "", subTitle: "Enviaste el tiempo de visita con éxito.", buttons: ['OK']
                    });
                    alert.present();
                }, function (data) {
                    loading_2.dismiss();
                });
            }, function (data1) {
                loading_2.dismiss();
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaa", this.request._id);
            // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager scheduled the time of first meeting for quote.", this.token);
            this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "EG ha programado una visita inicial para hacerle una cotización.", this.token);
        }
    };
    MaintenanceTrackerPage.prototype.acceptSchedule1 = function () {
        var _this = this;
        this.requestDetail.status1_5 = 1;
        this.requestDetail.token = this.token;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            loading.dismiss();
            _this.scheduleAccept1 = true;
        }, function (data1) {
            loading.dismiss();
            _this.scheduleAccept1 = false;
        });
        this.pushService.notiBuildingManagerForRequest(this.request._id, "El cliente aceptó la visita programada.", this.token);
        // this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your schedule", this.token);
    };
    MaintenanceTrackerPage.prototype.goToStep2 = function () {
        var _this = this;
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        var email = {
            to: this.user.email,
            //cc: 'erika@mustermann.de',
            //bcc: ['john@doe.com', 'jane@doe.com'],
            // attachments: [
            //   'file://img/logo.png',
            //   'res://icon.png',
            //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
            //   'file://README.pdf'
            // ],
            subject: 'Attached Quote',
            body: "<p>Asunto: Cotización solicitud</p><br/><p>Buen día,</p><br/><p>Muy atentamente adjuntamos la cotización a su solicitud de mantenimiento.</p><br/><p>Si esta de acuerdo por favor acepte la cotización desde la aplicación o haciendo click  en este link: www.xxxxx.co/urlxxxxx</p><br/><p>Reciba un cordial saludo,</p><br/><p>Mantenimiento EG Colombia</p><br /><p>PBX: +(57) 1 6420092</p>",
            isHtml: true
        };
        // Send a text message using default options
        this.emailComposer.open(email);
        this.requestDetail.token = this.token;
        this.requestDetail.quote = this.quote;
        this.requestDetail.step = 2;
        var loading = this.loadingCtrl.create();
        loading.present();
        console.log("this.requestDeatialasdfadsfadsfa", this.requestDetailKey);
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            var params = {
                token: _this.token,
                step: 2
            };
            _this.userService.updateRequest(_this.requestKey, params)
                .subscribe(function (data) {
                loading.dismiss();
                _this.request.step = 2;
            }, function (data) {
                loading.dismiss();
            });
        }, function (data1) {
            loading.dismiss();
        });
        console.log("aaaaaaaaaaaaaaaaaaaaaa", this.request._id);
        // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager scheduled the time of first meeting for quote.", this.token);
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "EG ha programado una visita inicial para hacerle una cotización.", this.token);
    };
    MaintenanceTrackerPage.prototype.acceptQuote = function () {
        var _this = this;
        this.requestDetail.status1 = 1;
        this.requestDetail.token = this.token;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            loading.dismiss();
            _this.quoteAccept = true;
        }, function (data1) {
            loading.dismiss();
            _this.quoteAccept = false;
        });
        this.pushService.notiBuildingManagerForRequest(this.request._id, "El cliente aceptó la cotización.", this.token);
        // this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your quote", this.token);
    };
    MaintenanceTrackerPage.prototype.denyQuote1 = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__popup_popup__["a" /* PopupPage */]);
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.requestDetail.status1 = 2;
            _this.requestDetail.quote.comment = data.comment;
            _this.requestDetail.token = _this.token;
            var loading = _this.loadingCtrl.create();
            loading.present();
            _this.userService.updateStep(_this.requestDetailKey, _this.requestDetail)
                .subscribe(function (data1) {
                loading.dismiss();
                _this.quoteDeny = true;
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__otrs_request_otrs_request__["a" /* OtrsRequestPage */]);
            }, function (data1) {
                loading.dismiss();
                _this.quoteDeny = false;
            });
            _this.pushService.notiBuildingManagerForRequest(_this.request._id, "El cliente rechazo la cotización.", _this.token);
            // this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee denied your quote", this.token);
        });
    };
    MaintenanceTrackerPage.prototype.denyQuote = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: '¿Esta seguro que desea cancelar su ticket?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function () {
                        _this.denyQuote1();
                    }
                }
            ]
        });
        alert.present();
    };
    MaintenanceTrackerPage.prototype.goToStep3 = function () {
        // let appointment_date;
        // this.datePicker.show({
        //   date: new Date(),
        //   mode: 'datetime',
        //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        // }).then(
        //   (date) => {
        //     console.log("appointment_date", date + "asdaf");
        var _this = this;
        //   },
        //   (err) => {
        //     console.log('Error occurred while getting date: ', err);
        //   }
        // );
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        this.show4 = false;
        this.show5 = false;
        this.requestDetail.token = this.token;
        this.requestDetail.step = 3;
        this.requestDetail.technician_info = {
            company: this.technician_company,
            date: this.technician_date,
            name: this.technician_name,
            phone: this.technician_phone,
            time: this.technician_time
        };
        console.log("this.requestDetail.technician_info", this.requestDetail.technician_info);
        if (this.requestDetail.technician_info.company == '' || this.requestDetail.technician_info.date == '' || this.requestDetail.technician_info.name == '' ||
            this.requestDetail.technician_info.phone == '' || this.requestDetail.technician_info.time == '') {
            var alert_2 = this.alertCtrl.create({
                title: "Error", subTitle: "Please fill in the blanks", buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            this.requestDetail.step = 3;
            var loading_3 = this.loadingCtrl.create();
            loading_3.present();
            this.userService.updateStep(this.requestDetailKey, this.requestDetail)
                .subscribe(function (data1) {
                var params = {
                    token: _this.token,
                    step: 3
                };
                _this.userService.updateRequest(_this.requestKey, params)
                    .subscribe(function (data) {
                    loading_3.dismiss();
                    _this.request.step = 3;
                    _this.pushService.notiUserForRequest(_this.request.userKey, _this.request._id, "EG programó la visita del técnico para el día y hora a continuación: " + _this.technician_date + " " + _this.technician_time, _this.token);
                    // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager scheduled technician time to " + this.technician_date + " " + this.technician_time, this.token);
                }, function (data) {
                    loading_3.dismiss();
                });
            }, function (data1) {
                loading_3.dismiss();
            });
        }
    };
    MaintenanceTrackerPage.prototype.acceptSchedule = function () {
        var _this = this;
        this.requestDetail.status2 = 1;
        this.requestDetail.token = this.token;
        this.requestDetail.updated_at2 = new Date();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            loading.dismiss();
            _this.scheduleAccept = true;
        }, function (data1) {
            loading.dismiss();
            _this.scheduleAccept = false;
        });
        this.pushService.notiBuildingManagerForRequest(this.request._id, "El cliente aceptó la visita programada.", this.token);
        // this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your schedule", this.token);
    };
    MaintenanceTrackerPage.prototype.goToStep4 = function () {
        var _this = this;
        // let appointment_date;
        // this.datePicker.show({
        //   date: new Date(),
        //   mode: 'datetime',
        //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        // }).then(
        //   date => console.log('Got date: ', date),
        //   err => console.log('Error occurred while getting date: ', err)
        // );
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
        this.show5 = false;
        this.requestDetail.token = this.token;
        this.requestDetail.step = 4;
        this.requestDetail.token = this.token;
        this.requestDetail.is_completed = true;
        this.requestDetail.step = 4;
        this.requestDetail.updated_at3 = new Date();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            var params = {
                token: _this.token,
                step: 4
            };
            _this.userService.updateRequest(_this.requestKey, params)
                .subscribe(function (data) {
                loading.dismiss();
                _this.request.step = 4;
            }, function (data) {
                loading.dismiss();
            });
        }, function (data1) {
            loading.dismiss();
        });
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "EG ha finalizado los trabajos. Su factura està disponible para pago.", this.token);
        // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager completed your request", this.token);
    };
    MaintenanceTrackerPage.prototype.payInvoice = function () {
        var _this = this;
        this.requestDetail.status3 = 1;
        this.requestDetail.token = this.token;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            loading.dismiss();
            _this.is_paid = true;
        }, function (data1) {
            loading.dismiss();
            _this.is_paid = false;
        });
        this.pushService.notiBuildingManagerForRequest(this.request._id, "El cliente pagó su factura", this.token);
        // this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee paid to your invoice", this.token);
        this.iab.create('https://www.pse.com.co/inicio');
        //         let step = this.db.object('/maintenance_steps/'+this.requestDetailKey+'/3');
        //         let actionSheet = this.actionSheetCtrl.create({
        //             buttons: [
        //                 {
        //                     text: 'Take Photo',
        //                     handler: () => {
        //                         Camera.getPicture({
        //                             destinationType: Camera.DestinationType.DATA_URL,
        //                             sourceType: Camera.PictureSourceType.CAMERA,
        //                             allowEdit: true,
        //                             encodingType: Camera.EncodingType.JPEG,
        //                             saveToPhotoAlbum: false
        //                         }).then((imageData) => {
        //                             let imgData = "data:image/jpeg;base64," + imageData;
        //                             step.update({
        //                                 status: 1,
        //                                 invoice: imgData
        //                             });
        //                             this.pushService.notiBuildingManagerForRequest(this.request.$id, "Employee paid to your invoice");
        //                         }, (err) => {
        //                         })
        //                     }
        //                 },
        //                 {
        //                     text: 'Choose Photo',
        //                     handler: () => {
        //                         Camera.getPicture({
        //                             destinationType: Camera.DestinationType.DATA_URL,
        //                             sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        //                             allowEdit: true,
        //                             encodingType: Camera.EncodingType.JPEG,
        //                             saveToPhotoAlbum: false
        //                         }).then((imageData) => {
        //                             let imgData = "data:image/jpeg;base64," + imageData;
        // //                            //console.log(imgData);
        //                             step.update({
        //                                 status: 1,
        //                                 invoice: imgData
        //                             });
        //                             this.pushService.notiBuildingManagerForRequest(this.request.$id, "Employee paid to your invoice");
        //                         }, (err) => {
        // //                            //console.log(err);
        //                         })
        //                     }
        //                 },
        //                 {
        //                     text: 'Cancel',
        //                     role: 'cancel',
        //                     handler:() => {
        // //                        //console.log('Cancel clicked');
        //                     }
        //                 }
        //             ]
        //         });
        //         actionSheet.present();
    };
    MaintenanceTrackerPage.prototype.paidInvoice = function () {
        var _this = this;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = true;
        this.requestDetail.token = this.token;
        this.requestDetail.is_paid = true;
        this.requestDetail.updated_at4 = new Date();
        this.requestDetail.step = 5;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            var params = {
                token: _this.token,
                step: 5
            };
            _this.userService.updateRequest(_this.requestKey, params)
                .subscribe(function (data) {
                loading.dismiss();
                _this.request.step = 5;
            }, function (data) {
                loading.dismiss();
            });
        }, function (data1) {
            loading.dismiss();
        });
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "EG recibió su pago", this.token);
        // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager accepted your payment", this.token);
    };
    MaintenanceTrackerPage.prototype.viewInvoice = function () {
        this.showInvoice = !this.showInvoice;
    };
    MaintenanceTrackerPage.prototype.leaveReview = function () {
        this.show5 = false;
        this.requestDetail.token = this.token;
        this.requestDetail.star = this.rate;
        this.requestDetail.comment = this.comment;
        this.requestDetail.status5 = 1;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.updateStep(this.requestDetailKey, this.requestDetail)
            .subscribe(function (data1) {
            loading.dismiss();
        }, function (data1) {
            loading.dismiss();
        });
        this.pushService.notiBuildingManagerForRequest(this.request._id, "El cliente ha calificado el servicio", this.token);
        // this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee provided feedback", this.token);
    };
    MaintenanceTrackerPage.prototype.archiveRequest = function () {
        var _this = this;
        this.show5 = false;
        var loading = this.loadingCtrl.create();
        loading.present();
        var params = {
            token: this.token,
            step: 6
        };
        this.requestDetail.token = this.token;
        this.requestDetail.step = 6;
        this.userService.updateRequest(this.requestKey, params)
            .subscribe(function (data) {
            loading.dismiss();
            _this.request.step = 6;
            _this.userService.updateStep(_this.requestDetailKey, _this.requestDetail)
                .subscribe(function (data1) {
                //this.request.step = 6;
            }, function (data1) {
            });
        }, function (data) {
            loading.dismiss();
        });
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "EG ha archivado su solicitud", this.token);
        // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager archived your request", this.token);
    };
    return MaintenanceTrackerPage;
}());
MaintenanceTrackerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-maintenance-tracker',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-tracker/maintenance-tracker.html"*/'<!--\n  Generated template for the MaintenanceTrackerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Estado de su Solicitud</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-list>\n        <ion-list-header class="header-style">\n            FASE\n        </ion-list-header>\n    </ion-list>\n\n    <div class="wrapper">\n        <ul class="StepProgress">\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 1, \'current\': request.step == 1}">\n\n                <strong class="subheader-style" (click)="onShow1()">FASE 1 - Solicitud</strong>\n\n                <div *ngIf="show1">\n                    <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && request.step == 1">\n                        <ion-item>\n                            <ion-toggle color="custom" checked="true" disabled="true"></ion-toggle>\n                            <ion-label class="icon-style">\n                                Su cotización ha sido enviada\n                            </ion-label>\n                        </ion-item>\n                    </ion-list>\n\n                    <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >= 1 && !scheduleAccept1">\n                        <h2 class="header-style" style="text-align: center;">Visita Técnica</h2>\n\n                        <ion-item>\n                            <ion-label>Fecha</ion-label>\n                            <ion-datetime placeholder="Seleccione una fecha." displayFormat="MMM DD YYYY" [(ngModel)]="quote.date"></ion-datetime>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Hora</ion-label>\n                            <ion-datetime placeholder="Seleccione una hora." displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="quote.time"></ion-datetime>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del técnico</ion-label>\n                            <ion-input type="text" [(ngModel)]="quote.name"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del cliente</ion-label>\n                            <ion-input type="text" [(ngModel)]="quote.company"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Teléfono</ion-label>\n                            <ion-input type="text" [(ngModel)]="quote.phone"></ion-input>\n                        </ion-item>\n                    </ion-list>\n                    <button ion-button block (click)="goToStep1_5()" class="main-btn" style="margin-top:2vw;" *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >= 1 && !scheduleAccept1">\n                        Programar Visita\n                    </button>\n\n                    <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && request.step == 1.5">\n                        <h2 class="header-style" style="text-align: center;">Técnico</h2>\n\n                        <ion-item>\n                            <ion-label>Fecha</ion-label>\n                            <ion-input type="text" [readonly]="true" [(ngModel)]="requestDetail.quote.date"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Hora</ion-label>\n                            <ion-input type="text" [readonly]="true" [(ngModel)]="requestDetail.quote.time"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del técnico</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.quote.name"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del cliente</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.quote.company"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Teléfono</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.quote.phone"></ion-input>\n                        </ion-item>\n                    </ion-list>\n\n                    <button ion-button block (click)="acceptSchedule1()" class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 1.5 && (authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && !scheduleAccept1">\n                        Teléfono del técnico\n                    </button>\n\n                    <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8) && (request.step >= 1.5) && scheduleAccept1">\n                        <ion-item>\n                            <ion-toggle color="custom" [(ngModel)]="showQuote"></ion-toggle>\n                            <ion-label>\n                                Cargar Cotización\n                            </ion-label>\n                        </ion-item>\n                        <ion-item *ngIf="showQuote">\n                            <div>\n                                <textarea placeholder="Sus comentarios" class="textarea-style" [(ngModel)]="quote.comment"></textarea>\n                            </div>\n\n                        </ion-item>\n\n                    </ion-list>\n                    \n\n                    <button ion-button block (click)="goToStep2()" class="main-btn" style="margin-top:2vw;" *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >= 1.5 && scheduleAccept1">\n                        Enviar Cotización\n                    </button>\n                </div>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 2, \'current\': request.step == 2}">\n                <strong class="subheader-style" (click)="onShow2()">FASE 2 - Cotización</strong>\n                \n                <div *ngIf="show2">\n                    <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && request.step == 2">\n                        \n                        \n                        <ion-item>\n                            <div>\n                                <textarea placeholder="Your comments" class="textarea-style" [readonly]="true" [(ngModel)]="requestDetail.quote.comment"></textarea>\n                            </div>\n\n                        </ion-item>\n\n                        \n\n                        <p class="icon-style" style="word-wrap: break-word;">Usted va a recibir un correo electrónico con su cotización.  Por favor revise su correo.</p>\n                        \n                        <p class="icon-style" *ngIf = "quoteAccept" style="word-wrap: break-word;">Cotización Aceptada.</p>\n                        \n                    </ion-list>\n\n                    <button ion-button block (click)="acceptQuote()" class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 2 && (authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && (!quoteAccept && !quoteDeny)">\n                        Aceptar Cotización\n                    </button>\n                    <button ion-button block (click)="denyQuote()" class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 2 && (authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && (!quoteAccept && !quoteDeny)">\n                        Rechazar Cotización\n                    </button>\n                \n                    <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >= 2">\n                        \n                        <ion-item *ngIf="!quoteAccept && !quoteDeny">\n                            <ion-toggle color="custom" [(ngModel)]="quoteAccept" disabled="true"></ion-toggle>\n                            <ion-label>\n                                Cotización Aceptada\n                            </ion-label>\n                        </ion-item>\n\n                        <ion-item *ngIf="quoteAccept">\n                            <ion-toggle color="custom" [(ngModel)]="quoteAccept" disabled="true"></ion-toggle>\n                            <ion-label>\n                                Cotización Aceptada\n                            </ion-label>\n                        </ion-item>\n\n                        <ion-item *ngIf="quoteDeny">\n                            <ion-toggle color="custom" [(ngModel)]="quoteDeny" disabled="true"></ion-toggle>\n                            <ion-label>\n                                Cotización Rechazada\n                            </ion-label>\n                        </ion-item>\n\n                        <ion-item *ngIf="quoteDeny">\n                            <div>\n                                <textarea class="textarea-style" [(ngModel)]="requestDetail.quote.comment" [readonly]="true"></textarea>\n                            </div>\n\n                        </ion-item>\n\n                        <ion-item *ngIf="quoteAccept">\n                            <ion-toggle color="custom" [(ngModel)]="showSchedule"></ion-toggle>\n                            <ion-label>\n                                Programar visita\n                            </ion-label>\n                        </ion-item>\n                    </ion-list>\n\n                    <ion-list no-lines *ngIf="showSchedule">\n                        <ion-item>\n                            <ion-label>Fecha</ion-label>\n                            <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="technician_date"></ion-datetime>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Hora</ion-label>\n                            <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="technician_time"></ion-datetime>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del técnico</ion-label>\n                            <ion-input type="text" [(ngModel)]="technician_name"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del cliente</ion-label>\n                            <ion-input type="text" [(ngModel)]="technician_company"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Teléfono</ion-label>\n                            <ion-input type="text" [(ngModel)]="technician_phone"></ion-input>\n                        </ion-item>\n                    </ion-list>\n\n                    <button ion-button block class="main-btn" style="margin-top:2vw;" (click)="goToStep3()"\n                            *ngIf="(authUser.level == 7 || authUser.level == 8) && quoteAccept">\n                        Programar Visita\n                    </button>\n                </div>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 3, \'current\': request.step == 3}">\n                <strong class="subheader-style" (click)="onShow3()">FASE 3 - Inicio & Finalización trabajo</strong>\n\n                <div *ngIf="show3">\n                    <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && request.step == 3">\n                        <!-- <ion-item>\n                            <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                            -\n                            <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                        </ion-item> -->\n                        <ion-item>\n                            <ion-label>Fecha</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.technician_info.date" [readonly]="true"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Hora</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.technician_info.time" [readonly]="true"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del técnico</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.technician_info.name" [readonly]="true"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Nombre del cliente</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.technician_info.company" [readonly]="true"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>Teléfono</ion-label>\n                            <ion-input type="text" [(ngModel)]="requestDetail.technician_info.phone" [readonly]="true"></ion-input>\n                        </ion-item>\n\n                        <p class="icon-style" *ngIf = "scheduleAccept" style="word-wrap: break-word;">Schedule Accepted</p>\n                        <!-- <ion-item>\n                            <ion-toggle [(ngModel)]="scheduleAccept"></ion-toggle>\n                            <ion-label>\n                                Accept Schedule\n                            </ion-label>\n                        </ion-item> -->\n                    </ion-list>\n\n                    <button ion-button block (click)="acceptSchedule()" class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 3 && (authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && !scheduleAccept">\n                        Teléfono del técnico\n                    </button>\n\n                    <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >=3">\n                        <!-- <ion-item>\n                            <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                            -\n                            <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                        </ion-item> -->\n                        \n                        <ion-item>\n                            <ion-toggle color="custom" [(ngModel)]="scheduleAccept" disabled="true"></ion-toggle>\n                            <ion-label>\n                                Programación Aceptada\n                            </ion-label>\n                        </ion-item>\n                        <!-- <ion-item *ngIf="scheduleAccept">\n                            <ion-label>Job Complete</ion-label>\n                            <ion-toggle color="custom" [(ngModel)]="is_completed"></ion-toggle>\n                        </ion-item> -->\n                    </ion-list>\n\n                    <button ion-button block class="main-btn" (click)="goToStep4()"\n                            *ngIf="(authUser.level == 7 || authUser.level == 8) && scheduleAccept">\n                        Trabajo Finalizado\n                    </button>\n                </div>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 4, \'current\': request.step == 4}">\n                <strong class="subheader-style" (click)="onShow4()">FASE 4 - Facturación</strong>\n\n                <div *ngIf="show4">\n                    <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && request.step == 4">\n                        <!-- <ion-item>\n                            <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                            -\n                            <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                        </ion-item> -->\n                        <ion-item>\n                            <ion-toggle color="custom" [(ngModel)]="requestDetail.is_completed" disabled="true"></ion-toggle>\n                            <ion-label>\n                                Trabajo finalizado\n                            </ion-label>\n                        </ion-item>\n                    </ion-list>\n\n                    <button ion-button block icon-left class="main-btn" *ngIf="request.step == 4 && (authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && !is_paid" (click)="payInvoice()">\n                        <ion-icon ios="ios-card" md="md-card"></ion-icon>\n                        Pago de Factura\n                    </button>\n\n                    <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >= 4">\n                        <!-- <ion-item>\n                            <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                            FECHA DE SOLICITUD\n                            <ion-note item-end>{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n                        </ion-item>\n                        <ion-item>\n                            {{office.buildingName}} | {{office.floorName}} | {{office.name}}\n                        </ion-item> -->\n                        <ion-item>\n                            <ion-icon class="icon-style" ios="ios-calendar" md="md-calendar"></ion-icon>\n                            Factura\n                            <ion-note class="icon-style" *ngIf="!is_paid" item-end>En Espera</ion-note>\n                            <ion-note class="icon-style" *ngIf="is_paid" item-end>Pagado</ion-note>\n                        </ion-item>\n                    </ion-list>\n\n                    <!-- <ion-card *ngIf="requestDetail.status3 && (authUser.level == 7 || authUser.level == 8)  && request.step == 4">\n                        <img src="{{requestDetail.invoice}}"/>\n                    </ion-card> -->\n\n                    <button ion-button block class="main-btn" icon-left *ngIf="is_paid && (authUser.level == 7 || authUser.level == 8)" (click)="paidInvoice()">\n                        <ion-icon ios="ios-card" md="md-card"></ion-icon>\n                        Factura Pagada\n                    </button>\n                </div>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 5, \'current\': request.step == 5}">\n                <strong class="subheader-style" (click)="onShow5()">FASE 5 -  Pago</strong>\n\n                <div *ngIf="show5">\n                    <!-- <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 5">\n                        <ion-item>\n                            <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                            Job Paid\n                            <ion-note item-end (click)="viewInvoice()">View</ion-note>\n                        </ion-item>\n                    </ion-list>\n\n                    <ion-card *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 5 && showInvoice">\n                        <img src="{{requestDetail.invoice}}"/>\n                    </ion-card> -->\n\n                    <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\') && request.step == 5">\n                        <ion-item>\n                            \n                            <rating [(ngModel)]="rate" class="rating"></rating>\n                        </ion-item>\n                        <ion-item>\n                            <div>\n                                <textarea placeholder="Sus comentarios" class="textarea-style" [(ngModel)]="comment"></textarea>\n                            </div>\n                        </ion-item>\n                    </ion-list>\n\n                    <button ion-button block icon-left class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 5 && (authUser.level == \'3.1\' || authUser.level == \'3.2\' || authUser.level == \'3\')" (click)="leaveReview()">\n                        <ion-icon ios="ios-star" md="md-star"></ion-icon>\n                        Por favor calificanos\n                    </button>\n\n\n                    <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8) && request.step >= 5">\n                        <ion-item *ngIf="requestDetail.status5 == 0">\n                            <ion-icon class="icon-style" ios="ios-calendar" md="md-calendar"></ion-icon>\n                            Finalizado\n                            <ion-note class="icon-style" item-end>Evaluación Pendiente</ion-note>\n                        </ion-item>\n                        <ion-item *ngIf="requestDetail.status5 == 1">\n                            \n                            <rating [(ngModel)]="requestDetail.star" readOnly="true" class="rating"></rating>\n                            <!-- <ion-note class="icon-style" item-end>{{requestDetail.star}} stars</ion-note> -->\n                        </ion-item>\n                        <ion-item *ngIf="requestDetail.status5 == 1">\n                            <div>\n                                <textarea class="textarea-style" [(ngModel)]="requestDetail.comment" [readonly]="true"></textarea>\n                            </div>\n                        </ion-item>\n                    </ion-list>\n\n                    <button ion-button block icon-left class="main-btn" *ngIf="requestDetail.status5 == 1 && ((authUser.level == 7 || authUser.level == 8))" (click)="archiveRequest()">\n                        <ion-icon ios="ios-cloud-download" md="md-cloud-download"></ion-icon>\n                        Archivo del Ticket\n                    </button>\n                </div>\n            </li>\n        </ul>\n    </div>\n\n    <ion-list no-lines style="margin-top: 20px;">\n        <ion-list-header class="header-style">\n            Información del Cliente\n        </ion-list-header>\n\n        <ion-avatar class="client-avatar">\n            <img src="assets/imgs/ticket.jpeg">\n        </ion-avatar>\n        <h2 class="header-style" style="text-align: center;">{{requestKey}}</h2>\n        <h2 class="header-style" style="text-align: center;">{{office.company}}</h2>\n        <p style="text-align:center; font-size: 15px; color:gray;">{{office.name}}</p>\n        <h2 class="header-style" style="text-align: center; opacity: 0.7;">{{office.buildingName}} - {{office.floorName}}</h2>\n        <ion-item style="opacity:0.7; text-align: center;">\n            <ion-icon class="icon-style" name="md-calendar"></ion-icon>\n            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n            -\n            <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n            <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n        </ion-item>\n        <!-- <ion-item>\n            <ion-avatar item-start>\n                <img src="assets/imgs/working-icon.png">\n            </ion-avatar>\n            <h2>{{office.company}}</h2>\n            <p>{{office.name}}</p>\n        </ion-item>\n        <ion-item>\n            <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n            FECHA DE SOLICITUD\n            <ion-note item-end *ngIf="authUser.level != 4">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n        </ion-item> -->\n    </ion-list>\n\n    <ion-list no-lines>\n        <ion-list-header class="header-style">\n            Solicitado por\n        </ion-list-header>\n        <!-- <ion-item class="icon-style">\n            <ion-icon  ios="ios-person" md="md-person"></ion-icon>\n            {{user.first_name + \' \' + user.last_name}}\n        </ion-item> -->\n        <h2 class="header-style" style="text-align: center;">{{user.first_name}} {{user.last_name}}</h2>\n        <ion-item>\n            <ion-toggle color="custom" [(ngModel)]="viewRequest"></ion-toggle>\n            <ion-label class="icon-style">\n                Ver Detalles De La Solicitud\n            </ion-label>\n        </ion-item>\n    </ion-list>\n\n    <ion-card *ngIf="viewRequest">\n        <ion-card-content>\n            <p>{{request.comment}}</p>\n        </ion-card-content>\n\n        <ion-slides pager="true" *ngIf="request.photos && request.photos.length > 0">\n            <ion-slide *ngFor="let item of request.photos;">\n                <img src="{{item}}"/>\n            </ion-slide>\n        </ion-slides>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-tracker/maintenance-tracker.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_push_service__["a" /* PushServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__["a" /* DatePicker */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
], MaintenanceTrackerPage);

//# sourceMappingURL=maintenance-tracker.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TechnicianPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__technician_detail_technician_detail__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_push_service__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TechnicianPage = (function () {
    function TechnicianPage(navCtrl, navParams, userService, storage, loadingCtrl, alertCtrl, pushService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.pushService = pushService;
        this.request = {
            officeKey: '',
            _id: ''
        };
        this.request = this.navParams.get('request');
        this.getTechnicians();
    }
    TechnicianPage.prototype.ionViewDidLoad = function () {
    };
    TechnicianPage.prototype.getTechnicians = function () {
        var _this = this;
        this.userService.getUsersByLevel("3.1")
            .subscribe(function (data) {
            console.log("technicians", data);
            _this.technicians1 = data;
        }, function (data) {
        });
        this.userService.getUsersByLevel("3.2")
            .subscribe(function (data) {
            console.log("technicians", data);
            _this.technicians2 = data;
        }, function (data) {
        });
    };
    TechnicianPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.authUser = val.user;
                _this.token = val.token;
            }
        });
    };
    TechnicianPage.prototype.edit = function (item, slidingItem) {
        slidingItem.close();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__technician_detail_technician_detail__["a" /* TechnicianDetailPage */], { tech_data: item });
    };
    TechnicianPage.prototype.delete = function (item) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.deleteUser(item._id)
            .subscribe(function (data) {
            loading.dismiss();
            _this.getTechnicians();
        }, function (data) {
            loading.dismiss();
        });
    };
    TechnicianPage.prototype.selectTech = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "", subTitle: "¿Seguro que quieres compartir el ticket con este técnico?",
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        _this.selectTech1(item);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    TechnicianPage.prototype.selectTech1 = function (item) {
        var _this = this;
        if (this.request) {
            var params = {
                token: this.token,
                officeKey: this.request.officeKey,
                _id: item._id
            };
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            console.log("update user", params);
            this.userService.updateUser(params)
                .subscribe(function (data) {
                console.log("result update user", data);
                loading_1.dismiss();
                var alert = _this.alertCtrl.create({
                    title: "Éxito", subTitle: "El ticket ha sido asignado a este técnico con éxito",
                    buttons: [
                        {
                            text: 'OK',
                            handler: function () {
                                _this.pushService.notiUserForRequest(item._id, _this.request._id, "El administrador del edificio le asignó el boleto.", _this.token);
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert.present();
            }, function (data) {
                //this.navCtrl.setRoot(MaintenanceViewPage);
                loading_1.dismiss();
            });
        }
    };
    return TechnicianPage;
}());
TechnicianPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-technician',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/technician/technician.html"*/'<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n        <ion-title>Técnico</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list style="margin-top: 20px;">\n        <ion-item-sliding *ngFor="let item of technicians1;" #slidingItem (click)="selectTech(item);">\n            <ion-item (click)="selectTech(item);">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/building.jpg">\n                </ion-avatar>\n                <h2>{{item.first_name}} {{item.last_name}}</h2>\n                <p>Email: {{item.email}}</p>\n                <p>Phone: {{item.phone_number}}</p>\n            </ion-item>\n\n            <ion-item-options side="right">\n              <button ion-button (click)="edit(item, slidingItem)">\n                <ion-icon name="ios-create"></ion-icon>\n                Edit\n              </button>\n              <button ion-button color="danger" (click)="delete(item)">\n                <ion-icon name="ios-trash"></ion-icon>\n                Delete\n              </button>\n            </ion-item-options>\n        </ion-item-sliding>\n\n        <ion-item-sliding *ngFor="let item of technicians2;" #slidingItem (click)="selectTech(item);">\n            <ion-item >\n                <ion-avatar item-start>\n                    <img src="assets/imgs/building.jpg">\n                </ion-avatar>\n                <h2>{{item.first_name}} {{item.last_name}}</h2>\n                <p>Email: {{item.email}}</p>\n                <p>Phone: {{item.phone_number}}</p>\n            </ion-item>\n\n            <ion-item-options side="right">\n              <button ion-button (click)="edit(item, slidingItem)">\n                <ion-icon name="ios-create"></ion-icon>\n                Edit\n              </button>\n              <button ion-button color="danger" (click)="delete(item)">\n                <ion-icon name="ios-trash"></ion-icon>\n                Delete\n              </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/technician/technician.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_push_service__["a" /* PushServiceProvider */]])
], TechnicianPage);

//# sourceMappingURL=technician.js.map

/***/ }),

/***/ 247:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 247;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_service__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var UserService = (function () {
    function UserService(http, baseService) {
        this.http = http;
        this.baseService = baseService;
    }
    UserService.prototype.signUp = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseService.signUpUrl, JSON.stringify(user), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error); });
    };
    UserService.prototype.updateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.baseService.signUpUrl + "/" + user._id, JSON.stringify(user), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error); });
    };
    UserService.prototype.deleteUser = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.baseService.deleteUrl + '/' + id, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.login = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseService.loginUrl, JSON.stringify(user), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.createOffice = function (office) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseService.officeUrl, JSON.stringify(office), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getOffices = function (buildingId, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        console.log(this.baseService.officeUrl + "/" + buildingId + "?token=" + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.officeUrl + "/" + buildingId + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getOfficesById = function (id, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        console.log(this.baseService.officeUrl + "/id/" + id + "?token=" + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.officeUrl + "/id/" + id + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getOfficeByEmail = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        console.log(this.baseService.officeUrl + "/by/email?token=" + token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.officeUrl + "/by/email?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getAllOffices = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.officeUrl + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.updateOffice = function (office) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        console.log(this.baseService.officeUrl + "/" + office._id);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.baseService.officeUrl + "/" + office._id, JSON.stringify(office), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.createRequest = function (request) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log(this.baseService.requestUrl, request);
        return this.http.post(this.baseService.requestUrl, JSON.stringify(request), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.createStep = function (step) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseService.stepUrl, JSON.stringify(step), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.updateStep = function (id, step) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.baseService.stepUrl + "/" + id, JSON.stringify(step), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getSteps = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.stepUrl + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getRequestsByOffice = function (officeKey, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.requestUrl + '/officeKey/' + officeKey + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getRequestsByUser = function (userKey, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.requestUrl + '/userKey/' + userKey + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.deleteRequest = function (id, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.baseService.requestUrl + '/' + id + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getAllRequests = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.requestUrl + '/' + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getRequestsById = function (id, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.requestUrl + '/id/' + id + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getStepById = function (id, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.stepUrl + '/' + id + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getUserById = function (userKey) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.getUserUrl + '/' + userKey, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getUsersByLevel = function (level) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.getUserUrl + 'bylevel/' + level, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getUserByEmail = function (email) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.getUserUrl + 'byemail/' + email, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.updateRequest = function (id, request) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.baseService.requestUrl + "/" + id, JSON.stringify(request), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.insertDeviceToken = function (device_token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseService.deviceTokenUrl, JSON.stringify(device_token), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getDeviceById = function (id, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.deviceTokenUrl + '/' + id + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.addNotification = function (notification) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseService.notificationUrl, JSON.stringify(notification), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getNotifications = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.notificationUrl + '?token=' + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.updateNotification = function (id, data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.baseService.notificationUrl + "/" + id, JSON.stringify(data), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.deleteNotification = function (id, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.baseService.notificationUrl + '/' + id + "?token=" + token, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__base_service__["a" /* BaseService */]])
], UserService);

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 290:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 290;

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the BaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var BaseService = (function () {
    function BaseService(http) {
        this.http = http;
        this.baseUrl = "https://polar-scrubland-87428.herokuapp.com/api/";
        this.signUpUrl = this.baseUrl + "signup";
        this.loginUrl = this.baseUrl + "login";
        this.deleteUrl = this.baseUrl + "delete";
        this.officeUrl = this.baseUrl + "office";
        this.requestUrl = this.baseUrl + "request";
        this.stepUrl = this.baseUrl + "step";
        this.getUserUrl = this.baseUrl + "getuser";
        this.deviceTokenUrl = this.baseUrl + "device";
        this.notificationUrl = this.baseUrl + "notification";
        console.log('Hello BaseService Provider');
    }
    return BaseService;
}());
BaseService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], BaseService);

//# sourceMappingURL=base-service.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__create_office_create_office__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the BuildingProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BuildingProfilePage = (function () {
    function BuildingProfilePage(navCtrl, navParams, buildingService, loadingCtrl, storage, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.buildingService = buildingService;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.userService = userService;
        this.buildingId = navParams.get('buildingId');
        this.floorId = navParams.get('floorId');
        var buildings = this.buildingService.list();
        this.building = {
            name: ''
        };
        this.floor = {
            name: ''
        };
        for (var i = 0; i < buildings.length; i++) {
            if (buildings[i].id == this.buildingId) {
                this.building = buildings[i];
                break;
            }
        }
        if (this.floorId) {
            for (var i = 0; i < this.building.floors.length; i++) {
                if (this.building.floors[i].id == this.floorId) {
                    this.floor = this.building.floors[i];
                    break;
                }
            }
        }
        this.offices = [];
    }
    BuildingProfilePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            _this.token = val.token;
            var loading = _this.loadingCtrl.create();
            loading.present();
            _this.userService.getOffices(_this.buildingId, _this.token)
                .subscribe(function (data) {
                loading.dismiss();
                console.log("Getting Offices:", data);
                _this.offices = data;
            }, function (data) {
                loading.dismiss();
            });
        });
    };
    BuildingProfilePage.prototype.ionViewDidLoad = function () {
        //        //console.log('ionViewDidLoad BuildingProfilePage');
    };
    BuildingProfilePage.prototype.viewOffice = function (office) {
    };
    BuildingProfilePage.prototype.editOffice = function (office) {
        // slidingItem.close();
        // this.navCtrl.push('EditOfficePage', {officeId: office.$id});
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__create_office_create_office__["a" /* CreateOfficePage */], { office: office });
    };
    return BuildingProfilePage;
}());
BuildingProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-building-profile',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/building-profile/building-profile.html"*/'<!--\n  Generated template for the BuildingProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{building.name}}{{floorId ? \' - \' + floor.name : \'\'}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <h4>Lista de oficinas</h4>\n    <ion-list>\n        <ion-item-sliding *ngFor="let item of offices" #slidingItem>\n            <ion-item (click)="editOffice(item)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/working-icon.png">\n                </ion-avatar>\n                <h2>{{item.company}}</h2>\n                <div><ion-icon name="contact"></ion-icon><p>{{item.name}}</p></div>\n                <div><ion-icon name="ios-mail"></ion-icon><p>{{item.email}}</p></div>\n                <ion-icon name="ios-arrow-forward-outline" item-end></ion-icon>\n            </ion-item>\n            <ion-item-options>\n                <button ion-button color="primary" (click)="editOffice(item)">Edit</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/building-profile/building-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */]])
], BuildingProfilePage);

//# sourceMappingURL=building-profile.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopupPage = (function () {
    function PopupPage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.data = { comment: '' };
    }
    PopupPage.prototype.sendNewTicket = function () {
        if (this.data.comment != '') {
            this.viewCtrl.dismiss(this.data);
        }
    };
    return PopupPage;
}());
PopupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-popup',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/popup/popup.html"*/'<ion-content class="main-view">\n  <div class="overlay"></div>\n  <div class="modal_content">\n    <h2 class="header-content">Por favor comentenos por que rechazó la cotización.</h2>\n    <textarea class="textarea-style" [(ngModel)]="data.comment"></textarea>\n\n    <button ion-button block class="main-btn" style="margin-top:2vw;" (click)="sendNewTicket();">\n        Enviar\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/popup/popup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
], PopupPage);

//# sourceMappingURL=popup.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TechnicianDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TechnicianDetailPage = (function () {
    function TechnicianDetailPage(navCtrl, navParams, userService, storage, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.technician = this.navParams.get('tech_data');
        console.log("this.technician", this.technician);
    }
    TechnicianDetailPage.prototype.ionViewDidLoad = function () {
    };
    TechnicianDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.authUser = val.user;
                _this.token = val.token;
            }
        });
    };
    TechnicianDetailPage.prototype.update = function () {
        var _this = this;
        var params = {
            token: this.token,
            first_name: this.technician.first_name,
            last_name: this.technician.last_name,
            phone_number: this.technician.phone_number,
            blood_type: this.technician.blood_type,
            company: this.technician.company,
            _id: this.technician._id
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        console.log("update user", params);
        this.userService.updateUser(params)
            .subscribe(function (data) {
            console.log("result update user", data);
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: "Éxito", subTitle: "¡Genial! El perfil se ha guardado con éxito.",
                buttons: [
                    {
                        text: 'OK',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    }
                ]
            });
            alert.present();
        }, function (data) {
            //this.navCtrl.setRoot(MaintenanceViewPage);
            loading.dismiss();
        });
    };
    return TechnicianDetailPage;
}());
TechnicianDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-technician-detail',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/technician-detail/technician-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n        <!-- <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button> -->\n        <ion-title>Técnico</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n   <ion-list>\n    \n        <ion-item>\n            <ion-label fixed>Compañia</ion-label>\n            <ion-input type="text" [(ngModel)]="technician.company"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label fixed>Nombre</ion-label>\n            <ion-input type="text" [(ngModel)]="technician.first_name"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label fixed>Apellido</ion-label>\n            <ion-input type="text" [(ngModel)]="technician.last_name"></ion-input>\n        </ion-item>\n\n       \n        <ion-item>\n            <ion-label fixed>Telefono</ion-label>\n            <ion-input type="text" [(ngModel)]="technician.phone_number"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Email</ion-label>\n            <ion-input type="text" [(ngModel)]="technician.email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Especialidad de Trabajo</ion-label>\n            <ion-input type="text" [(ngModel)]="technician.blood_type"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <button (click)="update()" ion-button class="main-btn">Guardar</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/technician-detail/technician-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], TechnicianDetailPage);

//# sourceMappingURL=technician-detail.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(navCtrl, alertCtrl, loadingCtrl, userService, storage, events, oneSignal) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.storage = storage;
        this.events = events;
        this.oneSignal = oneSignal;
        this.user = {
            email: '',
            password: ''
        };
        this.device_token = "1";
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            _this.events.publish("user:changed");
            console.log("userdata", val);
            if (val != null) {
                if (val.user.level == 7 || val.user.level == 8) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
                }
            }
        });
        this.storage.get('device_token').then(function (val) {
            console.log("device_token", val);
            if (val != null) {
                _this.device_token = val;
            }
        });
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        if (this.user.email == "" || this.user.password == "") {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: 'Ingrese email y contraseńa',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.user.email = this.user.email.toLowerCase();
            this.userService.login(this.user)
                .subscribe(function (data) {
                loading_1.dismiss();
                console.log("login Data:", data);
                if (data.message == 'user logged in!') {
                    _this.storage.set('userdata', data);
                    var count_1 = 0;
                    _this.userService.getNotifications(data.token)
                        .subscribe(function (data2) {
                        for (var i = 0; i < data2.length; i++) {
                            if (data2[i].read == false) {
                                count_1++;
                            }
                        }
                        console.log("notification_login_count", count_1);
                        _this.storage.set("notification_count", count_1);
                        var params = {
                            token: data.token,
                            device_token: _this.device_token
                        };
                        _this.userService.insertDeviceToken(params)
                            .subscribe(function (data1) {
                            console.log("data1-success", data1);
                            if (data.user.level == 7 || data.user.level == 8) {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                            }
                            else {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
                            }
                            _this.events.publish("user:changed");
                        }, function (data1) {
                            console.log("data1-failure", data1);
                            if (data.user.level == 7 || data.user.level == 8) {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                            }
                            else {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
                            }
                            _this.events.publish("user:changed");
                        });
                    }, function (data2) {
                    });
                    if (data.user.level == 7 || data.user.level == 8) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    }
                    else {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
                    }
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: "Error", subTitle: "Credencial Invalida", buttons: ['OK']
                    });
                    alert_2.present();
                }
            }, function (data) {
                loading_1.dismiss();
                console.log("LoginError", data);
                var alert = _this.alertCtrl.create({
                    title: "Error", subTitle: "Login Error", buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    LoginPage.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/login/login.html"*/'<!-- <ion-header>\n\n    <ion-navbar>\n        \n    </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content padding>\n\n    <ion-card style="margin-top: 30vw;">\n\n        <img src="assets/imgs/wtcb.jpg"/>\n\n        <ion-item>\n            <ion-label stacked>Email</ion-label>\n            <ion-input type="text" placeholder="correo@compania.com" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label stacked>Contraseña</ion-label>\n            <ion-input type="password" placeholder="*******" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n        <div style="margin-bottom:20px;"></div>\n    </ion-card>\n\n    <button ion-button clear block class="main-btn" (click)="doLogin()">Entrar</button>\n\n    <button ion-button clear block (click)="signUp()">Crear una cuenta</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__["a" /* OneSignal */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maintenance_view_maintenance_view__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage = (function () {
    function SignupPage(navCtrl, alertCtrl, loadingCtrl, userService, storage, events) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.storage = storage;
        this.events = events;
        this.device_token = "1";
        this.user = {
            username: 'aaa',
            email: '',
            password: '',
            level: 3
        };
    }
    SignupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('device_token').then(function (val) {
            console.log("device_token", val);
            if (val != null) {
                _this.device_token = val;
            }
        });
    };
    SignupPage.prototype.doSignUp = function () {
        var _this = this;
        if (this.user.email == '' || this.user.password == '' || this.user.email == '') {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: 'Please fill in the blanks.',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.user.email = this.user.email.toLowerCase();
            console.log("user param", this.user);
            this.userService.signUp(this.user)
                .subscribe(function (data) {
                loading_1.dismiss();
                console.log("Signup Data:", data);
                if (data.message == 'user created!') {
                    _this.storage.set('userdata', data);
                    var params = {
                        token: data.token,
                        device_token: _this.device_token
                    };
                    _this.userService.insertDeviceToken(params)
                        .subscribe(function (data1) {
                        if (data.user.level == 7 || data.user.level == 8) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                        }
                        else {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
                        }
                        _this.events.publish("user:changed");
                    }, function (data1) {
                        if (data.uesr.level == 7 || data.uesr.level == 8) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                        }
                        else {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]);
                        }
                        _this.events.publish("user:changed");
                    });
                    //this.navCtrl.setRoot(HomePage);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: "Error", subTitle: "Signup Error", buttons: ['OK']
                    });
                    alert_2.present();
                    _this.navCtrl.pop();
                }
            }, function (data) {
                loading_1.dismiss();
                console.log(data, "data");
                if (data.status == 403) {
                    var alert_3 = _this.alertCtrl.create({
                        title: "Error", subTitle: "User already exists.", buttons: ['OK']
                    });
                    alert_3.present();
                }
                else {
                    var alert_4 = _this.alertCtrl.create({
                        title: "Error", subTitle: "Server Error", buttons: ['OK']
                    });
                    alert_4.present();
                }
                _this.navCtrl.pop();
            });
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-signup',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/signup/signup.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Crear una cuenta</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n\n        <img src="assets/imgs/wtcb.jpg"/>\n\n        <!-- <ion-item>\n            <ion-input type="text" placeholder="Username" [(ngModel)]="user.username"></ion-input>\n        </ion-item> -->\n\n        <ion-item>\n            <ion-input type="email" placeholder="Email" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-input type="password" placeholder="Contraseña" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-select [(ngModel)]="user.level" interface="popover" placeholder="Access Level" style="width: 90%;">\n                <ion-option value="3" selected>Cliente</ion-option>\n                <ion-option value="3.2">Técnico</ion-option>\n                <ion-option value="7">Administrador</ion-option>\n                \n                <!-- <ion-option value="3">Oficina Arrendatario (Owner)</ion-option>\n                <ion-option value="5">Vendor / Técnico</ion-option> -->\n            </ion-select>\n        </ion-item>\n\n    </ion-card>\n\n    <button ion-button class="main-btn" (click)="doSignUp()">Regístrese</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyticsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { MaintenanceTrackerPage } from '../maintenance-tracker/maintenance-tracker';
var AnalyticsPage = (function () {
    function AnalyticsPage(navCtrl, navParams, userService, loadingCtrl, storage, events, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.openedSteps = [];
        this.closedSteps = [];
        this.rejectedSteps = [];
        this.paidSteps = [];
        this.starSteps = [];
        this.five_stars = [];
        this.four_stars = [];
        this.three_stars = [];
        this.two_stars = [];
        this.one_star = [];
        this.star_flags = [false, false, false, false, false];
        this.renter_email = '';
        this.star_flags = [false, false, false, false, false];
    }
    AnalyticsPage.prototype.go = function () {
        console.log("date", this.fromDate, this.toDate);
        this.getSteps();
    };
    AnalyticsPage.prototype.ionViewDidLoad = function () {
    };
    AnalyticsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.authUser = val.user;
                _this.token = val.token;
                _this.getSteps();
            }
        });
    };
    AnalyticsPage.prototype.onChange = function (event) {
        this.renter_email = event;
    };
    AnalyticsPage.prototype.getSteps = function () {
        var _this = this;
        this.closedSteps = [];
        this.openedSteps = [];
        this.starSteps = [];
        this.paidSteps = [];
        this.rejectedSteps = [];
        var from_date;
        var to_date;
        if (this.fromDate) {
            from_date = new Date(this.fromDate);
        }
        else {
            from_date = new Date("2017-01-01");
        }
        if (this.toDate) {
            to_date = new Date(this.toDate);
        }
        else {
            to_date = new Date("2100-01-01");
        }
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getSteps(this.token)
            .subscribe(function (data) {
            console.log("steps", data);
            loading.dismiss();
            _this.stars = [];
            _this.avg_time1 = 0;
            _this.avg_time2 = 0;
            _this.avg_time3 = 0;
            _this.avg_time4 = 0;
            _this.update_time_array1 = [];
            _this.update_time_array2 = [];
            _this.update_time_array3 = [];
            _this.update_time_array4 = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].updated_at5 && (data[i].email == _this.renter_email || _this.renter_email == '')) {
                    var start_date = new Date(data[i].updated_at5);
                    var start_difference = start_date - from_date;
                    var to_difference = to_date - start_date;
                    //console.log("start-to-difference", start_difference, to_difference);
                    if (start_difference >= 0 && to_difference >= 0) {
                        if (data[i].status5 == 1) {
                            _this.starSteps.push(data[i]);
                        }
                        if (data[i].step == 6) {
                            _this.closedSteps.push(data[i]);
                        }
                        else if (data[i].status1 == 2) {
                            _this.rejectedSteps.push(data[i]);
                        }
                        if (data[i].step <= 5) {
                            _this.openedSteps.push(data[i]);
                        }
                        if (data[i].step >= 5) {
                            _this.paidSteps.push(data[i]);
                        }
                        if (data[i].updated_at4) {
                            var date4 = new Date(data[i].updated_at4);
                            _this.update_time_array4.push(date4 - start_date);
                        }
                        if (data[i].updated_at3) {
                            var date3 = new Date(data[i].updated_at3);
                            _this.update_time_array3.push(date3 - start_date);
                        }
                        if (data[i].updated_at2) {
                            var date2 = new Date(data[i].updated_at2);
                            _this.update_time_array2.push(date2 - start_date);
                        }
                        if (data[i].updated_at1) {
                            var date1 = new Date(data[i].updated_at1);
                            _this.update_time_array1.push(date1 - start_date);
                        }
                    }
                }
            }
            for (var i1 = 0; i1 < _this.update_time_array1.length; i1++) {
                _this.avg_time1 += _this.update_time_array1[i1] / _this.update_time_array1.length;
            }
            for (var i2 = 0; i2 < _this.update_time_array2.length; i2++) {
                _this.avg_time2 += _this.update_time_array2[i2] / _this.update_time_array2.length;
            }
            for (var i3 = 0; i3 < _this.update_time_array3.length; i3++) {
                _this.avg_time3 += _this.update_time_array3[i3] / _this.update_time_array3.length;
            }
            for (var i4 = 0; i4 < _this.update_time_array4.length; i4++) {
                _this.avg_time4 += _this.update_time_array4[i4] / _this.update_time_array4.length;
            }
            _this.avg_time4 = _this.timeConversion(_this.avg_time4);
            _this.avg_time3 = _this.timeConversion(_this.avg_time3);
            _this.avg_time2 = _this.timeConversion(_this.avg_time2);
            _this.avg_time1 = _this.timeConversion(_this.avg_time1);
            console.log("444444", _this.avg_time4);
            console.log("333333", _this.avg_time3);
            console.log("222222", _this.avg_time2);
            console.log("111111", _this.avg_time1);
            var xxx = _this.groupBy(_this.starSteps, 'email');
            for (var key in xxx) {
                console.log("key", key);
                var ave = 0;
                for (var j = 0; j < xxx[key].length; j++) {
                    ave += xxx[key][j].star / xxx[key].length;
                }
                _this.stars.push({ email: key, star: ave });
            }
            _this.getStarReview();
            console.log("closed request steps", _this.stars);
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
            _this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](_this.doughnutCanvas.nativeElement, {
                type: 'doughnut',
                data: {
                    datasets: [{
                            data: [_this.openedSteps.length, _this.closedSteps.length, _this.rejectedSteps.length, _this.paidSteps.length],
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
        }, function (data) {
            loading.dismiss();
        });
    };
    AnalyticsPage.prototype.timeConversion = function (millisec) {
        var seconds = (millisec / 1000);
        var minutes = (millisec / (1000 * 60));
        var hours = (millisec / (1000 * 60 * 60));
        var days = (millisec / (1000 * 60 * 60 * 24));
        if (seconds < 60) {
            return seconds.toFixed(0) + " Secs";
        }
        else if (minutes < 60) {
            return minutes.toFixed(0) + " Mins";
        }
        else if (hours < 24) {
            return hours.toFixed(0) + " Hrs";
        }
        else {
            return days.toFixed(0) + " Days";
        }
    };
    AnalyticsPage.prototype.groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    AnalyticsPage.prototype.getStarReview = function () {
        var _this = this;
        this.five_stars = [];
        this.four_stars = [];
        this.three_stars = [];
        this.two_stars = [];
        this.one_star = [];
        console.log(this.stars.length, "this.stars.length");
        var _loop_1 = function (i) {
            var loading = this_1.loadingCtrl.create();
            loading.present();
            this_1.userService.getUserByEmail(this_1.stars[i].email).subscribe(function (data) {
                loading.dismiss();
                _this.userService.getOfficesById(data.officeKey, _this.token).subscribe(function (data1) {
                    console.log('stars', data1);
                    if (_this.stars[i].star >= 4.5) {
                        _this.five_stars.push(data1[0].name);
                    }
                    else if (_this.stars[i].star >= 3.5) {
                        _this.four_stars.push(data1[0].name);
                    }
                    else if (_this.stars[i].star >= 2.5) {
                        _this.three_stars.push(data1[0].name);
                    }
                    else if (_this.stars[i].star > 1.5) {
                        _this.two_stars.push(data1[0].name);
                    }
                    else {
                        _this.one_star.push(data1[0].name);
                    }
                }, function (data1) {
                });
            }, function (data) {
                loading.dismiss();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.stars.length; i++) {
            _loop_1(i);
        }
    };
    AnalyticsPage.prototype.itemShow = function (event, index) {
        this.star_flags[index] = !this.star_flags[index];
    };
    return AnalyticsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
    __metadata("design:type", Object)
], AnalyticsPage.prototype, "doughnutCanvas", void 0);
AnalyticsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-analytics',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/analytics/analytics.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n    </button>\n    <ion-title>Indicadores de Gestión</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <div class="renter">\n        <ion-list>\n            <ion-item>\n                <ion-label>Desde: </ion-label>\n                <ion-datetime displayFormat="MM/DD/YYYY" pickerFormat="YYYY/MMM/DD" [(ngModel)]="fromDate"></ion-datetime>\n            </ion-item>\n    \n            <ion-item>\n                <ion-label>Hasta: </ion-label>\n                <ion-datetime displayFormat="MM/DD/YYYY" pickerFormat="YYYY/MMM/DD" [(ngModel)]="toDate"></ion-datetime>\n            </ion-item>\n    \n            <ion-item>\n                <ion-label>Clientes: </ion-label>\n                <ion-select (ionChange)="onChange($event)">\n                    <ion-option *ngFor="let star of stars; let i = index" value="{{star.email}}">\n                        {{star.email}}\n                    </ion-option> \n                </ion-select>\n            </ion-item>\n        </ion-list>\n\n        <button class="main-btn gobtn" ion-button block (click)="go();">Go</button>\n    </div>\n\n    \n\n    <div class="review_list">\n        <h3>Evaluaciones de desempeño</h3>\n        <!-- Star 5 -->\n        <ion-list>\n            <ion-item (click)="itemShow($event, 0)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/star-5.png">\n                </ion-avatar>\n                <h2>5 Estrella</h2>\n                <p item-end>{{five_stars.length}}</p>\n            </ion-item>\n            <div *ngIf="star_flags[0]" class="review_name">\n                <ion-item [hidden]="five_stars.length == 0">\n                    <ion-icon name="md-thumbs-up" item-start></ion-icon>\n                        {{five_stars.join(\', \')}}\n                </ion-item>\n            </div>\n        </ion-list>\n\n        <!-- Star 4 -->\n\n        <ion-list>\n            <ion-item (click)="itemShow($event, 1)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/star-4.png">\n                </ion-avatar>\n                <h2>4 Estrella</h2>\n                <p item-end>{{four_stars.length}}</p>\n            </ion-item>\n            <div *ngIf="star_flags[1]" class="review_name">\n                <ion-item [hidden]="four_stars.length == 0">\n                    <ion-icon name="ios-thumbs-up" item-start></ion-icon>\n                    {{four_stars.join(\', \')}}\n                </ion-item>\n            </div>\n        </ion-list>\n\n        <!-- Star 3 -->\n\n        <ion-list>\n            <ion-item (click)="itemShow($event, 2)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/star-3.png">\n                </ion-avatar>\n                <h2>3 Estrella</h2>\n                <p item-end>{{three_stars.length}}</p>\n            </ion-item>\n            <div *ngIf="star_flags[2]" class="review_name">\n                <ion-item [hidden]="three_stars.length == 0">\n                    <ion-icon name="ios-thumbs-up-outline" item-start></ion-icon>\n                    {{three_stars.join(\', \')}}\n                </ion-item>\n            </div>\n        </ion-list>\n\n        <!-- Star 2 -->\n\n        <ion-list>\n            <ion-item (click)="itemShow($event, 3)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/star-2.png">\n                </ion-avatar>\n                <h2>2 Estrella</h2>\n                <p item-end>{{two_stars.length}}</p>\n            </ion-item>\n            <div *ngIf="star_flags[3]" class="review_name">\n                <ion-item [hidden]="two_stars.length == 0">\n                    <ion-icon name="ios-thumbs-down-outline" item-start></ion-icon>\n                    {{two_stars.join(\', \')}}\n                </ion-item>\n            </div>\n        </ion-list>\n\n        <!-- Star 1 -->\n\n        <ion-list>\n            <ion-item (click)="itemShow($event, 4)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/star-1.png">\n                </ion-avatar>\n                <h2>1 Estrella</h2>\n                <p item-end>{{one_star.length}}</p>\n            </ion-item>\n            <div *ngIf="star_flags[4]" class="review_name">\n                <ion-item [hidden]="one_star.length == 0">\n                    <ion-icon name="md-thumbs-down" item-start></ion-icon>\n                    {{one_star.join(\', \')}}\n                </ion-item>\n            </div>\n        </ion-list>\n\n    </div>\n\n    \n    <div class="avg_list">\n        <h3>Promedio tiempos de gestion</h3>\n        <ion-list>\n            <ion-item>\n                <p class="name" item-start>Tiempo de pago</p>\n                <p class="timer" item-end>{{avg_time4}}</p>\n            </ion-item>\n        </ion-list>\n\n        <ion-list>\n            <ion-item>\n                <p class="name" item-start>Tiempo de finalizacion</p>\n                <p class="timer" item-end>{{avg_time3}}</p>\n            </ion-item>\n        </ion-list>\n\n        <ion-list>\n            <ion-item>\n                <p class="name" item-start>Tiempo de para inicio de trabajo</p>\n                <p class="timer" item-end>{{avg_time2}}</p>\n            </ion-item>\n        </ion-list>\n\n        <ion-list>\n            <ion-item>\n                <p class="name" item-start>Tiempo de respuesta contacto inicial</p>\n                <p class="timer" item-end>{{avg_time1}}</p>\n            </ion-item>\n        </ion-list>\n    </div>\n\n	<ion-card>\n      <ion-card-header>\n       	Resumen solicitudes\n      </ion-card-header>\n      <ion-card-content>\n        <canvas #doughnutCanvas></canvas>\n      </ion-card-content>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/analytics/analytics.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], AnalyticsPage);

//# sourceMappingURL=analytics.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
 Generated class for the BuildingProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
var BuildingProvider = (function () {
    function BuildingProvider(http) {
        this.http = http;
        //console.log('Hello BuildingProvider Provider');
    }
    BuildingProvider.prototype.list = function () {
        return [
            {
                id: 1,
                name: 'Torre A',
                description: 'World Trade Center Bogota',
                floors: [
                    {
                        id: 1,
                        name: 'Piso 2'
                    },
                    {
                        id: 2,
                        name: 'Piso 3'
                    },
                    {
                        id: 3,
                        name: 'Piso 4'
                    },
                    {
                        id: 4,
                        name: 'Piso 5'
                    },
                    {
                        id: 5,
                        name: 'Piso 6'
                    },
                    {
                        id: 6,
                        name: 'Piso 7'
                    },
                    {
                        id: 7,
                        name: 'Piso 8'
                    },
                    {
                        id: 8,
                        name: 'Piso 9'
                    },
                    {
                        id: 9,
                        name: 'Piso 10'
                    },
                    {
                        id: 10,
                        name: 'Piso 11'
                    },
                    {
                        id: 11,
                        name: 'Administración'
                    },
                    {
                        id: 12,
                        name: 'No aplica'
                    }
                ]
            },
            {
                id: 2,
                name: 'Torre B',
                description: 'World Trade Center Bogota',
                floors: [
                    {
                        id: 1,
                        name: 'Club Atheneum'
                    },
                    {
                        id: 2,
                        name: 'Piso 5'
                    },
                    {
                        id: 3,
                        name: 'Piso 6'
                    },
                    {
                        id: 4,
                        name: 'Piso 7'
                    },
                    {
                        id: 5,
                        name: 'Piso 8'
                    },
                    {
                        id: 6,
                        name: 'Piso 9'
                    },
                    {
                        id: 7,
                        name: 'Piso 10'
                    },
                    {
                        id: 8,
                        name: 'Piso 11'
                    },
                    {
                        id: 9,
                        name: 'No aplica'
                    }
                ]
            },
            {
                id: 3,
                name: 'Torre C',
                description: 'World Trade Center Bogota',
                floors: [
                    {
                        id: 1,
                        name: 'Piso 2'
                    },
                    {
                        id: 2,
                        name: 'Piso 3'
                    },
                    {
                        id: 3,
                        name: 'Piso 4'
                    },
                    {
                        id: 4,
                        name: 'Piso 5'
                    },
                    {
                        id: 5,
                        name: 'Piso 6'
                    },
                    {
                        id: 6,
                        name: 'Piso 7'
                    },
                    {
                        id: 7,
                        name: 'Piso 8'
                    },
                    {
                        id: 8,
                        name: 'Piso 9'
                    },
                    {
                        id: 9,
                        name: 'Piso 10'
                    },
                    {
                        id: 10,
                        name: 'Piso 11'
                    },
                    {
                        id: 11,
                        name: 'Restaurante La Fragata'
                    },
                    {
                        id: 12,
                        name: 'No aplica'
                    }
                ]
            },
            {
                id: 4,
                name: 'No aplica',
                description: '',
                floors: []
            },
        ];
    };
    return BuildingProvider;
}());
BuildingProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], BuildingProvider);

//# sourceMappingURL=building.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__otrs_request_otrs_request__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_notification__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__technician_technician__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MaintenanceViewPage = (function () {
    function MaintenanceViewPage(navCtrl, storage, userService, loadingCtrl, alertCtrl, events) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.user = {
            level: 4
        };
        this.requests = [];
        this.openedRequests = [];
        this.closedRequests = [];
        // this.events.subscribe('user:signin', (requestKey) => {
        //     this.navCtrl.push('MaintenanceTrackerPage', {requestKey: requestKey});
        // });
    }
    MaintenanceViewPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            if (val != null) {
                _this.user = val.user;
                _this.userKey = val.user._id;
                _this.officeKey = val.user.officeKey;
                _this.token = val.token;
                if (_this.user.level == "7") {
                    _this.loadRequestByUser();
                }
                else {
                    _this.loadRequestByOffice();
                }
                console.log("userdata", _this.user);
            }
        });
        this.storage.get('notification_count').then(function (val) {
            _this.count = val;
        });
        this.events.subscribe("noti2:changed", function () {
            console.log("noti2:changed");
            _this.storage.get('notification_count').then(function (val) {
                _this.count = val;
            });
        });
    };
    MaintenanceViewPage.prototype.gotoMyProfile = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__profile_profile__["a" /* ProfilePage */]);
    };
    MaintenanceViewPage.prototype.gotoNotification = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__notification_notification__["a" /* NotificationPage */]);
    };
    MaintenanceViewPage.prototype.delete = function (item) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.deleteRequest(item._id, this.token)
            .subscribe(function (data) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: "", subTitle: "La solicitud fue elimina con éxito!", buttons: ['OK']
            });
            alert.present();
            if (_this.user.level == "7") {
                _this.loadRequestByUser();
            }
            else {
                _this.loadRequestByOffice();
            }
        }, function (data) {
            loading.dismiss();
        });
    };
    MaintenanceViewPage.prototype.edit = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__otrs_request_otrs_request__["a" /* OtrsRequestPage */], { requestItem: item });
    };
    MaintenanceViewPage.prototype.assign = function (item) {
        console.log("Assign office key", item);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__technician_technician__["a" /* TechnicianPage */], { request: item });
    };
    MaintenanceViewPage.prototype.createNewRequest = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__otrs_request_otrs_request__["a" /* OtrsRequestPage */]);
    };
    MaintenanceViewPage.prototype.loadRequestByOffice = function () {
        var _this = this;
        this.requests = [];
        this.openedRequests = [];
        this.closedRequests = [];
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getRequestsByOffice(this.officeKey, this.token)
            .subscribe(function (data) {
            loading.dismiss();
            for (var i = 0; i < data.length; i++) {
                if (data[i].step > 5) {
                    _this.closedRequests.push(data[i]);
                }
                else {
                    _this.openedRequests.push(data[i]);
                }
            }
            console.log("openedRequests:", _this.officeKey, _this.openedRequests);
        }, function (data) {
            loading.dismiss();
        });
    };
    MaintenanceViewPage.prototype.loadRequestByUser = function () {
        var _this = this;
        this.requests = [];
        this.openedRequests = [];
        this.closedRequests = [];
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.getAllRequests(this.token)
            .subscribe(function (data) {
            loading.dismiss();
            for (var i = 0; i < data.length; i++) {
                if (data[i].step > 5) {
                    _this.closedRequests.push(data[i]);
                }
                else {
                    _this.openedRequests.push(data[i]);
                    console.log(_this.openedRequests);
                }
            }
        }, function (data) {
            loading.dismiss();
        });
    };
    MaintenanceViewPage.prototype.viewRequest = function (request) {
        var _this = this;
        //console.log("requestKey:", request._id);
        if (this.user.level == '7' && request.opened7 == false) {
            var params = {
                token: this.token,
                opened7: true
            };
            this.userService.updateRequest(request._id, params)
                .subscribe(function (data) {
                //loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: request._id });
            }, function (data) {
                //loading.dismiss();
            });
        }
        else if (request.opened3_1 == false && this.user.level == "3.1") {
            var params = {
                token: this.token,
                opened3_1: true
            };
            this.userService.updateRequest(request._id, params)
                .subscribe(function (data) {
                //loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: request._id });
            }, function (data) {
                //loading.dismiss();
            });
        }
        else if (request.opened3_2 == false && this.user.level == "3.2") {
            var params = {
                token: this.token,
                opened3_2: true
            };
            this.userService.updateRequest(request._id, params)
                .subscribe(function (data) {
                //loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: request._id });
            }, function (data) {
                //loading.dismiss();
            });
        }
        else if (request.opened3 == false && this.user.level == 3) {
            var params = {
                token: this.token,
                opened3: true
            };
            this.userService.updateRequest(request._id, params)
                .subscribe(function (data) {
                //loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: request._id });
            }, function (data) {
                //loading.dismiss();
            });
        }
        else {
            // this.firebaseAnalytics.logEvent('page_view', {page: "dashboard"})
            //   .then((res: any) => console.log("firebase analytics -success ", res))
            //   .catch((error: any) => console.error("firebase analytics - fail", error));
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: request._id });
        }
    };
    return MaintenanceViewPage;
}());
MaintenanceViewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-maintenance-view',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-view/maintenance-view.html"*/'<!--\n  Generated template for the MaintenanceViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n        <ion-title>SOLICITUDES DE MANTENIMIENTO</ion-title>\n\n        <ion-buttons end>\n          <button ion-button icon-only style="color:white;" (click)="gotoNotification();">\n                <ion-icon name="md-notifications"></ion-icon>\n          </button>\n          <div class="badge" *ngIf="count>0"></div>\n        </ion-buttons>\n    </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content class="main-bg">\n    <button class="main-btn" ion-button block (click)="createNewRequest()" *ngIf="user.level==\'3\'">Enviar Nueva Solicitud</button>\n    <button class="main-btn" ion-button block (click)="gotoMyProfile()" *ngIf="user.level==\'3.1\' || user.level==\'3.2\'">Mi Perfil</button>\n    <ion-list style="margin-top: 20px;" *ngIf="openedRequests.length > 0">\n\n        <ion-list-header class="header-style">\n            SOLICITUDES ABIERTAS\n        </ion-list-header>\n\n        <div *ngIf="user.level == \'7\'">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened7 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-10 request-id" maxlength="10">\n                        {{item._id}}\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n\n                <ion-item-options side="right">\n                  <button ion-button (click)="assign(item)">\n                    <ion-icon name="ios-construct"></ion-icon>\n                    Tech\n                  </button>\n                  <button ion-button (click)="edit(item)">\n                    <ion-icon name="ios-create"></ion-icon>\n                    Edit\n                  </button>\n                  <button ion-button color="danger" (click)="delete(item)">\n                    <ion-icon name="ios-trash"></ion-icon>\n                    Delete\n                  </button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level == \'3.1\'">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened3_1 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-10 request-id">\n                        {{item._id}}\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level == \'3.2\'">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened3_2 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-10 request-id">\n                        {{item._id}}\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level == 3">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened3 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-10 request-id">\n                        {{item._id}}\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n    </ion-list>\n\n    <ion-list style="margin-top: 20px;" *ngIf="closedRequests.length > 0">\n        <ion-list-header class="header-style">\n            SOLICITUDES CERRADAS\n        </ion-list-header>\n        <div *ngIf="user.level == \'7\'">\n            <ion-item-sliding *ngFor="let item of closedRequests">\n                <ion-item  (click)="viewRequest(item)" class="row row-content">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-10 request-id">\n                        {{item._id}}\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n\n                <ion-item-options side="right">\n                  <button ion-button color="danger" (click)="delete(item)">\n                    <ion-icon name="ios-trash"></ion-icon>\n                    Delete\n                  </button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level != \'7\'">\n            <ion-item-sliding *ngFor="let item of closedRequests">\n                <ion-item  (click)="viewRequest(item)" class="row row-content">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-10 request-id">\n                        {{item._id}}\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                    \n                    <!-- <div class="col width-30">{{item.officeKey}}</div> -->\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-view/maintenance-view.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
], MaintenanceViewPage);

//# sourceMappingURL=maintenance-view.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(738);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(1300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_maintenance_view_maintenance_view__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_maintenance_tracker_maintenance_tracker__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_otrs_request_otrs_request__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_building_list_building_list__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_create_office_create_office__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_building_profile_building_profile__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_notification_notification__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_analytics_analytics__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_popup_popup__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_technician_technician__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_technician_detail_technician_detail__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_user_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_base_service__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_building__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_push_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angular2_text_mask__ = __webpack_require__(1301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_angular2_text_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_status_bar__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_camera__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_cloud_angular__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_email_composer__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_date_picker__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_badge__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_angular2_moment__ = __webpack_require__(1302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ionic2_rating__ = __webpack_require__(1304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_onesignal__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ng2_charts__ = __webpack_require__(1306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38_ng2_charts__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























// import {AngularFireModule} from 'angularfire2';









var firebaseConfig = {
    apiKey: "AIzaSyDzuNnzZXieJMFnG9C2-VRjPN3IfuJ_EoI",
    authDomain: "wtcb-1ef9a.firebaseapp.com",
    databaseURL: "https://wtcb-1ef9a.firebaseio.com",
    projectId: "wtcb-1ef9a",
    storageBucket: "wtcb-1ef9a.appspot.com",
    messagingSenderId: "348010185137"
};
var cloudSettings = {
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
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_otrs_request_otrs_request__["a" /* OtrsRequestPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_building_list_building_list__["a" /* BuildingListPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_create_office_create_office__["a" /* CreateOfficePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_building_profile_building_profile__["a" /* BuildingProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_popup_popup__["a" /* PopupPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_analytics_analytics__["a" /* AnalyticsPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_technician_technician__["a" /* TechnicianPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_technician_detail_technician_detail__["a" /* TechnicianDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_26_angular2_text_mask__["TextMaskModule"],
            __WEBPACK_IMPORTED_MODULE_35_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_36_ionic2_rating__["a" /* Ionic2RatingModule */],
            __WEBPACK_IMPORTED_MODULE_38_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            // AngularFireModule.initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_25__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_30__ionic_cloud_angular__["a" /* CloudModule */].forRoot(cloudSettings)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_otrs_request_otrs_request__["a" /* OtrsRequestPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_building_list_building_list__["a" /* BuildingListPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_create_office_create_office__["a" /* CreateOfficePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_building_profile_building_profile__["a" /* BuildingProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_popup_popup__["a" /* PopupPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_analytics_analytics__["a" /* AnalyticsPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_technician_technician__["a" /* TechnicianPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_technician_detail_technician_detail__["a" /* TechnicianDetailPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_21__providers_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_22__providers_base_service__["a" /* BaseService */],
            __WEBPACK_IMPORTED_MODULE_23__providers_building__["a" /* BuildingProvider */],
            __WEBPACK_IMPORTED_MODULE_24__providers_push_service__["a" /* PushServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_onesignal__["a" /* OneSignal */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_technician_technician__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_maintenance_view_maintenance_view__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_building_list_building_list__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_notification_notification__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_analytics_analytics__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_cloud_angular__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_badge__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_onesignal__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_user_service__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, storage, push, events, toastCtrl, badge, oneSignal, userService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.push = push;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.badge = badge;
        this.oneSignal = oneSignal;
        this.userService = userService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.count = 0;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Inicio', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'md-home' },
            { title: 'Mantenimiento', component: __WEBPACK_IMPORTED_MODULE_7__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */], icon: 'md-paper' },
            { title: 'Torres', component: __WEBPACK_IMPORTED_MODULE_8__pages_building_list_building_list__["a" /* BuildingListPage */], icon: 'md-easel' },
            { title: 'Notificaciones', component: __WEBPACK_IMPORTED_MODULE_9__pages_notification_notification__["a" /* NotificationPage */], icon: 'md-notifications' },
            { title: 'Indicadores de Gestión', component: __WEBPACK_IMPORTED_MODULE_10__pages_analytics_analytics__["a" /* AnalyticsPage */], icon: 'md-analytics' },
            { title: 'Perfil', component: __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */], icon: 'md-person' },
            { title: 'Técnico', component: __WEBPACK_IMPORTED_MODULE_5__pages_technician_technician__["a" /* TechnicianPage */], icon: 'md-calculator' },
            { title: 'Cerrar Sesión', component: null, icon: 'md-log-out' }
        ];
        if (!this.platform.is('core')) {
            //push configuration
            platform.ready().then(function () {
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
        this.storage.get('notification_count').then(function (val) {
            _this.count = val;
        });
        this.events.subscribe("user:changed", function () {
            _this.storage.get('userdata').then(function (val) {
                console.log("userdata", val);
                if (val != null) {
                    if (val.user.level == 7 || val.user.level == 8) {
                        _this.pages = [
                            { title: 'Inicio', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'md-home' },
                            { title: 'Mantenimiento', component: __WEBPACK_IMPORTED_MODULE_7__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */], icon: 'md-paper' },
                            { title: 'Torres', component: __WEBPACK_IMPORTED_MODULE_8__pages_building_list_building_list__["a" /* BuildingListPage */], icon: 'md-easel' },
                            { title: 'Notificaciones', component: __WEBPACK_IMPORTED_MODULE_9__pages_notification_notification__["a" /* NotificationPage */], icon: 'md-notifications' },
                            { title: 'Indicadores de Gestión', component: __WEBPACK_IMPORTED_MODULE_10__pages_analytics_analytics__["a" /* AnalyticsPage */], icon: 'md-analytics' },
                            { title: 'Técnico', component: __WEBPACK_IMPORTED_MODULE_5__pages_technician_technician__["a" /* TechnicianPage */], icon: 'md-calculator' },
                            { title: 'Cerrar Sesión', component: null, icon: 'md-log-out' }
                        ];
                    }
                    else if (val.user.level == 3) {
                        _this.pages = [
                            { title: 'Mantenimiento', component: __WEBPACK_IMPORTED_MODULE_7__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */], icon: 'md-paper' },
                            { title: 'Notificaciones', component: __WEBPACK_IMPORTED_MODULE_9__pages_notification_notification__["a" /* NotificationPage */], icon: 'md-notifications' },
                            { title: 'Perfil', component: __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */], icon: 'md-person' },
                            { title: 'Cerrar Sesión', component: null, icon: 'md-log-out' }
                        ];
                    }
                    else {
                        _this.pages = [
                            { title: 'Mantenimiento', component: __WEBPACK_IMPORTED_MODULE_7__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */], icon: 'md-paper' },
                            { title: 'Notificaciones', component: __WEBPACK_IMPORTED_MODULE_9__pages_notification_notification__["a" /* NotificationPage */], icon: 'md-notifications' },
                            { title: 'Perfil', component: __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */], icon: 'md-person' },
                            { title: 'Cerrar Sesión', component: null, icon: 'md-log-out' }
                        ];
                    }
                    _this.token = val.token;
                    _this.storage.get('notification_count').then(function (val) {
                        _this.count = val;
                    });
                    //this.getNotifications(val.token);
                    _this.events.publish("noti1:changed");
                    _this.events.publish("noti2:changed");
                }
            });
        });
        this.events.subscribe("notification:changed", function () {
            _this.storage.get('userdata').then(function (val) {
                console.log("userdata", val);
                if (val != null) {
                    _this.token = val.token;
                    _this.getNotifications(val.token);
                }
            });
        });
    }
    MyApp.prototype.getNotifications = function (token) {
        var _this = this;
        console.log("get Notification", token);
        this.count = 0;
        this.userService.getNotifications(token)
            .subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].read == false) {
                    _this.count++;
                }
            }
            _this.storage.set("notification_count", _this.count);
            _this.events.publish("noti1:changed");
            _this.events.publish("noti2:changed");
        }, function (data) {
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.configOnesignal();
        });
    };
    MyApp.prototype.configOnesignal = function () {
        var _this = this;
        this.oneSignal.startInit('ae60cbd3-3a45-469c-b6c7-bcb6104c31b4', '348010185137');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe(function () {
            // do something when notification is received
            _this.getNotifications(_this.token);
        });
        this.oneSignal.handleNotificationOpened().subscribe(function () {
            // do something when a notification is opened
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_notification_notification__["a" /* NotificationPage */]);
        });
        this.oneSignal.getIds().then(function (ids) {
            console.log("Push Subscription state changed: ", ids);
            _this.storage.set('device_token', ids.userId);
        });
        this.oneSignal.endInit();
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == undefined) {
            this.storage.remove("userdata");
            this.storage.remove("notification_count");
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menú</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list no-lines>\n      <ion-item menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" style="color: rgb(70, 95, 110);">\n        <ion-icon name="{{p.icon}}"></ion-icon>\n        {{p.title}}\n        <div item-end *ngIf="p.title==\'Notificaciones\' && count>0" class="notification-count">{{count}}</div>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_13__ionic_cloud_angular__["b" /* Push */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_badge__["a" /* Badge */],
        __WEBPACK_IMPORTED_MODULE_15__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_16__providers_user_service__["a" /* UserService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[733]);
//# sourceMappingURL=main.js.map