import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BtbRoutingModule } from './btb-routing.module';
import { BtbComponent } from './btb.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    BtbRoutingModule
  ]
})
export class BtbModule { }
