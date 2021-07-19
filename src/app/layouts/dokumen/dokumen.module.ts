import { InvoiceComponent } from './invoice/invoice.component';
import { CsdModule } from './csd/csd.module';
import { InvoiceModule } from './invoice/invoice.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DokumenRoutingModule } from './dokumen-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule,
    CsdModule,
    DokumenRoutingModule
  ]
})
export class DokumenModule { }
