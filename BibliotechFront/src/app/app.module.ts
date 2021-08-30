import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
/* import { AuthModule } from './modules/auth/auth.module'; */
 import { HttpClientModule } from '@angular/common/http' 
import {  PruebComponent } from './shared/card-libro/prueba.component';



@NgModule({
  declarations: [
    AppComponent,
    PruebComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule/* ,
    AuthModule */,
     HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
