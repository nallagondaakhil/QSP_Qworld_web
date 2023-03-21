import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared";
import { DatePipe } from '@angular/common';
import { SubscriberManagementRoutingModule } from "./subscriber-management-routing.module";
import { SubscriberManagementComponent } from "./subscriber-management.component";
import { EditSubscriberManagementComponent } from './components/edit-subscriber-management/edit-subscriber-management.component';
import { ViewSubscriberManagementComponent } from './components/view-subscriber-management/view-subscriber-management.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
@NgModule({
  declarations: [
    SubscriberManagementComponent,
    EditSubscriberManagementComponent,
    ViewSubscriberManagementComponent
  ],
  imports: [CommonModule, SharedModule, SubscriberManagementRoutingModule,MatPaginatorModule,MatSortModule],
  providers:[DatePipe]
})
export class SubscriberManagementModule {}
