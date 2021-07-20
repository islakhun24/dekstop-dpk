import { CsdComponent } from './csd/csd.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
  path:'',
  redirectTo:'index',
  pathMatch:'full'
},
{
  path:'index',
  component: ListComponent
},
{
  path:'invoice',
  component:InvoiceComponent,
  loadChildren:()=>import('./invoice/invoice.module').then(a=> a.InvoiceModule)
},

{
  path:'csd',
  component:CsdComponent,
  loadChildren:()=>import('./csd/csd.module').then(a=> a.CsdModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DokumenRoutingModule { }
