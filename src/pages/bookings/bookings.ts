import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetails}from '../product-details/product-details';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import {BookingDetails} from '../booking-details/booking-details';


@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class Bookings {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider, 
    public loadingCtrl: LoadingController) {

    this.page = 1;
   this.category = this.navParams.get("category");

    this.WooCommerce = WP.init();

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        spinner: 'bubbles'
      });
      loading.present();
       
      this.WooCommerce.getAsync("products?filter[category]=services").then((data) => {
      console.log(JSON.parse(data.body));
      
      loading.dismiss();
      
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Bookings');
  }
   
  openBookingPage(product){
    this.navCtrl.push(BookingDetails,{ "product":product} );
  }
  

}