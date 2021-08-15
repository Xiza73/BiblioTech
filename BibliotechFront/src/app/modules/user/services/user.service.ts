import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API: String;
  private libroService: String

  constructor(private http: HttpClient) { 
    this.API = 'http://localhost:5000';
    this.libroService = '/api/libro';
  }

  obtenerLibros(): Observable<any>{
    return this.http.get(`${this.API}${this.libroService}`)
  }

  obtenerLibrosPorCategoria(data: any): Observable<any>{
    let params = new HttpParams();
    params = params.append("categoria", data.categoria);
    params = params.append("cantidad", data.cantidad);

    return this.http.get(`${this.API}${this.libroService}/cat`, { observe: "response", params })
  }

  obtenerLibrosPorTitulo(data: any): Observable<any>{
    let params = new HttpParams();
    params = params.append("titulo", data.titulo);

    return this.http.get(`${this.API}${this.libroService}/title`, { observe: "response", params })
  }
}
