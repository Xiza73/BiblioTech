import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content/user-content.component';
import { ProfileComponent } from './user-content/profile/profile.component';
import { SearchComponent } from './user-content/search/search.component';
import { UserContentRoutingModule } from './user-routing.module';
import { CardComponent } from './user-content/card/card.component';
import { CardsContainerComponent } from './user-content/cards-container/cards-container.component';
import { MainViewComponent } from './user-content/main-view/main-view.component';
import { HeaderComponent } from './user-content/header/header.component';
import { FooterComponent } from './user-content/footer/footer.component';
import { LibroComponent } from './user-content/libro/libro.component';
import { FavoritesComponent } from './user-content/profile/favorites/favorites.component';



@NgModule({
  declarations: [UserContentComponent, ProfileComponent, SearchComponent, CardComponent, CardsContainerComponent, MainViewComponent, HeaderComponent, FooterComponent, LibroComponent, FavoritesComponent],
  imports: [
    CommonModule,
    UserContentRoutingModule
  ]
})
export class UserModule { }
