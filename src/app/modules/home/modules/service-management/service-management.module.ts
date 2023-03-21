import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ServiceManagementRoutingModule } from "./service-management-routing.module";
import { ServiceManagementComponent } from "./service-management.component";
import { SharedModule } from "@shared";
import { ViewServiceManagementComponent } from "./components/view-service-management/view-service-management.component";
import { EditServiceManagementComponent } from "./components/edit-service-management/edit-service-management.component";
import { CreateServiceManagementComponent } from "./components/create-service-management/create-service-management.component";
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ViewApprovalComponent } from './components/view-approval/view-approval.component';
@NgModule({
  declarations: [
    ServiceManagementComponent,
    ViewServiceManagementComponent,
    EditServiceManagementComponent,
    CreateServiceManagementComponent,
    ViewApprovalComponent,
  ],
  imports: [CommonModule, SharedModule, ServiceManagementRoutingModule,MatPaginatorModule,MatSortModule],
  providers:[DatePipe]
})
export class ServiceManagementModule {}
