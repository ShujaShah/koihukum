import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Menu } from '../pages/menu/menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsByCategory } from '../pages/products-by-category/products-by-category';
import { ProductDetails } from '../pages/product-details/product-details';
import {IonicStorageModule}from '@ionic/storage';
import { Cart } from '../pages/cart/cart';
import { Signup } from '../pages/signup/signup';
import {Login} from '../pages/login/login'
import { HttpModule } from '@angular/http';
import {Checkout} from '../pages/checkout/checkout'
import { PayPal } from '@ionic-native/paypal';
import { SearchPage } from '../pages/search/search';
import {WoocommerceProvider} from '../providers/woocommerce/woocommerce';
import {Thankyou} from '../pages/thankyou/thankyou';
import { SessionServiceProvider } from '../providers/session-service/session-service';
import { OrdersPage } from '../pages/orders/orders';
import { OrderDetailPage } from '../pages/order-detail/order-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductsByCategory,
    ProductDetails,
    Cart,
    Signup,
    Login,
    Checkout,
    SearchPage,
    Thankyou,
    OrdersPage,
    OrderDetailPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductsByCategory,
    ProductDetails,
    Cart,
    Signup,
    Login,
    Checkout,
    SearchPage,
    Thankyou,
    OrdersPage,
    OrderDetailPage
    
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceProvider,
    SessionServiceProvider
  ]
})
export class AppModule {}
