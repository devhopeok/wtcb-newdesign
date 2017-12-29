webpackJsonp([0],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__building_list_building_list__ = __webpack_require__(189);
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
    function HomePage(navCtrl, loadingCtrl, userService, buildingService, storage) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.buildingService = buildingService;
        this.storage = storage;
        this.offices = [];
        this.buildings = this.buildingService.list();
        this.authUser = {
            level: 4
        };
    }
    HomePage.prototype.ionViewDidEnter = function () {
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__building_list_building_list__["a" /* BuildingListPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n\n        <ion-buttons end>\n              <button ion-button icon-only>\n                    <ion-icon name="contact"></ion-icon>\n              </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid ion-fixed style="height: 100vh">\n        <ion-row class="notice-header">\n            <ion-col style="background-color:black;color:white;">\n                <ion-slides pager="true" class="superfill">\n                    <ion-slide class="dashboard">\n                        <h1 class="bold">World Trade Center Bogota</h1>\n                    </ion-slide>\n                    <ion-slide class="alerts">\n                        <h1>Alertas</h1>\n                    </ion-slide>\n                    <ion-slide class="news">\n                        <h1>Noticias</h1>\n                    </ion-slide>\n                </ion-slides>\n            </ion-col>\n        </ion-row>\n\n        <ion-row class="wtc-container">\n            <ion-col col-8 style="background-color:orange;color:white;">\n                <ion-slides pager="true" class="superfill">\n                    <ion-slide class="torreA">\n\n                        <h1 class="light-font-header">TORRE A</h1>\n                        <ion-list>\n                            <ion-item *ngFor="let item of buildings[0].floors" (click)="viewFloorOfffice(1, item.id)">\n                                {{item.name}}\n                            </ion-item>\n                        </ion-list>\n\n                        <ion-row class="building-info" *ngIf="authUser.level == 7 || authUser.level == 8">\n                            <ion-col>\n                                Rented Offices\n                                <p>\n                                    {{rentedOffices(1)}}\n                                </p>\n                            </ion-col>\n                            <ion-col>\n                                Occupancy\n                                <p>{{occupancyOffices(1).toFixed(2)}}%</p>\n                            </ion-col>\n                            <ion-col>\n                                Vacant Offices\n                                <p>{{vacantOffices(1)}}</p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-slide>\n                    <ion-slide class="torreB">\n                        <h1 class="light-font-header">TORRE B</h1>\n\n                        <ion-list>\n                            <ion-item *ngFor="let item of buildings[1].floors" (click)="viewFloorOfffice(2, item.id)">\n                                {{item.name}}\n                            </ion-item>\n                        </ion-list>\n\n                        <ion-row class="building-info" *ngIf="authUser.level == 7 || authUser.level == 8">\n                            <ion-col>\n                                Rented Offices\n                                <p>\n                                    {{rentedOffices(2)}}\n                                </p>\n                            </ion-col>\n                            <ion-col>\n                                Occupancy\n                                <p>{{occupancyOffices(2).toFixed(2)}}%</p>\n                            </ion-col>\n                            <ion-col>\n                                Vacant Offices\n                                <p>{{vacantOffices(2)}}</p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-slide>\n                    <ion-slide class="torreC">\n                        <h1 class="light-font-header">TORRE C</h1>\n\n                        <ion-list>\n                            <ion-item *ngFor="let item of buildings[2].floors" (click)="viewFloorOfffice(3, item.id)">\n                                {{item.name}}\n                            </ion-item>\n                        </ion-list>\n\n                        <ion-row class="building-info" *ngIf="authUser.level == 7 || authUser.level == 8">\n                            <ion-col>\n                                Rented Offices\n                                <p>\n                                    {{rentedOffices(3)}}\n                                </p>\n                            </ion-col>\n                            <ion-col>\n                                Occupancy\n                                <p>{{occupancyOffices(3).toFixed(2)}}%</p>\n                            </ion-col>\n                            <ion-col>\n                                Vacant Offices\n                                <p>{{vacantOffices(3)}}</p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-slide>\n                </ion-slides>\n            </ion-col>\n            <ion-scroll scrollY="true" col-4 style="background-color:rgba(239, 239, 239, 0);color:white;border:0;" class="menu-scroll">\n                <ion-list>\n                    <!-- Sliding item -->\n                    <ion-item-sliding menuToggle>\n                        <ion-item>\n                            <ion-icon name="ios-menu-outline"></ion-icon>\n                        </ion-item>\n                        <ion-item-options>\n\n                        </ion-item-options>\n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item (click)="viewBuildingList()">\n                            <h1>TORRES</h1>\n                        </ion-item>\n                        <ion-item-options>\n                            <button ion-button color="primary" (click)="archive()">MANEJAR</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item>\n                            <h1>CONTROL</h1>\n                        </ion-item>\n                        <ion-item-options>\n                            <button ion-button color="primary" (click)="archive()">REPORTES</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item >\n                            <h1>ALERTAS</h1>\n                        </ion-item>\n                        <ion-item-options>\n                            <button ion-button color="primary" (click)="archive()">AJUSTES</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item>\n                            <h1> NOTICIAS</h1>\n                        </ion-item>\n                        <ion-item-options>\n                            <button ion-button color="primary" (click)="archive()">CREAR</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n\n                    <!-- Sliding item -->\n                    <ion-item-sliding>\n                        <ion-item>\n                            <h1> CHAT</h1>\n                        </ion-item>\n                        <ion-item-options>\n                            <button ion-button color="primary" (click)="archive()">HISTORIA</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n\n\n                </ion-list>\n            </ion-scroll>\n\n        </ion-row>\n\n\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 1240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 1265:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 590,
	"./af.js": 590,
	"./ar": 591,
	"./ar-dz": 592,
	"./ar-dz.js": 592,
	"./ar-kw": 593,
	"./ar-kw.js": 593,
	"./ar-ly": 594,
	"./ar-ly.js": 594,
	"./ar-ma": 595,
	"./ar-ma.js": 595,
	"./ar-sa": 596,
	"./ar-sa.js": 596,
	"./ar-tn": 597,
	"./ar-tn.js": 597,
	"./ar.js": 591,
	"./az": 598,
	"./az.js": 598,
	"./be": 599,
	"./be.js": 599,
	"./bg": 600,
	"./bg.js": 600,
	"./bm": 601,
	"./bm.js": 601,
	"./bn": 602,
	"./bn.js": 602,
	"./bo": 603,
	"./bo.js": 603,
	"./br": 604,
	"./br.js": 604,
	"./bs": 605,
	"./bs.js": 605,
	"./ca": 606,
	"./ca.js": 606,
	"./cs": 607,
	"./cs.js": 607,
	"./cv": 608,
	"./cv.js": 608,
	"./cy": 609,
	"./cy.js": 609,
	"./da": 610,
	"./da.js": 610,
	"./de": 611,
	"./de-at": 612,
	"./de-at.js": 612,
	"./de-ch": 613,
	"./de-ch.js": 613,
	"./de.js": 611,
	"./dv": 614,
	"./dv.js": 614,
	"./el": 615,
	"./el.js": 615,
	"./en-au": 616,
	"./en-au.js": 616,
	"./en-ca": 617,
	"./en-ca.js": 617,
	"./en-gb": 618,
	"./en-gb.js": 618,
	"./en-ie": 619,
	"./en-ie.js": 619,
	"./en-nz": 620,
	"./en-nz.js": 620,
	"./eo": 621,
	"./eo.js": 621,
	"./es": 622,
	"./es-do": 623,
	"./es-do.js": 623,
	"./es-us": 624,
	"./es-us.js": 624,
	"./es.js": 622,
	"./et": 625,
	"./et.js": 625,
	"./eu": 626,
	"./eu.js": 626,
	"./fa": 627,
	"./fa.js": 627,
	"./fi": 628,
	"./fi.js": 628,
	"./fo": 629,
	"./fo.js": 629,
	"./fr": 630,
	"./fr-ca": 631,
	"./fr-ca.js": 631,
	"./fr-ch": 632,
	"./fr-ch.js": 632,
	"./fr.js": 630,
	"./fy": 633,
	"./fy.js": 633,
	"./gd": 634,
	"./gd.js": 634,
	"./gl": 635,
	"./gl.js": 635,
	"./gom-latn": 636,
	"./gom-latn.js": 636,
	"./gu": 637,
	"./gu.js": 637,
	"./he": 638,
	"./he.js": 638,
	"./hi": 639,
	"./hi.js": 639,
	"./hr": 640,
	"./hr.js": 640,
	"./hu": 641,
	"./hu.js": 641,
	"./hy-am": 642,
	"./hy-am.js": 642,
	"./id": 643,
	"./id.js": 643,
	"./is": 644,
	"./is.js": 644,
	"./it": 645,
	"./it.js": 645,
	"./ja": 646,
	"./ja.js": 646,
	"./jv": 647,
	"./jv.js": 647,
	"./ka": 648,
	"./ka.js": 648,
	"./kk": 649,
	"./kk.js": 649,
	"./km": 650,
	"./km.js": 650,
	"./kn": 651,
	"./kn.js": 651,
	"./ko": 652,
	"./ko.js": 652,
	"./ky": 653,
	"./ky.js": 653,
	"./lb": 654,
	"./lb.js": 654,
	"./lo": 655,
	"./lo.js": 655,
	"./lt": 656,
	"./lt.js": 656,
	"./lv": 657,
	"./lv.js": 657,
	"./me": 658,
	"./me.js": 658,
	"./mi": 659,
	"./mi.js": 659,
	"./mk": 660,
	"./mk.js": 660,
	"./ml": 661,
	"./ml.js": 661,
	"./mr": 662,
	"./mr.js": 662,
	"./ms": 663,
	"./ms-my": 664,
	"./ms-my.js": 664,
	"./ms.js": 663,
	"./my": 665,
	"./my.js": 665,
	"./nb": 666,
	"./nb.js": 666,
	"./ne": 667,
	"./ne.js": 667,
	"./nl": 668,
	"./nl-be": 669,
	"./nl-be.js": 669,
	"./nl.js": 668,
	"./nn": 670,
	"./nn.js": 670,
	"./pa-in": 671,
	"./pa-in.js": 671,
	"./pl": 672,
	"./pl.js": 672,
	"./pt": 673,
	"./pt-br": 674,
	"./pt-br.js": 674,
	"./pt.js": 673,
	"./ro": 675,
	"./ro.js": 675,
	"./ru": 676,
	"./ru.js": 676,
	"./sd": 677,
	"./sd.js": 677,
	"./se": 678,
	"./se.js": 678,
	"./si": 679,
	"./si.js": 679,
	"./sk": 680,
	"./sk.js": 680,
	"./sl": 681,
	"./sl.js": 681,
	"./sq": 682,
	"./sq.js": 682,
	"./sr": 683,
	"./sr-cyrl": 684,
	"./sr-cyrl.js": 684,
	"./sr.js": 683,
	"./ss": 685,
	"./ss.js": 685,
	"./sv": 686,
	"./sv.js": 686,
	"./sw": 687,
	"./sw.js": 687,
	"./ta": 688,
	"./ta.js": 688,
	"./te": 689,
	"./te.js": 689,
	"./tet": 690,
	"./tet.js": 690,
	"./th": 691,
	"./th.js": 691,
	"./tl-ph": 692,
	"./tl-ph.js": 692,
	"./tlh": 693,
	"./tlh.js": 693,
	"./tr": 694,
	"./tr.js": 694,
	"./tzl": 695,
	"./tzl.js": 695,
	"./tzm": 696,
	"./tzm-latn": 697,
	"./tzm-latn.js": 697,
	"./tzm.js": 696,
	"./uk": 698,
	"./uk.js": 698,
	"./ur": 699,
	"./ur.js": 699,
	"./uz": 700,
	"./uz-latn": 701,
	"./uz-latn.js": 701,
	"./uz.js": 700,
	"./vi": 702,
	"./vi.js": 702,
	"./x-pseudo": 703,
	"./x-pseudo.js": 703,
	"./yo": 704,
	"./yo.js": 704,
	"./zh-cn": 705,
	"./zh-cn.js": 705,
	"./zh-hk": 706,
	"./zh-hk.js": 706,
	"./zh-tw": 707,
	"./zh-tw.js": 707
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
webpackContext.id = 1265;

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_office_create_office__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__building_profile_building_profile__ = __webpack_require__(366);
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
        selector: 'page-building-list',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/building-list/building-list.html"*/'<!--\n  Generated template for the BuildingListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n        <ion-title>Edificios</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card *ngFor="let item of buildings; let i = index;">\n        <ion-item (click)="viewBuilding(item)">\n            <ion-avatar item-start>\n                <img src="assets/imgs/building.jpg">\n            </ion-avatar>\n            <h2>{{item.name}}</h2>\n            <p>{{item.description}}</p>\n        </ion-item>\n    </ion-card>\n    <button ion-button block (click)="createOffice()">Create Office</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/building-list/building-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_building__["a" /* BuildingProvider */]])
], BuildingListPage);

