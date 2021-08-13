import { Component, EventEmitter,ElementRef, OnInit, Output, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onEnter:EventEmitter<string>= new EventEmitter()
 @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>

  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  buscar(){
   
    const valor = this.txtBuscar.nativeElement.value;
    
    this.onEnter.emit(valor)
    
  }
}
