import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events, ModalController,AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';
import { Login } from '../login/login';
import * as WC from 'woocommerce-api';
import { ProductsByCategory } from '../products-by-category/products-by-category'
import { Storage } from '@ionic/storage';
import { Cart } from '../cart/cart';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { OrdersPage } from '../orders/orders';


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
    public storage: Storage,public modalCtrl:  ModalController, private WP : WoocommerceProvider,
    public alertCtrl: AlertController,private events: Events ) {
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
    });
    
    
    this.events.subscribe("updateMenu", () => {
      this.storage.ready().then(() => {
        this.storage.get("userLoginInfo").then((userLoginInfo) => {

          if (userLoginInfo != null) {

            console.log("User logged in...");
            this.user = userLoginInfo;
            console.log(this.user);
            this.loggedIn = true;
          }
          else {
            console.log("No user found.");
            this.user = {};
            this.loggedIn = false;
          }

        })
      });


    })
  }

  ionViewDidEnter() {
    
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

        if(userLoginInfo != null){

          console.log("User logged in...");
          this.user = userLoginInfo;
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

  openPage(pageName: string) {

    if(pageName=="Home")
    {
      // this.navCtrl.setRoot('HomePage'); 
      // this.navCtrl.popToRoot();  
      this.childNavCtrl.setRoot('HomePage');
    }

    if(pageName=="orders")
    {
      this.childNavCtrl.setRoot(OrdersPage);
    }
    if (pageName == "signup") {
      this.navCtrl.push(Signup);
    }
    if (pageName == "login") {
      this.navCtrl.push(Login);
    }
    if (pageName == 'logout') {


      this.alertCtrl.create({
        title: "Logout Confirmation",
        message: "Are You Sure You Want To Logout?",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // console.log('Cancel clicked');
            }
          },  
          {
          text: "OK",
          role:'cancel',
          handler: () => {
            this.storage.remove("userLoginInfo").then(() => {
              this.user = {};
              this.loggedIn = false;
            })
          } 
        }]
      }).present();
     
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(Cart);
      modal.present();
    }

  }
  onHome(){
    this.childNavCtrl.setRoot(HomePage);
  }


  
  
}