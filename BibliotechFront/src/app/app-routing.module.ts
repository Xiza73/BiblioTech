import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/auth-content/login/login.component';
import { RegisterComponent } from './modules/auth/auth-content/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'app-login',
    component: LoginComponent
  },
  {
    path: 'app-register',
    component: RegisterComponent
  }
] 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
