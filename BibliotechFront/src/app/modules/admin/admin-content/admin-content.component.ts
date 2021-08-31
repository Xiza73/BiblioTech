import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router) {
    
   }
  

  ngOnInit(): any {
    
  }
  get usuario(){
    
    return this.authService.usuario
   
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }
}
