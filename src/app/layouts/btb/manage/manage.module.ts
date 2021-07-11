import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { CheckerComponent } from './checker/checker.component';
import { RejectComponent } from './reject/reject.component';


@NgModule({
  declarations: [
    CheckerComponent,
    RejectComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
