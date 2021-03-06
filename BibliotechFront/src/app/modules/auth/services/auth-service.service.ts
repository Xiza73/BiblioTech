import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'
import { AuthResponse, Libros, NuevoUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API: string;
  private _usuario:NuevoUser={
    name:"",
    correo:"",
    _id:"",
    rol:""

  };

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
            _id:resp.user?._id,
            rol:resp.user?.rol
       

            
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
        
        }
      }),
      map(resp =>   resp.ok),
      catchError(err => of(err.error.err[0]))

      

    );
  }

  registrarUsuario(data: any): Observable<any>{
    return this.http.post<AuthResponse>(`${this.API}/auth/register`, data)
    .pipe(
      tap(resp =>{
        if(resp.ok ){

          localStorage.setItem('token', resp.token!);
          
          this._usuario={

            
            name:resp.user?.nombre,
            correo:resp.user?.correo,
            _id:resp.user?._id,
            rol:resp.user?.rol
       

            
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
         
        }
      }),
      map(resp =>   resp.ok),
      catchError(err => of(err.error.err[0]))
      );
      
  }

  obtenerRoles(): Observable<any>{
    return this.http.get(`${this.API}/api/rol`)
  }


  validarUsuario():Observable<boolean>{
     
    if(localStorage.getItem('token') ){
      this._usuario=JSON.parse(localStorage.getItem('usuario')!)
      
      
      return of(true)
     
    }else{
      return of(false)
    }


  }
  
  logout(){
    localStorage.removeItem('token'),
    localStorage.removeItem('usuario')
  
  }
  validarUsuariologin():Observable<boolean>{
    
    if(localStorage.getItem('token') ){
      this._usuario=JSON.parse(localStorage.getItem('usuario')!)
      return of(true)
    }else{
      console.log("no est?? logeado")
      return of(false)
      
    }

  }
  validarRolUsuario():Observable<boolean>{
    if(localStorage.getItem('token') ){
      
      this._usuario=JSON.parse(localStorage.getItem('usuario')!)
      if(this._usuario.rol==="admin"){
        return of(true)

      }else{
        return of(false)
      }
    }else{
      console.log("es estudiante")
      return of(false)
      
    }
    
    
  
  }


  
}


