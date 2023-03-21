import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared";
import { PerformanceServicesRoutingModule } from "./performance-services-routing.module";
import { PerformanceServicesComponent } from "./performance-services.component";
import { ViewLogsServiceComponent } from "./components/view-logs-service/view-logs-service.component";
import { MessageService } from "primeng/api";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [PerformanceServicesComponent, ViewLogsServiceComponent],
  imports: [CommonModule, SharedModule, PerformanceServicesRoutingModule,MatPaginatorModule,MatSortModule,NgxChartsModule],
  providers: [MessageService],
})
export class PerformanceServicesModule {}
