import { InvoiceComponent } from './invoice/invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CsdComponent } from './csd/csd.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [ {
  path:'',
  redirectTo:'list',
  pathMatch:'full'
},
{
  path:'list',
  component: ListComponent
},
{
  path:'invoice',
  component:InvoiceComponent,
  loadChildren:()=>import('./invoice/invoice.module').then(a=> a.InvoiceModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DokumenRoutingModule { }
