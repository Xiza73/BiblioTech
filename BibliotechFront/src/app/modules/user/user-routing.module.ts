import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { UserContentComponent } from './user-content/user-content.component';
import { ProfileComponent } from './user-content/profile/profile.component';
import { MainViewComponent } from "./user-content/main-view/main-view.component";

const routes:Routes = [
   { path:'',
   component: UserContentComponent,
    children:[
        {
           path: 'perfil',
           component: ProfileComponent
        },
        {
            path: 'main-view',
            component: MainViewComponent
        }
    ],
},
];
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class UserContentRoutingModule{

}