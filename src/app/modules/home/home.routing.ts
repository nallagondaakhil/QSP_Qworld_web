import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./page/home.component";

export const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "/content/home/performance-services",
  //   pathMatch: "full",
  // },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import(
            "./modules/dashboard/dashboard.module"
            ).then((m) => m.DashboardModule),
      },
      {
        path: "business-entity",
        loadChildren: () =>
          import("./modules/bussiness-entity/bussiness-entity.module").then(
            (m) => m.BussinessEntityModule
          ),
      },
      {
        path: "product-management",
        loadChildren: () =>
          import(
            "./modules/product-management/product-management.module"
          ).then((m) => m.ProductManagementModule),
      },
      {
        path: "user-management",
        loadChildren: () =>
          import(
            "./modules/user-management/user-management.module"
          ).then((m) => m.UserManagementModule),
      },
      {
        path: "service-management",
        loadChildren: () =>
          import("./modules/service-management/service-management.module").then(
            (m) => m.ServiceManagementModule
          ),
      },
      {
        path: "subscriber-management",
        loadChildren: () =>
          import("./modules/subscriber-management/subscriber-management.module").then(
            (m) => m.SubscriberManagementModule
          ),
      },
      {
        path: "productbilling",
        loadChildren: () =>
          import("./modules/product-billing/product-billing.module").then(
            (m) => m.ProductBillingModule
          ),
      },
      {
        path: "productservice",
        loadChildren: () =>
          import("./modules/product-service/product-service.module").then(
            (m) => m.ProductServiceModule
          ),
      },
      {
        path: "subscribedservice",
        loadChildren: () =>
          import("./modules/subscribed-service/subscribed-service.module").then(
            (m) => m.SubscribedServiceModule
          ),
      },
      {
        path: "performance-services",
        loadChildren: () =>
          import(
            "./modules/performance-services/performance-services.module"
          ).then((m) => m.PerformanceServicesModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import(
            "./modules/reports/reports.module"
            ).then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
