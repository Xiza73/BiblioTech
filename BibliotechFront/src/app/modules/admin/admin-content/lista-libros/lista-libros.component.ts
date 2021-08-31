import { Component, OnInit } from '@angular/core';
import { DashoboardService } from '../services/dashoboard.service';
import { Libros } from '../../../auth/interfaces';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.scss']
})
export class ListaLibrosComponent implements OnInit {

  constructor(private dashboardService:DashoboardService ) { }
  
  listaLibros:Libros[]=[]

  ngOnInit(): void {
    
    this.dashboardService.obtenerLibros()
      .subscribe( resp => {this.listaLibros = resp ,
      console.log(resp)});
  }
  
  
}
