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
}


