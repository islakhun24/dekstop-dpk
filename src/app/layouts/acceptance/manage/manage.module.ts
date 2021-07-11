import { DetailComponent } from './detail/detail.component';
// import { DetailComponent } from './../../dashboard/detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ManageModule { }
