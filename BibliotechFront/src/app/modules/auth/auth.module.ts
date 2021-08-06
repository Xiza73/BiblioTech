import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { LoginComponent } from './auth-content/login/login.component';
import { RegisterComponent } from './auth-content/register/register.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AuthContentComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
