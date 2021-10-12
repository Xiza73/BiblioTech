import { Component, OnInit, Input, OnChanges,SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
   titulo:string|null='';
  constructor(public route:ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.titulo =  this.route.snapshot.paramMap.get('title')
   
    console.log(this.route.snapshot.paramMap.keys)
  }
  
  
}
