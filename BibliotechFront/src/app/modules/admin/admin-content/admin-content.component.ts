import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {

  constructor(private authService:AuthService) { }
  get usuario(){
    return this.authService.usuario
  }

  ngOnInit(): void {
  }
  
  
}
