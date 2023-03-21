import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSubscriberManagementComponent } from './components/edit-subscriber-management/edit-subscriber-management.component';
import { ViewSubscriberManagementComponent } from './components/view-subscriber-management/view-subscriber-management.component';
import { SubscriberManagementComponent } from './subscriber-management.component';


const routes: Routes = [
  {
    path:'',
    component:SubscriberManagementComponent
  },
  {
    path:'edit/:id',
    component:EditSubscriberManagementComponent
  },
  {
    path:'view/:id',
    component:ViewSubscriberManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberManagementRoutingModule { }
