import { CommonModule } from '@angular/common';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ViewsService } from '../../services/views.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit,OnChanges {
  /*@Input() cant: Number = 10;
  @Input() category: string|any = "";
  @Input() titulo: string|any = "";*/
  verificaparams!: boolean
  @Input() params: any = {
    titulo: null,
    category: null,
    cant: 10
  };
  cards: any[] = []

  constructor(private viewService: ViewsService,
              private route: Router) { }

  ngOnInit(): void {
    this.verificaparams = false
    
    this.todoLibros()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.params)
    this.verificaparams= false
    if(this.params.titulo){
      this.obtenerPorTitulo()
      return
    }
    this.obtenerCards()
  }

  todoLibros(){
    this.viewService.obtenerLibros()
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  obtenerPorTitulo(){
    this.viewService.obtenerLibrosPorTitulo({
      titulo: this.params.titulo
    }).subscribe(data => {
      this.cards = data.body
      this.verificaparams= true;
    }, err => {
      console.log(err)
    })
  }

  obtenerCards(){
    this.viewService.obtenerLibrosPorCategoria({
      categoria: this.params.category,
      cantidad: this.params.cant
    }).subscribe(data => {
      this.cards = data.body
      this.verificaparams= true;
    }, err => {
      console.log(err);
    })
  }
}

