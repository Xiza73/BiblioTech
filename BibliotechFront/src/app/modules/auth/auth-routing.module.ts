import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthContentComponent } from "./auth-content/auth-content.component";
import { LoginComponent } from './auth-content/login/login.component';
import { RegisterComponent } from './auth-content/register/register.component';



const routes:Routes = [
   { path:'',
   component: AuthContentComponent,
    children:[
        {
            path:'login',
            component: LoginComponent
        },
        {
            path:'register',
            component: RegisterComponent
        },
        {
            path:'**',
            redirectTo:'login'
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
export class AuthRoutingModule{

}