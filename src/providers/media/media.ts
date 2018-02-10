import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NavController} from "ionic-angular";
import {FrontPage} from "../../pages/front/front";
import {User} from "../../app/interfaces/user";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  userInfo: User;

  username: string;
  password: string;
  status: string;

  title: string;
  mediaDescription: string;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: HttpClient) {}
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

    return this.http.post(this.apiUrl + '/login', body, settings);

  }

  getImages(fromIndex: string) {

    return this.http.get(this.apiUrl + '/media', {
      params: {
        start: fromIndex,
        limit: '10'
      }
    });
  }

  register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  upload(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  getUserData(token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.apiUrl + '/users/user', settings)
  }

  userHasToken() {
    return localStorage.getItem('token');
  }

}


