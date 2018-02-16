import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MediaProvider } from '../providers/media/media';
import {LoginPage} from "../pages/login/login";
import {UploadPage} from "../pages/upload/upload";
import {FrontPage} from "../pages/front/front";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {PipesModule} from "./pipes/pipes.module";
import {ViewMediaPage} from "../pages/view-media/view-media";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UploadPage,
    FrontPage,
    ViewMediaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UploadPage,
    FrontPage,
    ViewMediaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    HttpClient

  ]
})
export class AppModule {}
