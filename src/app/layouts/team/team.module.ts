import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { ListComponent } from './list/list.component';
import { TeamComponent } from './team.component';


@NgModule({
  declarations: [
    ListComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TeamModule { }
