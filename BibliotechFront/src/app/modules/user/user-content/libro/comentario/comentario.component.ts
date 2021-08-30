import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit, OnChanges {
  @Input() data: any = {};
  comentario: any = {
    comentario: "",
    nombre: "",
    apellido: "",
    respuesta: []
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for(let e in this.data){
      this.comentario[e] = this.data[e]
    }
    console.log(this.comentario)
  }
}
