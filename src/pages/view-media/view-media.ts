import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../app/interfaces/user";

/**
 * Generated class for the ViewMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-media',
  templateUrl: 'view-media.html',
})
export class ViewMediaPage {

  url: string;
  title: string;
  description: string;

  userid: number;

  user: User;

  username: string;

  message = '';

  constructor(public mediaProvider: MediaProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');
    console.log(this.navParams.get('mediaID'));
    this.mediaProvider.getSingleMedia(this.navParams.get('mediaID')).
    subscribe(response => {
      console.log(response);
      this.url = this.mediaProvider.mediaUrl + response['filename'];
      this.title = response['title'];

      this.userid = response['user_id'];

     /*  this.mediaProvider.getUserViaId(this.userid).subscribe((result: User) => {
        console.log(result);
        this.user = result;
        this.username = this.user.username;
      }); */

      this.description = response['description'];

    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
