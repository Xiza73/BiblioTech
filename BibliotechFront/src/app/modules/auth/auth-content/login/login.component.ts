import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: String = '';
  pass: String = '';

  //formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  @Output() onLogin: EventEmitter<string> = new EventEmitter();
  get usuario() {
    return this.authService.usuario;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
  //funcion para llamar a servicio de login
  login() {
    if ( this.miFormulario.invalid )  {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const { user, password } = this.miFormulario.value;
    console.log(user, password);
    this.authService
      .iniciarSesion({ correo: user, contrasenia: password })
      .subscribe((data) => {
        console.log(data);
        if (data === true) {
          if (this.usuario.rol === 'estudiante') {
            this.router.navigateByUrl('/usercontent/main-view');
          } else {
            this.router.navigateByUrl('/admincontent');
          }
        } else {
          Swal.fire('Error', data, 'error');
        }
      });
  }
  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }
}
