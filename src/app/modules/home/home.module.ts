import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { BussinessEntityModule } from './modules/bussiness-entity/bussiness-entity.module';
import { ServiceManagementModule } from './modules/service-management/service-management.module';
import { ProductBillingModule } from './modules/product-billing/product-billing.module';
import { ProductServiceModule } from './modules/product-service/product-service.module';
import { SubscribedServiceModule } from './modules/subscribed-service/subscribed-service.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ReportsModule } from './modules/reports/reports.module';

@NgModule({
  declarations: [
    HomeComponent,
    SideNavBarComponent,
    ContentWrapperComponent,
  ],
  imports: [SharedModule, CommonModule,HomeRoutingModule,BussinessEntityModule,ServiceManagementModule,SubscribedServiceModule,ProductBillingModule,DashboardModule,ReportsModule],
  exports: [],
  providers: [],
  entryComponents: []
})
export class HomeModule {}
