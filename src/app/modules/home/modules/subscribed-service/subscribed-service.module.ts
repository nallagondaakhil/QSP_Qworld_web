import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared";
import { DatePipe } from '@angular/common';
import { SubscribedServiceComponentRoutingModule } from "./subscribed-service-routing.module";
import { SubscribedServiceComponent } from "./subscribed-service.component";
import { EditSubscribedServiceComponent } from './components/edit-subscribed-service/edit-subscribed-service.component';
import { ViewSubscribedServiceComponent } from './components/view-subscribed-service/view-subscribed-service.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
@NgModule({
  declarations: [
    SubscribedServiceComponent,
    EditSubscribedServiceComponent,
    ViewSubscribedServiceComponent,
  ],
  imports: [CommonModule, SharedModule, SubscribedServiceComponentRoutingModule,MatPaginatorModule,MatSortModule],
  providers:[DatePipe]
})
export class SubscribedServiceModule {}
