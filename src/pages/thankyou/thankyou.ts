import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';



@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class Thankyou {
  WooCommerce: any;
  @ViewChild('content') childNavCtrl: NavController;
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage,public modalCtrl:  ModalController, private WP : WoocommerceProvider) {

    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad Thankyou');
      }
   
  onHomePage(){
    this.navCtrl.setRoot(HomePage);
  }
  
  
}