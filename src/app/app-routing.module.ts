import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentLayoutComponent, AuthLayoutComponent } from "@layout";
import { NoAuthGuard, AuthGuard } from "@shared";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "content",
        loadChildren: () =>
          import("@modules/home/home.module").then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import("@modules/auth/auth.module").then((m) => m.AuthModule),
  },
  // Fallback when no prior routes is matched
  { path: "**", redirectTo: "/auth/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
