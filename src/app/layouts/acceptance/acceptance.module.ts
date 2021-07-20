import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptanceRoutingModule } from './acceptance-routing.module';
import { ListComponent } from './list/list.component';
import { ScanComponent } from './scan/scan.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';


@NgModule({
  declarations: [
    ListComponent,
    ScanComponent
  ],
  imports: [
    CommonModule,
    AcceptanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BarcodeScannerLivestreamModule
  ]
})
export class AcceptanceModule { }
