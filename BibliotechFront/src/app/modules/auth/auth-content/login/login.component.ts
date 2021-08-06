import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: String = "";
  password: String = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.iniciarSesion({
      correo: this.user,
      contrasenia: this.password
    }).subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }
}
