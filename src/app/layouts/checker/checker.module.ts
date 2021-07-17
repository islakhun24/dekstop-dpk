import { DocumentComponent } from './document/document.component';
import { SmuComponent } from './smu/smu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckerRoutingModule } from './checker-routing.module';
import { CheckerComponent } from './checker.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SmuComponent,
    // CheckerComponent,
    DocumentComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CheckerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckerModule { }
