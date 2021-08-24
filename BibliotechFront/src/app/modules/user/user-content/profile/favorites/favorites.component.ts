import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  verificaparams!: boolean
  @Input() params: any = {
    idUser: null
  };
  cards: any[] = []

  constructor(private userService: UserService,
              private route: Router) { }

  ngOnInit(): void {
    this.verificaparams = false
    this.obtenerFavoritos();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(":c")
  }

  obtenerFavoritos(){
    this.userService.obtenerFavoritos(this.params.idUser)
    .subscribe(data => {
      console.log(data)
      this.cards = data.body
      this.verificaparams= true;
    }, err => {
      console.log(err)
    })
  }
}
