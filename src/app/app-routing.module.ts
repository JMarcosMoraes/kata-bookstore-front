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

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
       {path: 'home', component: HomeComponent},
       {path: 'assuntos', component: AssuntoListComponent},
       {path: 'assuntos/create', component: AssuntoCreateComponent},
       {path: 'assuntos/update/:id', component: AssuntoUpdateComponent},
       {path: 'assuntos/delete/:id', component: AssuntoListComponent},
       {path: 'autores', component: AutorListComponent},
       {path: 'autores/create', component: AutorCreateComponent},
       {path: 'autores/update/:id', component: AutorUpdateComponent},
       {path: 'autores/delete/:id', component: AutorListComponent},
       {path: 'livros', component: LivroListComponent},
       {path: 'livros/create', component: LivroCreateComponent},
       {path: 'livros/update/:id', component: LivroUpdateComponent},
       {path: 'livros/delete/:id', component: LivroListComponent},
       {path: 'livros', component: LivroListComponent},
       {path: 'bookstore', component: BookstoreComponent}
    ] 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
