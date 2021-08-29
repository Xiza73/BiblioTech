import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth-service.service';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService,
              private route:Router){}
  canActivate(
   ): Observable<boolean>  | Promise<boolean>  | boolean  {
    return this.authService.validarUsuario()
    .pipe(
      tap(valid=>{
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
      if(!valid){
        this.route.navigateByUrl('/auth/login')
      }
    })
  );
  }
}
