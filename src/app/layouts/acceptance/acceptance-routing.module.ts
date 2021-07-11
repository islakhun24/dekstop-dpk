import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptanceRoutingModule { }
