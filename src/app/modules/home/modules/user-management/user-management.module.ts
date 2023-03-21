import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { ViewUserManagementComponent } from './components/view-user-management/view-user-management.component';
import { EditUserManagementComponent } from './components/edit-user-management/edit-user-management.component';
import { CreateUserManagementComponent } from './components/create-user-management/create-user-management.component';
import { SharedModule } from '@shared';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ViewManagementComponent } from './components/view-management/view-management.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    ViewUserManagementComponent,
    EditUserManagementComponent,
    CreateUserManagementComponent,
    UserInfoComponent,
    ViewManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
