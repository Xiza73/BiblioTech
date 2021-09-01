import { Component, OnInit } from '@angular/core';
import { DashoboardService } from '../services/dashoboard.service';
import { Libros } from '../../../auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.scss']
})
export class ListaLibrosComponent implements OnInit {

  constructor(private dashboardService:DashoboardService,
              private route:Router ) { }
  
  listaLibros:Libros[]=[]

  ngOnInit(): void {
    
    this.dashboardService.obtenerLibros()
      .subscribe( resp => {this.listaLibros = resp ,
      console.log(resp)});
  }
  eliminarLibro(id:any){
    this.dashboardService.eliminarLibro(id)
    .subscribe(resp => {
      
      this.dashboardService.obtenerLibros()
      .subscribe(resp => {this.listaLibros = resp ,
        console.log(resp)})
      this.route.navigateByUrl('/usercontent')
    })
   

  }
  
  
}
