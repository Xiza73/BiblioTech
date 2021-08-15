import { Component, EventEmitter,ElementRef, OnInit, Output, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  viewCat: boolean = false;
  categories: any = ["educación", "informática", "robótica", "terror"];

  @Output() onEnter:EventEmitter<string>= new EventEmitter()
 @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>

  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  viewCategories(){
    this.viewCat = !this.viewCat;
  }

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    
    this.onEnter.emit(valor)
    
  }
}
