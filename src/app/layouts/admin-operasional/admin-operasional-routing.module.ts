import { SmuComponent } from './smu/smu.component';
import { ProjectComponent } from './project/project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'project',
    pathMatch:'full'
  },
  {
    path:'project',
    component:ProjectComponent
  },
  {
    path:'project/smu/:id',
    component:SmuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOperasionalRoutingModule { }
