import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceManagementComponent } from './components/create-service-management/create-service-management.component';
import { EditServiceManagementComponent } from './components/edit-service-management/edit-service-management.component';
import { ViewApprovalComponent } from './components/view-approval/view-approval.component';
import { ViewServiceManagementComponent } from './components/view-service-management/view-service-management.component';
import { ServiceManagementComponent } from './service-management.component';

const routes: Routes = [
  {
    path:'',
    component:ServiceManagementComponent
  },
  {
    path:'view/:id',
    component:ViewServiceManagementComponent
  },
  {
    path:'view-approval/:id',
    component:ViewApprovalComponent
  },
  {
    path:'edit/:id',
    component:EditServiceManagementComponent
  },
  {
    path:'create',
    component:CreateServiceManagementComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceManagementRoutingModule { }
