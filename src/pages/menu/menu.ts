import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';
import { Login } from '../login/login';
import * as WC from 'woocommerce-api';
import { ProductsByCategory } from '../products-by-category/products-by-category'
import { Storage } from '@ionic/storage';
import { Cart } from '../cart/cart';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  user: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage,public modalCtrl:  ModalController, private WP : WoocommerceProvider) {
    this.homePage = HomePage;
    this.categories = [];
    this.user= {};
    
    this.WooCommerce = WP.init();
    this.WooCommerce.getAsync("products/categories").then((data)=>{
      console.log(JSON.parse(data.body).product_categories);


      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i=0; i<temp.length; i++){
       
        if(temp[i].parent==0){

          if (temp[i].slug=="uncategorized"){
            temp[i].icon = "shirt";
          }

          if (temp[i].slug=="electric-products"){
            temp[i].icon = "flash";
          }
          if (temp[i].slug=="food-2"){
            temp[i].icon = "pizza";
          }
          if (temp[i].slug=="medicine"){
            temp[i].icon = "medkit";
          }
          if (temp[i].slug=="services"){
            temp[i].icon = "construct";
          }
          if (temp[i].slug=="products"){
            temp[i].icon = "flag";
          }
          this.categories.push(temp[i]);
        }
      }
      
    },(err)=>{
      console.log(err)
    })
  }

  ionViewDidEnter() {
    
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

        if(userLoginInfo != null){

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })


  }
 
  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategory,{"category" : category });
  }

  openPage(pageName: string){
    if(pageName == "signup"){
      this.navCtrl.push(Signup);
    }
    if(pageName == "login"){
      this.navCtrl.push(Login);
    }
    if(pageName == 'logout'){
      this.storage.remove("userLoginInfo").then( () => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if(pageName == 'cart'){
      let modal = this.modalCtrl.create(Cart);
      modal.present();
    }

  }
  onHome(){
    this.childNavCtrl.setRoot(HomePage);
  }

}