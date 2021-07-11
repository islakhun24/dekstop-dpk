import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptanceRoutingModule } from './acceptance-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AcceptanceRoutingModule
  ]
})
export class AcceptanceModule { }
