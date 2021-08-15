import { CommonModule } from '@angular/common';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit,OnChanges {
  @Input() cant: Number = 0;
  @Input() category: string = "";
  @Input() titulo: string|any = "";
  cards: any[] = []
  xd:any

  constructor(private userService: UserService,
              private route:Router) { }

  ngOnInit(): void {
   
    //this.todoLibros()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.titulo)
    if(this.titulo){
      this.obtenerPorTitulo()
      console.log(":xd")
    }
    else{
      this.obtenerCards()
    }
    console.log("aaaaa")
    
  }

 /*  reinicio(){
    console.log(this.titulo)
    if(this.titulo){
      this.obtenerPorTitulo()
      console.log(":xd")
    }
    else{
      this.obtenerCards()
    }
  } */

  hola(){
    console.log("hola")
    if(this.titulo){
      this.userService.obtenerLibros()
    }else{
      this.obtenerCards()
    }
  } 

  todoLibros(){
    this.userService.obtenerLibros()
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  obtenerPorTitulo(){
    this.xd=true;
    this.userService.obtenerLibrosPorTitulo({
      titulo: this.titulo
    }).subscribe(data => {
      console.log(data)
      this.cards = data.body
    }, err => {
      console.log(err)
      this.xd=false;
    })
  }

  obtenerCards(){
    this.userService.obtenerLibrosPorCategoria({
      categoria: this.category,
      cantidad: this.cant
    }).subscribe(data => {
      console.log(data)
      this.cards = data.body
    }, err => {
      console.log(err);
    })
  }

 /*  volverAtras(){
     this.route.navigate(['/]) 
  } */
}

