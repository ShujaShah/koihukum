import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { Storage } from '@ionic/storage';
import {OrderDetailPage} from '../order-detail/order-detail';

/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  WooCommerce:any;
  orders:any=[];
  loader:boolean;
  //userInfo:any;
  constructor(public storage:Storage,public service:SessionServiceProvider, public wp:WoocommerceProvider,
    public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
 
    console.log('ionViewDidLoad OrdersPage');
    let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        spinner: 'bubbles'
      });
      loading.present();
    this.WooCommerce = this.wp.init();


    this.storage.get("userLoginInfo").then((userLoginInfo) => {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'bubbles'
          });
          loading.present();

      console.log("User info=="+JSON.stringify(userLoginInfo));
      this.WooCommerce.getAsync("orders?filter[customer_id]="+userLoginInfo.user.id).then( (data) => {
        this.orders = JSON.parse(data.body).orders;
        loading.dismiss();
        console.log("Order get Successfully===="+JSON.stringify(this.orders));
      }, (err) => {
        console.log("Failed to get Orders right now!!!!!!"+err);

        this.service.showToast("Something Went Wrong Please Try Again");
        loading.dismiss();
        console.log("Error==="+err)
      })
    })
    
    
  }


  openOrderPage(order)
  {
    this.navCtrl.push(OrderDetailPage, {"order": order} );

    
  }

  

}