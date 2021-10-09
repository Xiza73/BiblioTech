import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService) { }
  
  get usuario(){
    return this.authService.usuario
  }
  ngOnInit(): void {
  }

}
