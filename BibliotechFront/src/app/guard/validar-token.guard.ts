import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth-service.service';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})


//Funciones de seguridad, para impedir el ingreso a usuarios no logeados 
export class ValidarTokenGuard implements CanActivate, CanLoad {
  get usuario(){
    return this.authService.usuario
  }
  constructor(private authService:AuthService,
              private route:Router){}
  canActivate(
   ): Observable<boolean>  | Promise<boolean>  | boolean  {
    return this.authService.validarUsuario()
    .pipe(
      tap(valid=>{
        console.log("buenas tardes");
        if(!valid){
          this.route.navigateByUrl('/auth/login')
        }
    
      })
    );
  }
  canLoad(
 ): Observable<boolean>  | Promise<boolean>  | boolean {
  return this.authService.validarUsuario()
  .pipe(
    tap(valid=>{
      if(valid){
        if(this.usuario.rol==="admin"){
          this.route.navigateByUrl('/admincontent')
      }else{
        this.route.navigateByUrl('/usercontent')
      }

      }else{
        this.route.navigateByUrl('/auth')
      }
    })
  );
}}
