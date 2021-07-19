import { DetailComponent } from './dokumen/invoice/detail/detail.component';
import { CheckerComponent } from './checker/checker.component';
import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptanceComponent } from './acceptance/acceptance.component';
import { BtbComponent } from './btb/btb.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DokumenComponent } from './dokumen/dokumen.component';
import { HargaComponent } from './harga/harga.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'dokumen/invoice/detail/:agen',
    component: DetailComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'acceptance',
    component: AcceptanceComponent,
    loadChildren: () => import('./acceptance/acceptance.module').then(m => m.AcceptanceModule)
  },
  {
    path: 'btb',
    component: BtbComponent,
    loadChildren: () => import('./btb/btb.module').then(m => m.BtbModule)
  },
  {
    path: 'dokumen',
    component: DokumenComponent,
    loadChildren: () => import('./dokumen/dokumen.module').then(m => m.DokumenModule)
  },
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'harga',
    component: HargaComponent,
    loadChildren: () => import('./harga/harga.module').then(m => m.HargaModule)
  },
  {
    path: 'customer',
    component: CustomerComponent,
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'checkers',
    component: CheckerComponent,
    loadChildren: () => import('./checker/checker.module').then(m => m.CheckerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
