import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetails}from '../product-details/product-details';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import {SearchPage} from '../search/search';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;
  searchQuery : string = "";

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
       
      this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body)); loading.dismiss();
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategory');
  }

  loadMoreProducts(event) {
    this.page++;
    console.log("Getting page " + this.page);
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
      let temp = (JSON.parse(data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products)
      console.log(this.products);
      event.complete();

      if (temp.length < 20)
        event.enable(false);
    })
  }
  openProductPage(product){
    this.navCtrl.push(ProductDetails,{ "product":product} );
  }
 
  onSearch(event){
    if(this.searchQuery.length > 0){
      this.navCtrl.push(SearchPage, {"searchQuery": this.searchQuery});
    }
  }
  

}