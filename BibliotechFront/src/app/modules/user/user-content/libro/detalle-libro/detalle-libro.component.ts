import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.scss']
})
export class DetalleLibroComponent implements OnInit, OnChanges {
  @Input() libro: any = {};
  data: any = {
    arc_libro: "xd",
    autor: "",
    categoria: "",
    fch_pub: "",
    imagen: {
      data: null
    },
    pais: "",
    titulo: ""
  };

  meinKaft: string = 'https://images-na.ssl-images-amazon.com/images/I/5144WhFYyKL._SX333_BO1,204,203,200_.jpg';

  constructor() {
  }

  ngOnInit(): void {
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
