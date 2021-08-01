import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsdRoutingModule } from './csd-routing.module';
import { CsdComponent } from './csd.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    CsdRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CsdModule { }
