import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {
  @Input() cant: Number = 0;
  @Input() category: string = "";
  @Input() titulo: string = "";
  cards: any[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(this.titulo){
      this.obtenerPorTitulo()
    }else{
      this.obtenerCards()
    }
    //this.todoLibros()
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
    this.userService.obtenerLibrosPorTitulo({
      titulo: this.titulo
    }).subscribe(data => {
      console.log(data)
      this.cards = data.body
    }, err => {
      console.log(err)
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
}
