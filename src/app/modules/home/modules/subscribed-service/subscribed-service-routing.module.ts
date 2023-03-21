import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSubscribedServiceComponent } from './components/edit-subscribed-service/edit-subscribed-service.component';
import { ViewSubscribedServiceComponent } from './components/view-subscribed-service/view-subscribed-service.component';
import { SubscribedServiceComponent } from './subscribed-service.component';


const routes: Routes = [
  {
    path:'',
    component:SubscribedServiceComponent
  },
  {
    path:'edit/:id',
    component:EditSubscribedServiceComponent
  },
  {
    path:'view/:id',
    component:ViewSubscribedServiceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribedServiceComponentRoutingModule { }