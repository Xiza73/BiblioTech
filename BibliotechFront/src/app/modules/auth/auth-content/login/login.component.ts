import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: String = "";
  password: String = "";
  
  @Output() onLogin:EventEmitter<string>= new EventEmitter()

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user)
    console.log(this.password)
    this.authService.iniciarSesion({
      correo: this.user,
      contrasenia: this.password
    }).subscribe(data => {
      console.log(data)
      this.router.navigate(['usercontent/'])
    }, err => {
      console.log(err)
    })
  }
}
