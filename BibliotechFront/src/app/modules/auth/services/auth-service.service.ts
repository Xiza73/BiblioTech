import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API: String;

  constructor(private http: HttpClient) {
    this.API = 'http://localhost:5000';
  }

  iniciarSesion(data: any): Observable<any>{
    return this.http.post(`${this.API}/auth/login`, data)
  }

  registrarUsuario(data: any): Observable<any>{
    return this.http.post(`${this.API}/auth/register`, data)
  }

  obtenerRoles(): Observable<any>{
    return this.http.get(`${this.API}/api/rol`)
  }

}
