import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminContentRouting } from './admin-routing.module';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { ListaLibrosComponent } from './admin-content/lista-libros/lista-libros.component';
import { ListaUsuariosComponent } from './admin-content/lista-usuarios/lista-usuarios.component';



@NgModule({
  declarations: [AdminContentComponent, SidebarAdminComponent, ListaLibrosComponent, ListaUsuariosComponent],
  imports: [
    CommonModule,
    AdminContentRouting
  ],
 
})
export class AdminModule { }
