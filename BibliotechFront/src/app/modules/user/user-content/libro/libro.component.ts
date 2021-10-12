import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ViewsService } from '../../services/views.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {
  public idLibro: string | null = '';
  private libro: any;
  private comentarios: [] = [];
  comentario: string = "";

  constructor(
    private route:ActivatedRoute,
    private libroService: ViewsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.idLibro = this.route.snapshot.paramMap.get('id');
    this.obtenerLibro(this.idLibro);
    this.obtenerComentarios(this.idLibro)
  }

  obtenerLibro(id: string | null): void {
    this.libroService.obtenerLibroPorId(id)
    .subscribe(data => {
      this.libro = data.body
    }, err => {
      console.log('No existe el libro')
    })
  }

  obtenerComentarios(id: string | null){
    this.libroService.obtenerComentariosLibro(id)
    .subscribe(data => {
      this.comentarios = data.body;
      console.log(this.comentarios)
    }, err => {
      console.log("no comentarios")
    })
  }

  comentar(){
    if(this.comentario){
      this.userService.comentar({
        comentario: this.comentario,
        id_libro: this.idLibro
      }).subscribe(data => {
        this.obtenerComentarios(this.idLibro)
      }, err => {
        console.log("no comentarios")
      })
      this.comentario = ""
      this.obtenerComentarios(this.idLibro)
    }else{
      console.log("Escribe algo ")
    }
  }

  getLibro(){
    return this.libro;
  }

  getComentarios(){
    return this.comentarios;
  }
}
