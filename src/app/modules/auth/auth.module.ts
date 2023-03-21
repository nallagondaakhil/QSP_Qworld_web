import { NgModule } from '@angular/core';

import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth.routing';
import { ForgotPassowrdComponent } from './page/forgot-passowrd/forgot-passowrd.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPassowrdComponent],
  imports: [AuthRoutingModule, SharedModule,CommonModule]
})
export class AuthModule {}
