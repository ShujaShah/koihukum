import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';

/*
  Generated class for the SessionServiceProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SessionServiceProvider {
  user:any;
  constructor(public toastCtrl:ToastController, public http: Http) {
    console.log('Hello SessionServiceProvider Provider');
  }

  setUser(userInfo)
  {
    this.user=userInfo;
  }
  getUser()
  {
    return this.user;
  }

  showToast(messageText)
  {
    this.toastCtrl.create({
      message:messageText,
      duration: 5000
    }).present();
  }

}