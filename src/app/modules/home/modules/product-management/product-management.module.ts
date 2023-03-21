import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { ViewProductManagementComponent } from './components/view-product-management/view-product-management.component';
import { EditProductManagementComponent } from './components/edit-product-management/edit-product-management.component';
import { CreateProductManagementComponent } from './components/create-product-management/create-product-management.component';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { SharedModule } from '@app/shared';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ProductManagementComponent,
    ViewProductManagementComponent,
    EditProductManagementComponent,
    CreateProductManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductManagementRoutingModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ProductManagementModule { }
