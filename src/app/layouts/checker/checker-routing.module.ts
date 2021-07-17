import { DocumentComponent } from './document/document.component';
import { SmuComponent } from './smu/smu.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'smu/:id',
    component:SmuComponent
  },
  {
    path:'document/:id',
    component:DocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckerRoutingModule { }
