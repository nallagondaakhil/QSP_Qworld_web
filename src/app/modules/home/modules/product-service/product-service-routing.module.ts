import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductServiceComponent } from './components/view-product-service/view-product-service.component';
import { ProductServiceComponent } from './product-service.component';

const routes: Routes = [
  {
    path: '',
    component: ProductServiceComponent
  },
  {
    path:'view/:id',
    component:ViewProductServiceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductServiceRoutingModule { }