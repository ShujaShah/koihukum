import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Signup} from '../signup/signup';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public toastCtrl: ToastController, public storage: Storage,
     public alertCtrl: AlertController,private loadingCtrl: LoadingController) {

    this.username = "";
    this.password = "";

  }

  login(){
    //first create the loader...
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'bubbles'
    });

    loading.present(); // present the loader....

    this.http.get("http://localhost/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
    .subscribe( (res) => {
      console.log(res.json()); 

      let response = res.json();

        loading.dismiss(); //dismiss the loader...

      if(response.error){
        this.toastCtrl.create({
          message: response.error,
          duration: 5000
        }).present();
        return;
      }

      this.storage.set("userLoginInfo", response.user).then( (data) =>{

        this.alertCtrl.create({
          title: "Login Successful",
          message: "You have been logged in successfully.",
          buttons: [{
            text: "OK",
            handler: () => {
              if(this.navParams.get("next")){
                this.navCtrl.push(this.navParams.get("next"));
              } else {
                this.navCtrl.pop();
              }             
            }
          }]
        }).present();


      })




    });


  }
  
  openSignupPage(){
    this.navCtrl.push(Signup);
  }
}