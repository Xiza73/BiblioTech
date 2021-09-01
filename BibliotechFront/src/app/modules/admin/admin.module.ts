import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminContentRouting } from './admin-routing.module';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { ListaLibrosComponent } from './admin-content/lista-libros/lista-libros.component';
import { ListaUsuariosComponent } from './admin-content/lista-usuarios/lista-usuarios.component';
import { AgregarUsuarioComponent } from './admin-content/agregar-usuario/agregar-usuario.component';
import { AgregarLibroComponent } from './admin-content/agregar-libro/agregar-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminContentComponent, SidebarAdminComponent, ListaLibrosComponent, ListaUsuariosComponent, AgregarUsuarioComponent, AgregarLibroComponent],
  imports: [
    CommonModule,
    AdminContentRouting,
    FormsModule,
    ReactiveFormsModule
  ],
 
})
export class AdminModule { }
