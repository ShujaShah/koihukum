import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductDetails } from '../product-details/product-details';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = "";
  WooCommerce: any;
  products: any[] = [];
  page: number = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private WP: WoocommerceProvider, public loadingCtrl: LoadingController) {

    console.log(this.navParams.get("searchQuery"));
    this.searchQuery = this.navParams.get("searchQuery");
   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'bubbles'
    });
    loading.present();

    this.WooCommerce = WP.init();
    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then((searchData) => {
      this.products = JSON.parse(searchData.body).products; 
      
      loading.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  loadMoreProducts(event){

    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then((searchData) => {
      this.products = this.products.concat(JSON.parse(searchData.body).products);

      if(JSON.parse(searchData.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();

      }

      event.complete();
      this.page ++;

    });
  }
  openProductPage(product){
    this.navCtrl.push(ProductDetails,{ "product":product} );
  }
 

}