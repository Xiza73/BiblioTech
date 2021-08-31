import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
/* import { LoginComponent } from './modules/auth/auth-content/login/login.component';
import { RegisterComponent } from './modules/auth/auth-content/register/register.component'; */
/* import { AuthContentComponent } from './modules/auth/auth-content/auth-content.component'; */
import {  PruebComponent } from './shared/card-libro/prueba.component';
import { ValidarTokenGuard } from './guard/validar-token.guard';
import { ValidarUsuarioGuard } from './guard/validar-usuario.guard';
import { ValidarRolGuard } from './guard/validar-rol.guard';

const routes: Routes = [
  {
    path: 'auth',
    
    loadChildren:() =>import('./modules/auth/auth.module').then(m=>m.AuthModule),
    canActivate:[ValidarUsuarioGuard]
  },
  {
    path: 'usercontent',
    loadChildren:() =>import('./modules/user/user.module').then(m=>m.UserModule),
    canActivate: [ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'admincontent',
    loadChildren:() =>import('./modules/admin/admin.module').then(m=>m.AdminModule),
    canActivate:[ValidarRolGuard]
  },
  {
    path:'card',
    component:PruebComponent
  },
  {
    path: '**',
    component:PruebComponent

  }
  /* ,
  {
    path: 'app-login',
    component: LoginComponent
  },
  {
    path: 'app-register',
    component: RegisterComponent
  } */
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
