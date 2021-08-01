import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content/user-content.component';
import { ProfileComponent } from './user-content/profile/profile.component';
import { SearchComponent } from './user-content/search/search.component';



@NgModule({
  declarations: [UserContentComponent, ProfileComponent, SearchComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
