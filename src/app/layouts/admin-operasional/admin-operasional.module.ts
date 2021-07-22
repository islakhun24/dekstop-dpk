import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOperasionalRoutingModule } from './admin-operasional-routing.module';
import { ProjectComponent } from './project/project.component';
import { SmuComponent } from './smu/smu.component';
import { AdminOperasionalComponent } from './admin-operasional.component';


@NgModule({
  declarations: [
    ProjectComponent,
    SmuComponent,
    AdminOperasionalComponent
  ],
  imports: [
    CommonModule,
    AdminOperasionalRoutingModule
  ]
})
export class AdminOperasionalModule { }
