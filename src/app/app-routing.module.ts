import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

import { AssuntoListComponent } from './components/assunto/assunto-list/assunto-list.component';
import { AssuntoCreateComponent } from './components/assunto/assunto-create/assunto-create.component';
import { AssuntoUpdateComponent } from './components/assunto/assunto-update/assunto-update.component';

import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { AutorCreateComponent } from './components/autor/autor-create/autor-create.component';
import { AutorUpdateComponent } from './components/autor/autor-update/autor-update.component';

import { LivroListComponent } from './components/livro/livro-list/livro-list.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { LivroUpdateComponent } from './components/livro/livro-update/livro-update.component';

import { BookstoreComponent } from './components/bookstores/bookstore/bookstore.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
       {path: 'home', component: HomeComponent},
       
       {path: 'usuarios', component: UsuarioListComponent},
       {path: 'usuarios/create', component: UsuarioCreateComponent, data: { roles: ['ADMIN'] }},
       {path: 'usuarios/update/:id', component: UsuarioUpdateComponent, data: { roles: ['ADMIN'] }},
       {path: 'usuarios/delete/:id', component: UsuarioListComponent, data: { roles: ['ADMIN'] }},
       
       {path: 'assuntos', component: AssuntoListComponent},
       {path: 'assuntos/create', component: AssuntoCreateComponent, data: { roles: ['ADMIN'] }},
       {path: 'assuntos/update/:id', component: AssuntoUpdateComponent, data: { roles: ['ADMIN'] }},
       {path: 'assuntos/delete/:id', component: AssuntoListComponent, data: { roles: ['ADMIN'] }},
       
       {path: 'autores', component: AutorListComponent},
       {path: 'autores/create', component: AutorCreateComponent, data: { roles: ['ADMIN'] }},
       {path: 'autores/update/:id', component: AutorUpdateComponent, data: { roles: ['ADMIN'] }},
       {path: 'autores/delete/:id', component: AutorListComponent, data: { roles: ['ADMIN'] }},
       
       {path: 'livros', component: LivroListComponent},
       {path: 'livros/create', component: LivroCreateComponent, data: { roles: ['ADMIN'] }},
       {path: 'livros/update/:id', component: LivroUpdateComponent, data: { roles: ['ADMIN'] }},
       {path: 'livros/delete/:id', component: LivroListComponent, data: { roles: ['ADMIN'] }},       
       
       {path: 'bookstore', component: BookstoreComponent}
    ] 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
