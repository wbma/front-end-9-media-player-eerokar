import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UploadPage} from "../upload/upload";
import {User} from "../../app/interfaces/user";
import {MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {ViewMediaPage} from "../view-media/view-media";

/**
 * Generated class for the FrontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage implements OnInit{
  uploadPage = UploadPage;

  viewMediaPage = ViewMediaPage;

  userInfo: User;

  newestImages: any;

  picIndex = 0;

  constructor(public mediaProvider: MediaProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  openSingle(id) {
    this.navCtrl.push(this.viewMediaPage, {
      mediaID: id,
    });
  }

  ngOnInit() {
    const userToken = this.mediaProvider.userHasToken();
    if(userToken) {
      console.log('token: ' + userToken);
      this.mediaProvider.getUserData(userToken).subscribe((result: User) => {
          console.log(result);
          this.mediaProvider.userInfo = result;
          this.userInfo = result;
        });
    }

    this.mediaProvider.getImages(this.picIndex.toString()).subscribe(result => {
      this.newestImages = result;
      this.picIndex += 10;
    }, err => {
      console.log(err);
    });

  }

  loadMore() {
    this.mediaProvider.getImages(this.picIndex.toString()).subscribe( (result: Object[]) => {
      this.newestImages.push(...result);
      this.picIndex += 10;
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
  }

}
