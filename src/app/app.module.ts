import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'
import { FirestoreServiceService } from './services/firestore-service.service';
import { AngularFireModule } from '@angular/fire/compat';
import { enviroment } from 'src/enviroment';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(enviroment.firebase)
    
    
  ],
  providers: [FirestoreServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
