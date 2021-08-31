import { Component, OnInit } from '@angular/core';
import { DashoboardService } from '../services/dashoboard.service';
import { Usuario } from '../../../auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {


  listaUsers:Usuario[]=[]
  constructor(private dashboardService:DashoboardService,
              private route:Router) { }

  ngOnInit(): void {
    this.dashboardService.obtenerUsuarios()
    .subscribe( resp => {this.listaUsers = resp ,
    console.log(resp)});
  }

  eliminarUsuario(id:any){
    this.dashboardService.eliminarUsuario(id)
    .subscribe(resp => {
     
      this.route.navigateByUrl('/usercontent/listausuarios')
    })
   

  }

}
