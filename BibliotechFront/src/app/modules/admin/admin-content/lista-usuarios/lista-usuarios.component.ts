import { Component, OnInit } from '@angular/core';
import { DashoboardService } from '../services/dashoboard.service';
import { Usuario } from '../../../auth/interfaces';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {


  listaUsers:Usuario[]=[]
  constructor(private dashboardService:DashoboardService) { }

  ngOnInit(): void {
    this.dashboardService.obtenerUsuarios()
    .subscribe( resp => {this.listaUsers = resp ,
    console.log(resp)});
  }

}
