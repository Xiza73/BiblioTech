import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {
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

  obtenerLibroPorId(id: any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id", id);

    return this.http.get(`${this.API}${this.libroService}/id`, { observe: "response", params })
  }
  

  esFavorito(data: any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id_usuario", data.idUsuario);
    params = params.append("id_libro", data.idLibro);

    return this.http.get(`${this.API}/api/favorito/ver`, { observe: "response", params })
  }

  obtenerComentariosLibro(idLibro: any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id_libro", idLibro);

    return this.http.get(`${this.API}/api/comentario/desc`, { observe: "response", params })
  }
}
