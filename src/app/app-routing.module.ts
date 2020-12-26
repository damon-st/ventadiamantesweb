import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/componets/login/login.component';
import { HomeComponent } from './componets/home/home.component';
import { GuardGuard } from './gruads/guard.guard';

const routes: Routes = [
  {path: '' , component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home',component:HomeComponent, canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
