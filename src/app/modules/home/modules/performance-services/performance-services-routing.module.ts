import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewLogsServiceComponent } from "./components/view-logs-service/view-logs-service.component";
import { PerformanceServicesComponent } from "./performance-services.component";

const routes: Routes = [
  {
    path: "",
    component: PerformanceServicesComponent,
  },
  {
    path: "view/:id",
    component: ViewLogsServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceServicesRoutingModule {}
