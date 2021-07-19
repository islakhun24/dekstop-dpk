import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path: '',
    component:LayoutsComponent,
    canActivate:[AuthGuard],
    loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
