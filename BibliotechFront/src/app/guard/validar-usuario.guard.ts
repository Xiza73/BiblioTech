import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth-service.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class ValidarUsuarioGuard implements CanActivate {
  constructor(private authService:AuthService,
    private route:Router){}
  canActivate(
    ): Observable<boolean > | Promise<boolean >|boolean {
      return this.authService.validarUsuariologin()
      .pipe(
        tap(valid=>{
          console.log(valid)
          if(valid===false){
            this.route.navigateByUrl('/usercontent/main-view')
          }
        })
      );
  }
  
}
