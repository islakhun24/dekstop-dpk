import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckerComponent } from './checker/checker.component';
import { RejectComponent } from './reject/reject.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'checker',
    pathMatch:'full'
  },
  {
    path:'checker/:id',
    component: CheckerComponent
  },
  {
    path:'reject',
    component: RejectComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageRoutingModule { }
