import { Component } from '@angular/core';
import {NavController,NavParams,LoadingController} from 'ionic-angular';
import {SearchPage} from '../search/search';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
    selector: 'page-booking-details',
    templateUrl: 'booking-details.html',
  })
  
  export class BookingDetails {
    searchQuery : string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider, 
      public loadingCtrl: LoadingController) { }

      
      ionViewDidLoad() {
        console.log('ionViewDidLoad BookingDetails');
      }


  onSearch(event){
    if(this.searchQuery.length > 0){
      this.navCtrl.push(SearchPage, {"searchQuery": this.searchQuery});
    }
  }
}