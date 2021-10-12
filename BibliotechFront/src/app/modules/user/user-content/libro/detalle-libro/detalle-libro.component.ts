import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.scss']
})
export class DetalleLibroComponent implements OnInit, OnChanges {
  @Input() libro: any = {};
  data: any = {
    arc_libro: "",
    autor: "",
    categoria: "",
    fch_pub: "",
    imagen: {
      data: null
    },
    pais: "",
    titulo: ""
  };
   url="";
  

  constructor() {
  }

  ngOnInit(): void {
  this.url= this.data.arc_libro;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for(let e in this.libro){
      this.data[e] = this.libro[e]
    }
  }

  buscarLibro(){
    
    console.log(this.data.arc_libro)
  }
}
