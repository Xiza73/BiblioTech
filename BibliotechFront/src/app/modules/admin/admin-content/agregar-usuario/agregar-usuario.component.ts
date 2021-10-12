import { Component, OnInit } from '@angular/core';
import { DashoboardService } from '../services/dashoboard.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {

  miFormulario:FormGroup= this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    usuario:['',[Validators.required]],
    correo:['',[Validators.required]],
    rol:['',[Validators.required]],
    contrasenia:['',[Validators.required]]


  });
  constructor(private dashboardService:DashoboardService,
    private fb:FormBuilder,
    private route:Router) { }

  ngOnInit(): void {
  }
  
  agregarUsuario(){
    if ( this.miFormulario.invalid )  {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const{nombre,apellido,usuario,correo,rol,contrasenia} = this.miFormulario.value;
    
  this.dashboardService.agregarLibros({nombre,apellido,usuario,correo,rol,contrasenia})
  .subscribe(data=>{
    console.log(data)
    this.miFormulario.reset();
    this.route.navigateByUrl('/admincontent/listausuarios')
  })
  }
  campoEsValido(campo: string ){
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched;
  }


}
