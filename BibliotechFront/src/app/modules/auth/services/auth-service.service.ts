import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'
import { AuthResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API: string;
  private _usuario:any;

  get usuario(){
    return {...this._usuario}
  }

  constructor(private http: HttpClient) {
    this.API = 'http://localhost:5000';
  }

  iniciarSesion(data:any){
    /* const data = {user, password} */
    return this.http.post<AuthResponse>(`${this.API}/auth/login`, data)
    .pipe(
      tap(resp =>{
        if(resp.ok ){

          localStorage.setItem('token', resp.token!);
          
          this._usuario={


            name:resp.user?.nombre,
            correo:resp.user?.correo,
            rol:resp.user?.rol
       

            
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
          console.log(this._usuario);
        }
      }),
      map(resp =>   resp.ok),
      catchError(err => of(err.error.err[0]))

      

    );
  }

  registrarUsuario(data: any): Observable<any>{
    return this.http.post(`${this.API}/auth/register`, data)
  }

  obtenerRoles(): Observable<any>{
    return this.http.get(`${this.API}/api/rol`)
  }


  validarUsuario():Observable<boolean>{
    
    if(localStorage.getItem('token') ){
      this._usuario=JSON.parse(localStorage.getItem('usuario')!)
      return of(true)
    }else{
      console.log("falsopapu")
      return of(false)
      
    }

  }
  logout(){
    localStorage.removeItem('token')
  
  }
  validarUsuariologin():Observable<boolean>{
    
    if(localStorage.getItem('token') ){
      
      return of(false)
    }else{
      console.log("falsopapu")
      return of(true)
      
    }

}
}
