import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!window.localStorage.token) {
      return true;
    }
    this.router.navigateByUrl("/content");
    return false;
  }
}
