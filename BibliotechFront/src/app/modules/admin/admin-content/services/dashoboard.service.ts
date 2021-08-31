import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Libros, Usuario } from 'src/app/modules/auth/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashoboardService {
  
  private API =  'http://localhost:5000';
 
  constructor(private http:HttpClient) {

   }

   obtenerLibros():Observable<Libros[]>{
    return this.http.get<Libros[]>(`${this.API}/api/libro`)

  }
  obtenerUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.API}/api/usuario`)
  }
  agregarLibros(data:any):Observable<any>{
    return this.http.post<any>(`${this.API}/api/libro`, data)
  }
  eliminarLibro(data:any):Observable<any>{
    return this.http.delete<any>( `${this.API}/api/libro/${data}`)
  }

  eliminarUsuario(data:any):Observable<any>{
  return this.http.delete<any>(`${this.API}/api/usuario/${data}`)
  }
  registrarUsuario(data: any): Observable<any>{
    return this.http.post(`${this.API}/auth/register`, data)
  }
}


