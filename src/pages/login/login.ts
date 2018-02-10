import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FrontPage} from "../front/front";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  frontPage = FrontPage;

  username: string;
  password: string;
  status: string;

  title: string;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public http: HttpClient) {
  }

  public login() {
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);

  const body = {
    username: this.username,
    password: this.password
  };

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(FrontPage);
    }, (error: HttpErrorResponse) => {
      console.log(error.statusText);
      this.status = error.error.message;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  tokenCheck() {
    this.mediaProvider.getUserData().subscribe(response => {
      console.log('Welcome ' + response['full_name']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
