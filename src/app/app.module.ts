import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GoogleMapComponent} from '../components/google-map/google-map';
import {PagoPaypalComponent} from '../components/pago-paypal/pago-paypal';
import { Geolocation } from '@ionic-native/geolocation';
import {HttpClientModule} from '@angular/common/http'
import { ServicesGooglePlacesProvider } from '../providers/services-google-places/services-google-places';
import { PayPal } from '@ionic-native/paypal';
import {LoginPage} from '../pages/login/login';

//provider
import { UsuarioProvider } from '../providers/usuario/usuario';
//nativos
import { Facebook } from '@ionic-native/facebook';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBMR9HIA1xPbqnnGmbz0cJIon1cRBgPe3w",
  authDomain: "loginapp-wimg.firebaseapp.com",
  databaseURL: "https://loginapp-wimg.firebaseio.com",
  projectId: "loginapp-wimg",
  storageBucket: "loginapp-wimg.appspot.com",
  messagingSenderId: "60498816103"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,GoogleMapComponent,PagoPaypalComponent,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Geolocation,
    ServicesGooglePlacesProvider,PayPal,
    UsuarioProvider, 
    Facebook,
    AngularFireDatabase,
  ]
})
export class AppModule {}