//# sourceMappingURL=building-list.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(34);
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
    function PushServiceProvider(http, userService) {
        //console.log('Hello PushServiceProvider Provider');
        this.http = http;
        this.userService = userService;
        this.PUSH_CREATE_URL = 'https://api.ionic.io/push/notifications';
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */];
        myHeaders.set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWNiNWNkNC00NmE1LTRlODEtYTg3Yi01ZjZlNGFjZDI2OGMifQ.F7u4At0Uxv6qZaY6fYI0ud4khZyrlPoVZn9almiV1u0");
        myHeaders.set('Content-Type', 'application/json');
        this.authOpt = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: myHeaders,
        });
    }
    PushServiceProvider.prototype.notiBuildingManagerForRequest = function (requestId, message, token) {
        var _this = this;
        this.userService.getUsersByLevel(7)
            .subscribe(function (data) {
            var userDevices = [];
            for (var i = 0; i < data.length; i++) {
                _this.userService.getDeviceById(data[i].email, token)
                    .subscribe(function (data1) {
                    userDevices.push(data1.device_token);
                    if (userDevices.length == data.length) {
                        console.log("requestid and message", requestId, message, userDevices);
                        var pushData = {
                            "tokens": userDevices,
                            "profile": "prod",
                            "notification": {
                                "message": message,
                                "payload": {
                                    "type": "request",
                                    "typeKey": requestId
                                }
                            }
                        };
                        console.log("push Data", pushData);
                        _this.http.post(_this.PUSH_CREATE_URL, pushData, _this.authOpt).map(function (res) { return res.json(); }).subscribe(function (data) {
                            console.log('Notification sent successfully!');
                        }, function (err) {
                            console.log('Notification sending error!');
                        }, function () { return console.log('Create Notification'); });
                    }
                }, function (data1) {
                });
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
                    "tokens": [userDevice['device_token']],
                    "profile": "prod",
                    "notification": {
                        "message": message,
                        "payload": {
                            "type": "request",
                            "typeKey": requestId
                        }
                    }
                };
                _this.http.post(_this.PUSH_CREATE_URL, pushData, _this.authOpt).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log('Notification sent successfully!');
                }, function (err) {
                    console.log('Notification sending error!');
                }, function () { return console.log('Create Notification'); });
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]])
], PushServiceProvider);

