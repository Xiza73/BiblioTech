import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-comentarios-container',
  templateUrl: './comentarios-container.component.html',
  styleUrls: ['./comentarios-container.component.scss']
})
export class ComentariosContainerComponent implements OnInit, OnChanges {
  @Input() data: any = {};
  comentarios: any = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.comentarios = this.data.slice()
    console.log(this.comentarios)
  }

}
