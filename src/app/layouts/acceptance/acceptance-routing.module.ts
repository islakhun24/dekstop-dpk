import { ScanComponent } from './scan/scan.component';
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
    path: 'scan/:id',
    component: ScanComponent
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
