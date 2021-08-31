import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String = "";
  pass: String = "";

  //formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    user: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  
  @Output() onLogin:EventEmitter<string>= new EventEmitter()

  constructor(
    private authService: AuthService,
    private router:Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
  }
  //funcion para llamar a servicio de login
  login(){
    

    const{user,password}= this.miFormulario.value;
    console.log(user, password)
    this.authService.iniciarSesion({correo:user,contrasenia:password})
      .subscribe(data =>{
        console.log(data)
        if(data===true){
          this.router.navigateByUrl('/admincontent')
        }else{
          Swal.fire('Error',data, 'error' );
        }
      })
   /*  this.authService.iniciarSesion({
      correo: this.user,
      contrasenia: this.password
    }).subscribe(data => {
      console.log(data)
      this.router.navigate(['usercontent/'])
    }, err => {
      console.log(err),
      console.log(err.error.err[0])
    }) */
  }
}
