import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoAuthGuard } from "@shared/guard/no-auth.guard";
import {
  ControlMessagesComponent,
  BreadcrumbComponent,
  MessagePopupComponent,
  CommonModalComponent,
  LoaderComponent,
  TitleWithBackArrowComponent,
} from "./components";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { NgxChartsModule } from "@swimlane/ngx-charts";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    OverlayPanelModule,
    NgxChartsModule
    
  ],
  declarations: [
    ControlMessagesComponent,
    BreadcrumbComponent,
    MessagePopupComponent,
    CommonModalComponent,
    LoaderComponent,
    TitleWithBackArrowComponent,
  ],
  providers: [NoAuthGuard],
  exports: [
    ControlMessagesComponent,
    BreadcrumbComponent,
    MessagePopupComponent,
    CommonModalComponent,
    LoaderComponent,
    TitleWithBackArrowComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule,
    MaterialModule,
    HttpClientModule,
    OverlayPanelModule,
    NgxChartsModule
    
  ],
})
export class SharedModule {}
