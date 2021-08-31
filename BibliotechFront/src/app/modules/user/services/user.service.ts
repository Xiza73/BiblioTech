import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API: String;
  private categoriesService: String

  constructor(private http: HttpClient,
    private authService: AuthService) { 
    this.API = 'http://localhost:5000';
    this.categoriesService = '/api/libro/cate';
  }

  obtenerCategorias(): Observable<any>{
    return this.http.get(`${this.API}${this.categoriesService}`)
  }

  obtenerFavoritos(data: any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id_usuario", data);

    return this.http.get(`${this.API}/api/favorito/user`, { observe: "response", params })
  }

  aniadirFavorito(data: any): Observable<any>{
    return this.http.post(`${this.API}/api/favorito`, data, { observe: "body"});
  }

  eliminarFavorito(data: any): Observable<any>{
    return this.http.request('DELETE', `${this.API}/api/favorito`, { observe: "body", body: data})
  }

  comentar(data: any): Observable<any>{
    data.id_usuario = this.authService.usuario._id
    console.log(data)
    return this.http.post(`${this.API}/api/comentario`, data, { observe: "body"});
  }

}