//# sourceMappingURL=push-service.js.map

/***/ }),

/***/ 206:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 235:
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
webpackEmptyAsyncContext.id = 235;

/***/ }),

/***/ 278:
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
webpackEmptyAsyncContext.id = 278;

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
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
        this.officeUrl = this.baseUrl + "office";
        this.requestUrl = this.baseUrl + "request";
        this.stepUrl = this.baseUrl + "step";
        this.getUserUrl = this.baseUrl + "getuser";
        this.deviceTokenUrl = this.baseUrl + "device";
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

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_service__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(179);
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
    UserService.prototype.getAllOffices = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseService.officeUrl + "?token=" + token, options)
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
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__base_service__["a" /* BaseService */]])
], UserService);

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateOfficePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
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
            level: 3.1,
            password: this.makePassword(),
            blood_type: '',
            officeKey: ''
        };
        this.renter = {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            level: 3.2,
            password: this.makePassword(),
            blood_type: '',
            officeKey: ''
        };
    };
    CreateOfficePage.prototype.makePassword = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
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
        this.userService.createOffice(this.office)
            .subscribe(function (data) {
            _this.loading.dismiss();
            console.log("office Data:", data);
            if (data.message == 'Success') {
                var alert_1 = _this.alertCtrl.create({
                    title: "Success", subTitle: "Office has been created successfully.", buttons: ['OK']
                });
                alert_1.present();
                _this.owner.officeKey = data.office_id;
                _this.renter.officeKey = data.office_id;
                _this.userService.signUp(_this.owner)
                    .subscribe(function (data) {
                    _this.userService.signUp(_this.renter)
                        .subscribe(function (data1) {
                        _this.navCtrl.pop();
                    }, function (data1) {
                    });
                }, function (data) {
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
        selector: 'page-create-office',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/create-office/create-office.html"*/'<!--\n  Generated template for the CreateOfficePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Create Office</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item>\n            <ion-label>Select Building</ion-label>\n            <ion-select [(ngModel)]="office.buildingId" interface="popover" (ngModelChange)="updateFloors()">\n                <ion-option value="{{item.id}}" *ngFor="let item of buildings">{{item.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label>Select Floor</ion-label>\n            <ion-select interface="popover" [(ngModel)]="office.floorId">\n                <ion-option value="{{item.id}}" *ngFor="let item of floors">{{item.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Office #</ion-label>\n            <ion-input type="text" [(ngModel)]="office.name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Company</ion-label>\n            <ion-input type="text" [(ngModel)]="office.company"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Area - Mts 2</ion-label>\n            <ion-input type="text" [(ngModel)]="office.area"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Garages</ion-label>\n            <ion-input type="text" [(ngModel)]="office.garages"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Co-Pay</ion-label>\n            <ion-input type="text" [(ngModel)]="office.coPay"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>\n            Owner Info\n        </ion-list-header>\n        <ion-item>\n            <ion-label fixed>First Name</ion-label>\n            <ion-input type="text" [(ngModel)]="owner.first_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Last Name</ion-label>\n            <ion-input type="text" [(ngModel)]="owner.last_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Phone Number</ion-label>\n            <ion-input type="text" [(ngModel)]="owner.phone_number" [textMask]="{mask: phoneMask, guide: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Email Address</ion-label>\n            <ion-input type="text" [(ngModel)]="owner.email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Password</ion-label>\n            <ion-input type="text" [(ngModel)]="owner.password"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Blood Type</ion-label>\n            <ion-input type="text" [(ngModel)]="owner.blood_type"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>\n            Renter Info\n        </ion-list-header>\n        <ion-item>\n            <ion-label fixed>First Name</ion-label>\n            <ion-input type="text" [(ngModel)]="renter.first_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Last Name</ion-label>\n            <ion-input type="text" [(ngModel)]="renter.last_name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Phone Number</ion-label>\n            <ion-input type="text" [(ngModel)]="renter.phone_number" [textMask]="{mask: phoneMask, guide: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Email Address</ion-label>\n            <ion-input type="text" [(ngModel)]="renter.email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Password</ion-label>\n            <ion-input type="text" [(ngModel)]="renter.password"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Blood Type</ion-label>\n            <ion-input type="text" [(ngModel)]="renter.blood_type"></ion-input>\n        </ion-item>\n    </ion-list>\n\n    <button ion-button block (click)="createOffice()" [disabled]="!isConnected">Submit</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/create-office/create-office.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CreateOfficePage);

//# sourceMappingURL=create-office.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
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
        //this.navCtrl.push('OfficeProfilePage', {officeId: office.$id});
    };
    BuildingProfilePage.prototype.editOffice = function (office, slidingItem) {
        // slidingItem.close();
        // this.navCtrl.push('EditOfficePage', {officeId: office.$id});
    };
    return BuildingProfilePage;
}());
BuildingProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-building-profile',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/building-profile/building-profile.html"*/'<!--\n  Generated template for the BuildingProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{building.name}}{{floorId ? \' - \' + floor.name : \'\'}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header>\n            Office List\n        </ion-list-header>\n        <ion-item-sliding *ngFor="let item of offices" #slidingItem>\n            <ion-item (click)="viewOffice(item)">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/working-icon.png">\n                </ion-avatar>\n                <h2>{{item.company}}</h2>\n                <p>{{item.name}}</p>\n            </ion-item>\n            <ion-item-options>\n                <button ion-button color="primary" (click)="editOffice(item, slidingItem)">Edit</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/building-profile/building-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */]])
], BuildingProfilePage);

