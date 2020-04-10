import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import {ProductDetails} from '../product-details/product-details';
import {SearchPage} from '../search/search';


import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_16032375998291a0dbd470806ff5f1e55c5932a9",
      consumerSecret: "cs_b9eb4e6a1f8d2a6085f7f92fd12a1db0adefbfda",
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    setInterval(()=> {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts(event){

    if (event==null){
    this.page = 2;
    this.moreProducts = [];
    }
    else
    this.page ++;
    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if (event==null){
        event.complete();
      }
      
      if(JSON.parse(data.body).products.length < 20){
      
        event.enable(false);
      
        this.toastCtrl.create({
      
          message : "No more products!", 
          duration: 3000
      
        }).present();
      }
    }, (err) => {
      console.log(err)
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
