import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() date: String = "";
  @Input() book: String = "";
  @Input() description: String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
