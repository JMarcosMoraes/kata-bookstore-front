import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

import { AssuntoListComponent } from './components/assunto/assunto-list/assunto-list.component';
import { AssuntoCreateComponent } from './components/assunto/assunto-create/assunto-create.component';
import { AssuntoUpdateComponent } from './components/assunto/assunto-update/assunto-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
       {path: 'home', component: HomeComponent},
       {path: 'assuntos', component: AssuntoListComponent},
       {path: 'assuntos/create', component: AssuntoCreateComponent},
       {path: 'assuntos/update/:id', component: AssuntoUpdateComponent}
    ] 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
