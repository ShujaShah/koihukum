import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import {Checkout} from '../checkout/checkout'

import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';



@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class Thankyou {
  WooCommerce: any;
  order_number:any;
  @ViewChild('content') childNavCtrl: NavController;
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage,public modalCtrl:  ModalController, private WP : WoocommerceProvider) {


      this.order_number = this.navParams.get("order_number");

    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad Thankyou');
      }
   
  onHomePage(){
    this.navCtrl.setRoot(HomePage);
  }
  
  
}