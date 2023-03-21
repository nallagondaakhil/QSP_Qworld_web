import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BussinessEntityRoutingModule } from './bussiness-entity-routing.module';
import { BussinessEntityComponent } from './bussiness-entity.component';
import { ViewBusinessEntityComponent } from './components/view-business-entity/view-business-entity.component';
import { CreateBusinessEntityComponent } from './components/create-business-entity/create-business-entity.component';
import { EditBusinessEntityComponent } from './components/edit-business-entity/edit-business-entity.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    BussinessEntityComponent,
    ViewBusinessEntityComponent,
    CreateBusinessEntityComponent,
    EditBusinessEntityComponent
  ],
  imports: [
    CommonModule,
    BussinessEntityRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BussinessEntityModule { }
