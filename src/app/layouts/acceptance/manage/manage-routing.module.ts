import { DetailComponent } from './detail/detail.component';
// import { DetailComponent } from './../../dashboard/detail/detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path:'create',
    component: CreateComponent
  },
  {
    path:'edit/:id',
    component: EditComponent
  },
  {
    path:'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
