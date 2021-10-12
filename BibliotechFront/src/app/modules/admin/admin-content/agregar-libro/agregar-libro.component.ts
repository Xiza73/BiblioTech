import { Component, OnInit } from '@angular/core';
import { DashoboardService } from '../services/dashoboard.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.scss']
})
export class AgregarLibroComponent implements OnInit {

  miFormulario:FormGroup= this.fb.group({
    arc_libro:['',[Validators.required]],
    titulo:['',[Validators.required]],
    autor:['',[Validators.required]],
    categoria:['',[Validators.required]],
    pais:['',[Validators.required]],
    fch_pub:['',[Validators.required]]


  });

  constructor(private dashboardService:DashoboardService,
              private route:Router,
              private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  agregarLibro(){
    if ( this.miFormulario.invalid )  {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const{arc_libro, titulo, autor, categoria, pais,fch_pub} = this.miFormulario.value;
    
  this.dashboardService.agregarLibros({arc_libro, titulo, autor, categoria, pais,fch_pub})
  .subscribe(data=>{
    console.log(data)
    this.miFormulario.reset();
    this.route.navigateByUrl('/admincontent')
  })
  }
  campoEsValido(campo: string ){
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched;
  }

  



}
