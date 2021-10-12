import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  get usuario(){
    return this.authService.usuario
  }
  miFormulario:FormGroup = this.fb.group({
    nombre:['',[Validators.required,]],
    apellido:['',[Validators.required,]],
    usuario:['',[Validators.required,]],
    correo:['',[Validators.required,Validators.email]],
    contrasenia:['',[Validators.required,Validators.minLength(3)]],
  
    rol:['estudiante']
    
  })

  

  constructor(private authService: AuthService,
              private route:Router,
              private fb:FormBuilder) { }

  ngOnInit(): void {
   
  }

  register(){
    if ( this.miFormulario.invalid )  {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const{nombre,apellido,usuario,correo,contrasenia,rol}= this.miFormulario.value;
    console.log(nombre,apellido,usuario,correo,contrasenia,rol)
     this.authService.registrarUsuario({
      nombre,apellido,usuario,correo,contrasenia,rol
    })
    .subscribe(data =>{
      console.log(data)
      if(data===true){
      
          alert("registrado con exito")
          this.route.navigateByUrl('/auth/login')
        
      }else{
        Swal.fire('Error',data, 'error' );
      }
    })
  }
  campoEsValido(campo: string ){
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched;
  }


}
