import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;

  constructor() {
    this.Woocommerce = WC({
     url: "http://localhost/wordpress/",
        consumerKey: "ck_16032375998291a0dbd470806ff5f1e55c5932a9",
        consumerSecret: "cs_b9eb4e6a1f8d2a6085f7f92fd12a1db0adefbfda",
    });
  }

  init(){
    return this.Woocommerce;
  }

}