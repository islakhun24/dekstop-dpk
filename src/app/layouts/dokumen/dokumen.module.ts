import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DokumenRoutingModule } from './dokumen-routing.module';
import { ListComponent } from './list/list.component';
import { CsdComponent } from './csd/csd.component';


@NgModule({
  declarations: [
    ListComponent,
    CsdComponent
  ],
  imports: [
    CommonModule,
    DokumenRoutingModule
  ]
})
export class DokumenModule { }
