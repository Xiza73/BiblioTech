import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ViewsService } from '../../services/views.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: any = null;
  @ViewChild('star') star!:ElementRef<HTMLInputElement>;
  active: boolean = false;

  constructor(private userService: UserService,
              private router:Router,
              private viewService: ViewsService) { }

  ngOnInit(): void {
    this.viewService.esFavorito({
      idUsuario: "6121accb1822b61a58206cb6",
      idLibro: this.card._id
    }).subscribe(data => {
      console.log(data)
      this.active = data.body
    }, err => {
      console.log(err)
    })
  }

  addDeleteFavorite(){
    if(!this.active){
      this.userService.aniadirFavorito({
        id_usuario: "6121accb1822b61a58206cb6",
        id_libro: this.card._id
      }).subscribe(data => {
        console.log(data)
      }, err => {
        console.log(err)
      })
    }else{
      this.userService.eliminarFavorito({
        id_usuario: "6121accb1822b61a58206cb6",
        id_libro: this.card._id
      }).subscribe(data => {
        console.log(data)
      }, err => {
        console.log(err)
      })
    }
    this.active = !this.active
  }
  
  detallesLibro(){
    this.router.navigate(['usercontent/libro/', {
      id: this.card._id
    }])
  }
}
