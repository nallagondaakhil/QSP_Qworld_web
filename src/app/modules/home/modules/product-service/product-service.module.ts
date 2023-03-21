import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared";
import { DatePipe } from '@angular/common';
import { ProductServiceRoutingModule } from "./product-service-routing.module";
import { ProductServiceComponent } from "./product-service.component";
import { ViewProductServiceComponent } from './components/view-product-service/view-product-service.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
@NgModule({
  declarations: [
    ProductServiceComponent,
    ViewProductServiceComponent,
  ],
  imports: [CommonModule, SharedModule, ProductServiceRoutingModule, MatPaginatorModule,
    MatSortModule],
  providers:[DatePipe]
})
export class ProductServiceModule {}
