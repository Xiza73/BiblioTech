import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  get usuario(){
    return this.authService.usuario
  }
}
