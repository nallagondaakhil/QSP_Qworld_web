import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductBillingComponent } from './components/view-product-billing/view-product-billing.component';
import { ProductBillingComponent } from './product-billing.component';


const routes: Routes = [
  {
    path:'',
    component:ProductBillingComponent
  },
  {
    path:'view/:id',
    component:ViewProductBillingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBillingRoutingModule { }