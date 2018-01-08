import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popup',
  templateUrl: 'popup.html'
})
export class PopupPage {

	data={comment: ''};
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }

  sendNewTicket(){
  	if (this.data.comment != ''){
  		this.viewCtrl.dismiss(this.data);
  	}
  }
}
