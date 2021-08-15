import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nombre: String = "";
  apellido: String = "";
  usuario: String = "";
  correo: String = "";
  contrasenia: String = "";
  roles: any = [];
  rol: String = "";
  foto: String = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  register(){
    this.authService.registrarUsuario({
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      correo: this.correo,
      contrasenia: this.contrasenia,
      rol: this.rol
    })
    .subscribe(confirm => {
      console.log(confirm)
    }, err => {
      console.log(err)
    })
  }

  obtenerRoles(){
    this.authService.obtenerRoles()
      .subscribe(data => {
        this.roles = data.map((e: { nombre: any; }) => e.nombre);
      }, err => {
        console.log(err)
      })
  }
}
