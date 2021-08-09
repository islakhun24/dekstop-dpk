import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { AktifComponent } from './aktif/aktif.component';
import { RiwayatComponent } from './riwayat/riwayat.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CetakComponent } from './cetak/cetak.component';
import { CetakSemuaComponent } from './cetak-semua/cetak-semua.component';


@NgModule({
  declarations: [


    AktifComponent,
        RiwayatComponent,
        AktifComponent,
        CetakSemuaComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InvoiceModule { }
