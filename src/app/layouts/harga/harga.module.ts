import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HargaRoutingModule } from './harga-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    HargaRoutingModule
  ]
})
export class HargaModule { }
