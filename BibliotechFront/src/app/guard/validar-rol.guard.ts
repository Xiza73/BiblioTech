import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth-service.service';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ValidarRolGuard implements CanActivate {
  constructor(private authService:AuthService,
              private route:Router){
  
  }
  canActivate(
  ): Observable<boolean > | Promise<boolean> | boolean  {
    return this.authService.validarRolUsuario()
    .pipe(
      tap(valid=>{
        if(!valid){
          console.log(valid)
          this.route.navigateByUrl('/usercontent/main-view')
        }
      })
    );
  }
  
}
