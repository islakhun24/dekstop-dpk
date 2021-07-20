import { DokumenComponent } from './dokumen/dokumen.component';
import { CetakComponent } from './dokumen/invoice/cetak/cetak.component';
import { DetailComponent } from './dokumen/invoice/detail/detail.component';
import { CheckerComponent } from './checker/checker.component';
import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcceptanceComponent } from './acceptance/acceptance.component';
import { BtbComponent } from './btb/btb.component';
import { UserComponent } from './user/user.component';
import { HargaComponent } from './harga/harga.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcceptanceComponent,
    DashboardComponent,BtbComponent, UserComponent, HargaComponent, CustomerComponent, CheckerComponent, DetailComponent, CetakComponent, DokumenComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutsModule { }
