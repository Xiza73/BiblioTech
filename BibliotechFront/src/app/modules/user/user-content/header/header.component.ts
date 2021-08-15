import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  viewCat: boolean = false;
  categories: any = ["educación", "informática", "robótica", "terror"];

  constructor() { }

  ngOnInit(): void {
  }

  viewCategories(){
    this.viewCat = !this.viewCat;
  }

  

}
