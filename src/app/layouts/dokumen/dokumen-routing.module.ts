import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsdComponent } from './csd/csd.component';
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
  path:'csd/:id',
  component:CsdComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DokumenRoutingModule { }
