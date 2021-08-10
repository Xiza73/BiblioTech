import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API: String;

  constructor(private http: HttpClient) { 
    this.API = 'http://localhost:5000';
  }

  obtenerLibros(): Observable<any>{
    return this.http.get(`${this.API}`)
  }

  obtenerLibrosPorCategoria(data: any): Observable<any>{
    return this.http.get(`${this.API}`, data)
  }

  obtenerLibrosPorTitulo(data: any): Observable<any>{
    return this.http.get(`${this.API}`, data)
  }
}
