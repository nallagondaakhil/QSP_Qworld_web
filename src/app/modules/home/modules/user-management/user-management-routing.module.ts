import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserManagementComponent } from './components/create-user-management/create-user-management.component';
import { EditUserManagementComponent } from './components/edit-user-management/edit-user-management.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ViewManagementComponent } from './components/view-management/view-management.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path:'',
    component:UserManagementComponent
  },
  {
    path:'edit/:id',
    component:EditUserManagementComponent
  },
  {
    path:'view/:id',
    component:ViewManagementComponent
  },
  {
    path:'create',
    component:CreateUserManagementComponent
  },
  {
    path:'user',
    component:UserInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
