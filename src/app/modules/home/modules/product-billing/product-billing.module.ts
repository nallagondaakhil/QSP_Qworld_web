import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared";
import { DatePipe } from '@angular/common';
import { ProductBillingRoutingModule } from "./product-billing-routing.module";
import { ProductBillingComponent } from "./product-billing.component";
import { ViewProductBillingComponent } from './components/view-product-billing/view-product-billing.component';
@NgModule({
  declarations: [
    ProductBillingComponent,
    ViewProductBillingComponent,
  ],
  imports: [CommonModule, SharedModule, ProductBillingRoutingModule],
  providers:[DatePipe]
})
export class ProductBillingModule {}
