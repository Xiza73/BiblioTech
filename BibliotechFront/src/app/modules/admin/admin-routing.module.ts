import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { ListaLibrosComponent } from './admin-content/lista-libros/lista-libros.component';
import { ListaUsuariosComponent } from './admin-content/lista-usuarios/lista-usuarios.component';


const routes:Routes = [
   { path:'',
   component: AdminContentComponent,
    children:[
        {
            path:'listalibros',
            component: ListaLibrosComponent

        },
        {
            path:'listausuarios',
            component:ListaUsuariosComponent
        },
        {
            path:'**',
            redirectTo: 'listalibros'
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
export class AdminContentRouting{

}