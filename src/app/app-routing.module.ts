import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/componets/login/login.component';
import { EditVentaComponent } from './componets/edit-venta/edit-venta.component';
import { HomeComponent } from './componets/home/home.component';
import { InicioDiamantesComponent } from './componets/inicio-diamantes/inicio-diamantes.component';
import { PageFacturaComponent } from './componets/page-factura/page-factura.component';
import { GuardGuard } from './gruads/guard.guard';

const routes: Routes = [
  {path: '' , component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home',component:HomeComponent, canActivate: [GuardGuard]},
  {path: 'diamantes',component:InicioDiamantesComponent, canActivate:[GuardGuard]},
  {path: 'edit',component:EditVentaComponent, canActivate:[GuardGuard]},
  {path: 'factura/:id',component:PageFacturaComponent},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
