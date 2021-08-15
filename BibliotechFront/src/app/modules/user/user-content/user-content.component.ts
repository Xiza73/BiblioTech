import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {
 titulo:string = '';
  constructor(private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
  }
  
  buscar(termino:string){
    this.titulo = termino;
  
    this.router.navigate(['usercontent/search/',{
      titulo: termino,
      category: null,
      cant: 0
    }])
   /*  .then(() => {
      window.location.reload();
    }); */
  }

}
