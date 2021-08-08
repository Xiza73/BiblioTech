import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {
  @Input() cant: Number = 0;
  @Input() category: String = "";
  cards: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.obtenerCards()
  }

  obtenerCards(){
    for (let index = 0; index < this.cant; index++) {
      this.cards.push({
        date: `hace ${index} días`,
        book: "Programación 1",
        description: `Este libro fue escrito hace ${index} días, por ${index} autores`
      });
    }
  }
}
