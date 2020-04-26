
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { Storage } from '@ionic/storage';
import {OrdersPage} from '../orders/orders';
/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order:any={};
  WooCommerce:any;
  loader:boolean;
  constructor(public alertCtrl:AlertController,public service:SessionServiceProvider, 
    public Wp:WoocommerceProvider,public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController) {
    this.order = this.navParams.get("order");
    this.WooCommerce = this.Wp.init();
    console.log("Order info===="+JSON.stringify(this.order));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }


  cancelOrder()
  {
    

    this.alertCtrl.create({
      title: "Cancel Confirmation",
      message: "Are You Sure You Want To Cancel Order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },  
        {
        text: "OK",
        role:'cancel',
        handler: () => {
          this.confirmCancelOrder();
        } 
      }]
    }).present();
  }

  confirmCancelOrder()
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'bubbles'
    });
    loading.present();

   const data = {"order":{"status":"cancelled"}}
      
    this.WooCommerce.putAsync("orders/"+this.order.id, data).then( (data) => {
      loading.dismiss();
      console.log("order info after update=="+JSON.stringify(data));
      this.service.showToast("Successfully Cancelled Order");
      // console.log("Order get Successfully=="+JSON.stringify(this.orders));
    }, (err) => {
      console.log("Failed to get Orders right now!!!!!!"+err);

      this.service.showToast("Something Went Wrong Please Try Again");
      this.loader=false;
      console.log("Error==="+err)
    })
  }

}