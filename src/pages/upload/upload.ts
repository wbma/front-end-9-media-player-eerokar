import { Component } from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {MediaProvider} from "../../providers/media/media";
import {Media} from "../../app/interfaces/media";
import {FrontPage} from "../front/front";
import {NavController} from "ionic-angular";

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.html',


})
export class UploadPage {

  file: File;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  media: Media = {
    title: '',
    description: ''
  };

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) { }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  startUpload() {

    const formData = new FormData();

    formData.append('file', this.file);
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);

    console.log(formData);

    this.mediaProvider.upload(formData).subscribe(response => {
      console.log(response);
      this.navCtrl.push(FrontPage);

    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

}
