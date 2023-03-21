import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductManagementComponent } from './components/create-product-management/create-product-management.component';
import { EditProductManagementComponent } from './components/edit-product-management/edit-product-management.component';
import { ProductManagementComponent } from './product-management.component';

const routes: Routes = [
  {
    path:'',
    component:ProductManagementComponent
  },
  {
    path:'edit/:id',
    component:EditProductManagementComponent
  },
  {
    path:'create',
    component:CreateProductManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