//# sourceMappingURL=building-profile.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(35);
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
    function LoginPage(navCtrl, alertCtrl, loadingCtrl, userService, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.storage = storage;
        this.user = {
            email: '',
            password: ''
        };
        this.device_token = "1";
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userdata').then(function (val) {
            console.log("userdata", val);
            if (val != null) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
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
                subTitle: 'Fill user email and password',
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
                    var params = {
                        token: data.token,
                        device_token: _this.device_token
                    };
                    _this.userService.insertDeviceToken(params)
                        .subscribe(function (data1) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    }, function (data1) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    });
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: "Error", subTitle: "Invalid Credential", buttons: ['OK']
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
        selector: 'page-login',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/login/login.html"*/'<!-- <ion-header>\n\n    <ion-navbar>\n        \n    </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content padding>\n\n    <ion-card style="margin-top: 15vw;">\n\n        <img src="assets/imgs/wtcb.jpg"/>\n\n        <ion-item>\n            <ion-label stacked>EMAIL</ion-label>\n            <ion-input type="text" placeholder="correo@compania.com" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label stacked>PASSWORD</ion-label>\n            <ion-input type="password" placeholder="*******" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n        <div style="margin-bottom:20px;"></div>\n    </ion-card>\n\n    <button ion-button clear block color="dark" (click)="doLogin()">Login</button>\n\n    <button ion-button clear block (click)="signUp()">Or create an account</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
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
    function SignupPage(navCtrl, alertCtrl, loadingCtrl, userService, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.storage = storage;
        this.user = {
            username: '',
            email: '',
            password: '',
            level: 3
        };
        this.device_token = "1";
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
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    }, function (data1) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
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
                console.log("SignupError");
                var alert = _this.alertCtrl.create({
                    title: "Error", subTitle: "Signup Error", buttons: ['OK']
                });
                alert.present();
                _this.navCtrl.pop();
            });
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-signup',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/signup/signup.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Signup</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n\n        <img src="assets/imgs/building.jpg"/>\n\n        <ion-item>\n            <ion-input type="text" placeholder="Username" [(ngModel)]="user.username"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-input type="email" placeholder="Email" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-input type="password" placeholder="Password" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-select [(ngModel)]="user.level" interface="popover" placeholder="Access Level">\n                <ion-option value="3">Office Renter (Owner)</ion-option>\n                <ion-option value="5">Vendor / Technician</ion-option>\n            </ion-select>\n        </ion-item>\n\n    </ion-card>\n\n    <button ion-button clear block color="dark" (click)="doSignUp()">Sign Up</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__otrs_request_otrs_request__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_firebase_analytics__ = __webpack_require__(415);
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
    function MaintenanceViewPage(navCtrl, storage, userService, loadingCtrl, alertCtrl, firebaseAnalytics) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.firebaseAnalytics = firebaseAnalytics;
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
    };
    MaintenanceViewPage.prototype.delete = function (item) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.userService.deleteRequest(item._id, this.token)
            .subscribe(function (data) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: "Success", subTitle: "Request is deleted successfully!", buttons: ['OK']
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
                if (data[i].step >= 5) {
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
                if (data[i].step >= 5) {
                    _this.closedRequests.push(data[i]);
                }
                else {
                    _this.openedRequests.push(data[i]);
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
        else {
            this.firebaseAnalytics.logEvent('page_view', { page: "dashboard" })
                .then(function (res) { return console.log("firebase analytics -success ", res); })
                .catch(function (error) { return console.error("firebase analytics - fail", error); });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */], { requestKey: request._id });
        }
    };
    return MaintenanceViewPage;
}());
MaintenanceViewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-maintenance-view',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-view/maintenance-view.html"*/'<!--\n  Generated template for the MaintenanceViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img class="menu-icon" src="assets/imgs/menu_icon.png" />\n        </button>\n        <ion-title>SOLICITUDES DE MANTENIMIENTO</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="main-bg">\n    <button class="main-btn" ion-button block (click)="createNewRequest()" *ngIf="user.level < 7">ENVIAR NUEVA SOLICITUD</button>\n\n    <ion-list style="margin-top: 20px;" *ngIf="openedRequests.length > 0">\n\n        <ion-list-header class="header-style">\n            SOLICITUDES ABIERTAS\n        </ion-list-header>\n\n        <div *ngIf="user.level == \'7\'">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened7 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n\n                <ion-item-options side="right">\n                  <button ion-button (click)="edit(item)">\n                    <ion-icon name="ios-create"></ion-icon>\n                    Edit\n                  </button>\n                  <button ion-button color="danger" (click)="delete(item)">\n                    <ion-icon name="ios-trash"></ion-icon>\n                    Delete\n                  </button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level == \'3.1\'">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened3_1 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level == \'3.2\'">\n            <ion-item-sliding *ngFor="let item of openedRequests">\n                <ion-item (click)="viewRequest(item)" class="row row-content" [ngClass]="{\'row-content-bold\' : item.opened3_2 == false}">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n    </ion-list>\n\n    <ion-list style="margin-top: 20px;" *ngIf="closedRequests.length > 0">\n        <ion-list-header class="header-style">\n            SOLICITUDES CERRADAS\n        </ion-list-header>\n        <div *ngIf="user.level == \'7\'">\n            <ion-item-sliding *ngFor="let item of closedRequests">\n                <ion-item  (click)="viewRequest(item)" class="row row-content">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                </ion-item>\n\n                <ion-item-options side="right">\n                  <button ion-button color="danger" (click)="delete(item)">\n                    <ion-icon name="ios-trash"></ion-icon>\n                    Delete\n                  </button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </div>\n\n        <div *ngIf="user.level != \'7\'">\n            <ion-item-sliding *ngFor="let item of closedRequests">\n                <ion-item  (click)="viewRequest(item)" class="row row-content">\n                    <div class="col width-10">\n                        <img src="assets/imgs/working-icon.png" />\n                    </div>\n                    <div class="col width-30">\n                        <div class="office-name">{{item.officeName}}</div>\n                        <div class="building-name">{{item.buildingName}}-{{item.floorName}}</div>\n                    </div>\n\n                    <div class="col width-20">\n                        <ion-icon name="md-calendar"></ion-icon>\n                        <div class="created-date">{{item.created_at.substr(0, 10)}}</div>\n                    </div>\n                    \n                    <!-- <div class="col width-30">{{item.officeKey}}</div> -->\n                </ion-item>\n            </ion-item-sliding>\n        </div>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-view/maintenance-view.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */]])
], MaintenanceViewPage);

//# sourceMappingURL=maintenance-view.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtrsRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_push_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_aws_sdk_global__ = __webpack_require__(1010);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_s3__ = __webpack_require__(1170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_s3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_s3__);
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
                }
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
        __WEBPACK_IMPORTED_MODULE_7_aws_sdk_global__["config"].accessKeyId = 'AKIAJNHK7OBATDPIEJJA';
        __WEBPACK_IMPORTED_MODULE_7_aws_sdk_global__["config"].secretAccessKey = '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';
        // AWS.config.accessKeyId = 'AKIAIPQAVOWPUIP2ENSA';
        // AWS.config.secretAccessKey = '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';
        var s3 = new __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_s3___default.a({
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
                    _this.pushService.notiBuildingManagerForRequest(requestKey, "New request is created!", _this.token);
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
                        updated_at5: ''
                    };
                    _this.userService.createStep(newSteps)
                        .subscribe(function (data1) {
                        var alert = _this.alertCtrl.create({
                            title: "Success", subTitle: "Request is submitted successfully!", buttons: ['OK']
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
        selector: 'page-otrs-request',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/otrs-request/otrs-request.html"*/'<!--\n  Generated template for the OtrsRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>NUEVA SOLICITUD</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header class="header-style">\n            <!-- DESCRIBA SU SOLICITUD -->\n            REQUERIMIENTO\n        </ion-list-header>\n\n        <ion-item>\n            \n            <textarea placeholder="DESCRIPCIÓN" class="textarea-style" [(ngModel)]="otrsRequest.comment"></textarea>\n            \n        </ion-item>\n\n        <ion-item>\n            <ion-toggle color="custom" [(ngModel)]="otrsRequest.is_urgent"></ion-toggle>\n            <ion-label style="color: gray;">\n                URGENTE (SUJETO T&C)\n            </ion-label>\n        </ion-item>\n    </ion-list>\n\n    <input type="file" name="file" id="file" class="inputfile" (change)="fileEvent($event)"/>\n    <label for="file" ion-button block class="main-btn">Add Photo</label>\n    <!-- <button ion-button icon-left block (click)="addPhoto()">\n        <ion-icon ios="ios-camera" md="md-camera"></ion-icon>\n        CARGAR FOTO \n    </button> -->\n\n    <ion-row *ngIf="otrsRequest.photos.length > 0">\n        <ion-col col-3 *ngFor="let item of otrsRequest.photos; let i = index;">\n            <img src="{{item}}"/>\n        </ion-col>\n    </ion-row>\n\n    <ion-list style="margin-top: 30px;">\n        <!-- <ion-list-header>\n            INFORMACIÓN CLIENTE\n        </ion-list-header> -->\n        \n        <ion-avatar class="client-avatar">\n            <img src="assets/imgs/working-icon.png">\n        </ion-avatar>\n        \n        <h2 class="header-style" style="text-align: center;">{{office.company}}</h2>\n        <p style="text-align:center; font-size: 15px; color:gray;">{{office.name}}</p>\n        <h2 class="header-style" style="text-align: center; opacity: 0.7; margin-top: 8vw;">{{building_name}} - {{floor_name}}</h2>\n        \n        <!-- <ion-item>\n            <ion-label fixed>Office #</ion-label>\n            <ion-note item-end>{{office._id}}</ion-note>\n        </ion-item> -->\n    </ion-list>\n\n    <button class="main-btn" ion-button block (click)="createNewRequest()">ENVIAR NUEVA SOLICITUD</button>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/otrs-request/otrs-request.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_push_service__["a" /* PushServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_6__providers_building__["a" /* BuildingProvider */]])
], OtrsRequestPage);

//# sourceMappingURL=otrs-request.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaintenanceTrackerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_push_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(414);
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
    function MaintenanceTrackerPage(navCtrl, navParams, loadingCtrl, buildingService, pushService, userService, storage, emailComposer, datePicker, iab) {
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
        this.requestKey = this.navParams.get('requestKey');
        this.request = {};
        this.requestDetail = {
            token: '',
            status1: 0,
            quote: '',
            updated_at1: '',
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
        this.showQuote = false;
        this.quote = '';
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
                    var steps = [
                        {
                            current: 'Received',
                            next: 'SEND QUOTE'
                        }, {
                            current: 'Quote',
                            next: 'TECHNICIAN'
                        }, {
                            current: 'Tech',
                            next: 'COMPLETED'
                        }, {
                            current: 'Completed',
                            next: 'INVOICE'
                        }, {
                            current: 'Paid',
                            next: 'CLOSE'
                        }, {
                            current: 'Closed',
                            next: ''
                        }
                    ];
                    _this.request = data[0];
                    console.log("this.request", _this.request);
                    _this.request.stepText = 'Step ' + _this.request.step;
                    if (_this.authUser['level'] != 4) {
                        _this.request.stepText += ' - ' + steps[_this.request.step - 1].current;
                        _this.request.stepNext = steps[_this.request.step - 1].next;
                    }
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
    MaintenanceTrackerPage.prototype.goToStep2 = function () {
        var _this = this;
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
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager attached quote to your request - " + this.quote, this.token);
        //this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your quote", this.token);
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
        this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your quote", this.token);
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
            var alert = this.alertCtrl.create({
                title: "Error", subTitle: "Please fill in the blanks", buttons: ['OK']
            });
            alert.present();
        }
        else {
            this.requestDetail.step = 3;
            var loading_2 = this.loadingCtrl.create();
            loading_2.present();
            this.userService.updateStep(this.requestDetailKey, this.requestDetail)
                .subscribe(function (data1) {
                var params = {
                    token: _this.token,
                    step: 3
                };
                _this.userService.updateRequest(_this.requestKey, params)
                    .subscribe(function (data) {
                    loading_2.dismiss();
                    _this.request.step = 3;
                    _this.pushService.notiUserForRequest(_this.request.userKey, _this.request._id, "Building manager scheduled technician time to " + _this.technician_date + " " + _this.technician_time, _this.token);
                }, function (data) {
                    loading_2.dismiss();
                });
            }, function (data1) {
                loading_2.dismiss();
            });
        }
    };
    MaintenanceTrackerPage.prototype.acceptSchedule = function () {
        var _this = this;
        this.requestDetail.status2 = 1;
        this.requestDetail.token = this.token;
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
        this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your schedule", this.token);
    };
    MaintenanceTrackerPage.prototype.goToStep4 = function () {
        // let appointment_date;
        // this.datePicker.show({
        //   date: new Date(),
        //   mode: 'datetime',
        //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        // }).then(
        //   date => console.log('Got date: ', date),
        //   err => console.log('Error occurred while getting date: ', err)
        // );
        var _this = this;
        this.requestDetail.token = this.token;
        this.requestDetail.step = 4;
        if (this.authUser.level == 4) {
            this.requestDetail.status2 = 1;
            var loading_3 = this.loadingCtrl.create();
            loading_3.present();
            this.userService.updateStep(this.requestDetailKey, this.requestDetail)
                .subscribe(function (data1) {
                loading_3.dismiss();
            }, function (data1) {
                loading_3.dismiss();
            });
            this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee accepted your schedule", this.token);
        }
        else {
            this.requestDetail.token = this.token;
            this.requestDetail.is_completed = true;
            this.requestDetail.step = 4;
            var loading_4 = this.loadingCtrl.create();
            loading_4.present();
            this.userService.updateStep(this.requestDetailKey, this.requestDetail)
                .subscribe(function (data1) {
                var params = {
                    token: _this.token,
                    step: 4
                };
                _this.userService.updateRequest(_this.requestKey, params)
                    .subscribe(function (data) {
                    loading_4.dismiss();
                    _this.request.step = 4;
                }, function (data) {
                    loading_4.dismiss();
                });
            }, function (data1) {
                loading_4.dismiss();
            });
            // this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager completed your request", this.token);
            this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager accepted your payment", this.token);
        }
    };
    MaintenanceTrackerPage.prototype.payInvoice = function () {
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
        this.requestDetail.token = this.token;
        this.requestDetail.is_paid = true;
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
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager accepted your payment", this.token);
    };
    MaintenanceTrackerPage.prototype.viewInvoice = function () {
        this.showInvoice = !this.showInvoice;
    };
    MaintenanceTrackerPage.prototype.leaveReview = function () {
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
        this.pushService.notiBuildingManagerForRequest(this.request._id, "Employee provided feedback", this.token);
    };
    MaintenanceTrackerPage.prototype.archiveRequest = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var params = {
            token: this.token,
            step: 6
        };
        this.userService.updateRequest(this.requestKey, params)
            .subscribe(function (data) {
            loading.dismiss();
            _this.request.step = 6;
        }, function (data) {
            loading.dismiss();
        });
        this.pushService.notiUserForRequest(this.request.userKey, this.request._id, "Building manager archived your request", this.token);
        this.iab.create('https://www.pse.com.co/inicio');
    };
    return MaintenanceTrackerPage;
}());
MaintenanceTrackerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-maintenance-tracker',template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-tracker/maintenance-tracker.html"*/'<!--\n  Generated template for the MaintenanceTrackerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>ESTADO DE SU SOLICITUD</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-list>\n        <ion-list-header class="header-style">\n            FASE\n        </ion-list-header>\n    </ion-list>\n\n    <div class="wrapper">\n        <ul class="StepProgress">\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 1, \'current\': request.step == 1}">\n                <strong class="subheader-style">FASE 1 - Solicitud</strong>\n                <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 1">\n                    <ion-item>\n                        <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                        -\n                        <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                    </ion-item>\n                    \n                    <ion-item>\n                        <ion-toggle color="custom" checked="true" disabled="true"></ion-toggle>\n                        <ion-label class="icon-style">\n                            Request Sent\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n                <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8)">\n                    <ion-item>\n                        <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                        -\n                        <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        <ion-toggle color="custom" [(ngModel)]="showQuote"></ion-toggle>\n                        <ion-label>\n                            CARGAR COTIZACIÓN\n                        </ion-label>\n                    </ion-item>\n                    <ion-item *ngIf="showQuote">\n                        <div>\n                            <textarea placeholder="Your comments" class="textarea-style" [(ngModel)]="quote"></textarea>\n                        </div>\n                    </ion-item>\n                </ion-list>\n\n                <button ion-button block (click)="goToStep2()" class="main-btn" style="margin-top:2vw;" *ngIf="(authUser.level == 7 || authUser.level == 8)">\n                    ENVIAR COTIZACIÓN\n                </button>\n\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 2, \'current\': request.step == 2}">\n                <strong class="subheader-style">FASE 2 - Cotización</strong>\n                <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 2">\n                    <ion-item>\n                        <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                        -\n                        <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                    </ion-item>\n                    \n                    \n                    <p class="icon-style" style="word-wrap: break-word;">You would get email from Admin about Quote. Please check your email. </p>\n                    \n                    <p class="icon-style" *ngIf = "quoteAccept" style="word-wrap: break-word;">Quote Accepted</p>\n                    <!-- <ion-item>\n                        <ion-toggle [(ngModel)]="quoteAccept"></ion-toggle>\n                        <ion-label>\n                            Accept Quote\n                        </ion-label>\n                    </ion-item> -->\n                </ion-list>\n\n                <button ion-button block (click)="acceptQuote()" class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 2 && (authUser.level == \'3.1\' || authUser.level == \'3.2\') && !quoteAccept">\n                    Accept Quote\n                </button>\n\n                <ion-list no-lines *ngIf="(authUser.level == 7 || authUser.level == 8)">\n                    <ion-item>\n                        <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                        -\n                        <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                    </ion-item>\n\n                    <ion-item>\n                        <ion-toggle color="custom" [(ngModel)]="quoteAccept" disabled="true"></ion-toggle>\n                        <ion-label>\n                            COTIZACIÓN ACEPTADA\n                        </ion-label>\n                    </ion-item>\n                    <ion-item *ngIf="quoteAccept">\n                        <ion-toggle color="custom" [(ngModel)]="showSchedule"></ion-toggle>\n                        <ion-label>\n                            Schedule Appointment\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n                <ion-list no-lines *ngIf="showSchedule">\n                    <ion-item>\n                        <ion-label>Date</ion-label>\n                        <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="technician_date"></ion-datetime>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Time</ion-label>\n                        <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="technician_time"></ion-datetime>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Technician Name</ion-label>\n                        <ion-input type="text" [(ngModel)]="technician_name"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Company Name</ion-label>\n                        <ion-input type="text" [(ngModel)]="technician_company"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Telephone</ion-label>\n                        <ion-input type="text" [(ngModel)]="technician_phone"></ion-input>\n                    </ion-item>\n                </ion-list>\n\n                <button ion-button block class="main-btn" style="margin-top:2vw;" (click)="goToStep3()"\n                        *ngIf="(authUser.level == 7 || authUser.level == 8) && quoteAccept">\n                    PROGRAMAR VISITA\n                </button>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 3, \'current\': request.step == 3}">\n                <strong class="subheader-style">FASE 3 - Inicio & Finalización trabajo</strong>\n\n                <ion-list no-lines *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 3">\n                    <ion-item>\n                        <ion-icon class="icon-style" style="padding-left:0;" name="md-calendar"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY\'}}</ion-note>\n                        -\n                        <ion-icon class="icon-style" name="ios-clock-outline"></ion-icon>\n                        <ion-note class="icon-style">{{request.created_at | amLocale:\'en\' | amDateFormat:\'h:mm a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Date</ion-label>\n                        <ion-input type="text" [(ngModel)]="requestDetail.technician_info.date" [readonly]="true"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Technician Time</ion-label>\n                        <ion-input type="text" [(ngModel)]="requestDetail.technician_info.time" [readonly]="true"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Technician Name</ion-label>\n                        <ion-input type="text" [(ngModel)]="requestDetail.technician_info.name" [readonly]="true"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Company Name</ion-label>\n                        <ion-input type="text" [(ngModel)]="requestDetail.technician_info.company" [readonly]="true"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Telephone</ion-label>\n                        <ion-input type="text" [(ngModel)]="requestDetail.technician_info.phone" [readonly]="true"></ion-input>\n                    </ion-item>\n\n                    <p class="icon-style" *ngIf = "scheduleAccept" style="word-wrap: break-word;">Schedule Accepted</p>\n                    <!-- <ion-item>\n                        <ion-toggle [(ngModel)]="scheduleAccept"></ion-toggle>\n                        <ion-label>\n                            Accept Schedule\n                        </ion-label>\n                    </ion-item> -->\n                </ion-list>\n\n                <button ion-button block (click)="acceptSchedule()" class="main-btn" style="margin-top:2vw;" *ngIf="request.step == 3 && (authUser.level == \'3.1\' || authUser.level == \'3.2\') && !scheduleAccept">\n                    Accept Schedule\n                </button>\n\n                <ion-list *ngIf="(authUser.level == 7 || authUser.level == 8)">\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        FECHA DE SOLICITUD\n                        <ion-note item-end>{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        {{office.buildingName}} | {{office.floorName}} | {{office.name}}\n                    </ion-item>\n                    <ion-item>\n                        <ion-toggle [(ngModel)]="scheduleAccept" disabled="true"></ion-toggle>\n                        <ion-label>\n                            PROGRAMACIÓN ACEPTADA\n                        </ion-label>\n                    </ion-item>\n                    <ion-item *ngIf="scheduleAccept">\n                        <ion-label>Job Complete</ion-label>\n                        <ion-checkbox [(ngModel)]="is_completed"></ion-checkbox>\n                    </ion-item>\n                </ion-list>\n\n                <button ion-button block (click)="goToStep4()"\n                        *ngIf="(authUser.level == 7 || authUser.level == 8) && scheduleAccept">\n                    PROGRAMAR VISITA\n                </button>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 4, \'current\': request.step == 4}">\n                <strong>FASE 4 - Facturación</strong>\n\n                <ion-list *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 4">\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        FECHA DE SOLICITUD\n                        <ion-note item-end>{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        {{office.buildingName}} | {{office.floorName}} | {{office.name}}\n                    </ion-item>\n                    <ion-item>\n                        <ion-toggle [(ngModel)]="requestDetail.is_completed"></ion-toggle>\n                        <ion-label>\n                            Job Complete\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n                <button ion-button block icon-left *ngIf="request.step == 4 && (authUser.level == 4)" (click)="payInvoice()">\n                    <ion-icon ios="ios-card" md="md-card"></ion-icon>\n                    Pay Invoice\n                </button>\n\n                <ion-list *ngIf="(authUser.level == 7 || authUser.level == 8)">\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        FECHA DE SOLICITUD\n                        <ion-note item-end>{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        {{office.buildingName}} | {{office.floorName}} | {{office.name}}\n                    </ion-item>\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        FACTURA\n                        <ion-note item-end>EN ESPERA</ion-note>\n                    </ion-item>\n                </ion-list>\n\n                <ion-card *ngIf="requestDetail.status3 && (authUser.level == 7 || authUser.level == 8)  && request.step == 4">\n                    <img src="{{requestDetail.invoice}}"/>\n                </ion-card>\n\n                <button ion-button block icon-left *ngIf="request.step == 4 && (authUser.level == 7 || authUser.level == 8)" (click)="paidInvoice()">\n                    <ion-icon ios="ios-card" md="md-card"></ion-icon>\n                    FACTURA PAGADA\n                </button>\n            </li>\n            <li class="StepProgress-item" [ngClass]="{\'is-done\': request.step > 5, \'current\': request.step == 5}">\n                <strong>FASE 5 -  Pago</strong>\n\n                <ion-list *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 5">\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        FECHA DE SOLICITUD\n                        <ion-note item-end>{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        {{office.buildingName}} | {{office.floorName}} | {{office.name}}\n                    </ion-item>\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        Job Paid\n                        <ion-note item-end (click)="viewInvoice()">View</ion-note>\n                    </ion-item>\n                </ion-list>\n\n                <ion-card *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 5 && showInvoice">\n                    <img src="{{requestDetail.invoice}}"/>\n                </ion-card>\n\n                <ion-list *ngIf="(authUser.level == \'3.1\' || authUser.level == \'3.2\') && request.step == 5">\n                    <ion-item>\n                        <ion-label>Please rate work</ion-label>\n                        <ion-select [(ngModel)]="rate">\n                            <ion-option value="5">5 stars</ion-option>\n                            <ion-option value="4">4 stars</ion-option>\n                            <ion-option value="3">3 stars</ion-option>\n                            <ion-option value="2">2 stars</ion-option>\n                            <ion-option value="1">1 stars</ion-option>\n                            <ion-option value="0">0 stars</ion-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label>Comments</ion-label>\n                        <div item-content style="width: 70%;">\n                            <textarea placeholder="You comments" style="width: 100%; height: 80px;" [(ngModel)]="comment"></textarea>\n                        </div>\n                    </ion-item>\n                </ion-list>\n\n                <button ion-button block icon-left *ngIf="request.step == 5 && (authUser.level == \'3.1\' || authUser.level == \'3.2\')" (click)="leaveReview()">\n                    <ion-icon ios="ios-star" md="md-star"></ion-icon>\n                    Leave Review\n                </button>\n\n\n                <ion-list *ngIf="(authUser.level == 7 || authUser.level == 8)">\n                    <ion-item>\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        FECHA DE SOLICITUD\n                        <ion-note item-end>{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n                    </ion-item>\n                    <ion-item>\n                        {{office.buildingName}} | {{office.floorName}} | {{office.name}}\n                    </ion-item>\n                    <ion-item *ngIf="requestDetail.status5 == 0">\n                        <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n                        Complete\n                        <ion-note item-end>Pending Review</ion-note>\n                    </ion-item>\n                    <ion-item *ngIf="requestDetail.status5 == 1">\n                        Rate\n                        <ion-note item-end>{{requestDetail.star}} stars</ion-note>\n                    </ion-item>\n                    <ion-item *ngIf="requestDetail.status5 == 1">\n                        {{requestDetail.comment}}\n                    </ion-item>\n                </ion-list>\n\n                <button ion-button block icon-left *ngIf="request.step == 5 && ((authUser.level == 7 || authUser.level == 8))" (click)="archiveRequest()">\n                    <ion-icon ios="ios-cloud-download" md="md-cloud-download"></ion-icon>\n                    Archive MAINT. REQ.\n                </button>\n            </li>\n        </ul>\n    </div>\n\n    <ion-list style="margin-top: 20px;">\n        <ion-list-header>\n            INFORMACIÓN CLIENTE\n        </ion-list-header>\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="assets/imgs/working-icon.png">\n            </ion-avatar>\n            <h2>{{office.company}}</h2>\n            <p>{{office.name}}</p>\n        </ion-item>\n        <ion-item>\n            <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>\n            FECHA DE SOLICITUD\n            <ion-note item-end *ngIf="authUser.level != 4">{{request.created_at | amLocale:\'en\' | amDateFormat:\'MMM Do YYYY, h:mm:ss a\'}}</ion-note>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>\n            SOLICITADO POR\n        </ion-list-header>\n        <ion-item>\n            <ion-icon ios="ios-person" md="md-person"></ion-icon>\n            {{user.first_name + \' \' + user.last_name}}\n        </ion-item>\n        <ion-item>\n            <ion-toggle [(ngModel)]="viewRequest"></ion-toggle>\n            <ion-label>\n                VER DETALES DE LA SOLICITUD\n            </ion-label>\n        </ion-item>\n    </ion-list>\n\n    <ion-card *ngIf="viewRequest">\n        <ion-card-content>\n            <p>{{request.comment}}</p>\n        </ion-card-content>\n\n        <ion-slides pager="true" *ngIf="request.photos && request.photos.length > 0">\n            <ion-slide *ngFor="let item of request.photos;">\n                <img src="{{item}}"/>\n            </ion-slide>\n        </ion-slides>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/pages/maintenance-tracker/maintenance-tracker.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_building__["a" /* BuildingProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__providers_push_service__["a" /* PushServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_push_service__["a" /* PushServiceProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__["a" /* DatePicker */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__["a" /* DatePicker */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _k || Object])
], MaintenanceTrackerPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=maintenance-tracker.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
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
                        name: 'Administration'
                    },
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
                ]
            }
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

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(724);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(1240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_maintenance_view_maintenance_view__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_maintenance_tracker_maintenance_tracker__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_otrs_request_otrs_request__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_building_list_building_list__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_create_office_create_office__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_building_profile_building_profile__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_user_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_base_service__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_building__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_push_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angular2_text_mask__ = __webpack_require__(1241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_angular2_text_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_splash_screen__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2__ = __webpack_require__(1242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_cloud_angular__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_email_composer__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_date_picker__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_in_app_browser__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_badge__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_angular2_moment__ = __webpack_require__(1264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_firebase_analytics__ = __webpack_require__(415);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































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
            __WEBPACK_IMPORTED_MODULE_10__pages_maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_20_angular2_text_mask__["TextMaskModule"],
            __WEBPACK_IMPORTED_MODULE_30_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_24_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_19__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_25__ionic_cloud_angular__["a" /* CloudModule */].forRoot(cloudSettings)
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
            __WEBPACK_IMPORTED_MODULE_10__pages_maintenance_tracker_maintenance_tracker__["a" /* MaintenanceTrackerPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_15__providers_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_16__providers_base_service__["a" /* BaseService */],
            __WEBPACK_IMPORTED_MODULE_17__providers_building__["a" /* BuildingProvider */],
            __WEBPACK_IMPORTED_MODULE_18__providers_push_service__["a" /* PushServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_maintenance_view_maintenance_view__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_building_list_building_list__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_cloud_angular__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_badge__ = __webpack_require__(581);
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
    function MyApp(platform, statusBar, splashScreen, storage, push, events, toastCtrl, badge) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.push = push;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.badge = badge;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Mantenimiento', component: __WEBPACK_IMPORTED_MODULE_6__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */] },
            { title: 'Edificios', component: __WEBPACK_IMPORTED_MODULE_7__pages_building_list_building_list__["a" /* BuildingListPage */] },
            { title: 'Sign Out', component: null }
        ];
        if (!this.platform.is('core')) {
            //push configuration
            platform.ready().then(function () {
                _this.push.register().then(function (t) {
                    return _this.push.saveToken(t);
                }).then(function (t) {
                    console.log('Token saved:', t.token);
                    // this.auth.setDeviceToken(t.token).then(res => {
                    //     this.auth.registerDeviceToken();
                    // });
                    _this.storage.set('device_token', t.token);
                });
                _this.push.rx.notification()
                    .subscribe(function (msg) {
                    _this.badge.increase(1);
                    //                        //console.log(msg);
                    alert(msg.title + ': ' + msg.text);
                    var duration = 4000;
                    var timeoutHandler = setTimeout(function () { toast.dismiss({ autoclose: true }); }, duration);
                    var toast = _this.toastCtrl.create({
                        message: msg.text,
                        showCloseButton: true,
                        closeButtonText: 'View',
                        position: 'top'
                    });
                    toast.onDidDismiss(function (data) {
                        clearTimeout(timeoutHandler);
                        //                            //console.log('time elapsed',data);
                        if (!data || !data.autoclose) {
                            if (msg.payload['type'] == "request") {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_maintenance_view_maintenance_view__["a" /* MaintenanceViewPage */]).then(function () {
                                    _this.events.publish('noti:request', msg.payload['typeKey']);
                                });
                            }
                        }
                    });
                    toast.present();
                });
            });
        }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == undefined) {
            this.storage.remove("userdata");
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/dodobal-PC/wtcb-new/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/dodobal-PC/wtcb-new/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9__ionic_cloud_angular__["b" /* Push */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_badge__["a" /* Badge */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[719]);
//# sourceMappingURL=main.js.map