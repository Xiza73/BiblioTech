import { Component, EventEmitter,ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  viewCat: boolean = false;
  categories: any = [];

  @Output() onEnter:EventEmitter<string>= new EventEmitter()
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>

  get usuario(){
    return this.authService.usuario
  }
  constructor(private userService:UserService,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    
  }

  viewCategories(){
    this.viewCat = !this.viewCat;
  }

  buscar(){
    if(this.txtBuscar.nativeElement.value){
      const valor = this.txtBuscar.nativeElement.value;
      
      this.onEnter.emit(valor)
    }
    this.txtBuscar.nativeElement.value = "";
  }

  obtenerCategorias(){
    this.userService.obtenerCategorias()
      .subscribe(data => {
        this.categories = data.map((e: { _id: any; }) => e._id)
      }, err => {
        console.log(err)
      }) 
  }

  buscarCategoria(categoria:string){
    this.router.navigate(['usercontent/search/', {
      titulo: "",
      category: categoria,
      cant: 0
    }])
   /*  .then(() => {
      window.location.reload();
    }); */
  }

  isLogged(){
    return true;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }
}
