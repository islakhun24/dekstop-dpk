import { CheckerComponent } from './checker/checker.component';
import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcceptanceComponent } from './acceptance/acceptance.component';
import { BtbComponent } from './btb/btb.component';
import { DokumenComponent } from './dokumen/dokumen.component';
import { UserComponent } from './user/user.component';
import { HargaComponent } from './harga/harga.component';


@NgModule({
  declarations: [
    AcceptanceComponent,
    DashboardComponent,BtbComponent, DokumenComponent, UserComponent, HargaComponent, CustomerComponent, CheckerComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
