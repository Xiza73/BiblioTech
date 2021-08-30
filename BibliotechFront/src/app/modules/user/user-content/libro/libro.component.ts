import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewsService } from '../../services/views.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {
  private idLibro: string | null = '';
  private libro: any;
  private comentarios: [] = [];

  constructor(
    private route:ActivatedRoute,
    private libroService: ViewsService
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
      console.log('Kevin aquí pones la wea del error')
    })
  }

  obtenerComentarios(id: string | null){
    this.libroService.obtenerComentariosLibro(id)
    .subscribe(data => {
      this.comentarios = data.body;
      console.log(this.comentarios)
    }, err => {
      console.log("Sáquenme de la FISI por favor")
    })
  }

  getLibro(){
    return this.libro;
  }

  getComentarios(){
    return this.comentarios;
  }
}
