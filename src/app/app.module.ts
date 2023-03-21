import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  SharedModule,
} from "@shared";
import { AuthModule } from "@modules/auth/auth.module";
import { HomeModule } from "@modules/home/home.module";
import { AuthLayoutComponent } from "@layout/auth-layout/auth-layout.component";
import { ContentLayoutComponent } from "@layout/content-layout/content-layout.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoAuthGuard, AuthGuard } from "@shared";
import { ToastrModule } from "ngx-toastr";
@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, ContentLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    NoAuthGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
