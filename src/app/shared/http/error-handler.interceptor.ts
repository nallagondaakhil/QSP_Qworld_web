import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "@env/environment";
import { Logger } from "../logger.service";
import { StateService } from "../../shared/service/state.service";
import { Router } from "@angular/router";

const log = new Logger("ErrorHandlerInterceptor");

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: "root",
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private state: StateService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      setTimeout(() => {
        this.state.dialogClose();
      }, 100);

      setTimeout(() => {
        this.state.showMessage({
          type: "message",
          message: ["Please check your Internet Connection and try again."],
        });
      }, 250);
    } else {
      if (this.state.getLocal("token")) {
        request = request.clone({
          headers: request.headers.set(
            "Authorization",
            `Bearer ${this.state.getLocal("token")}`
          ),
        });
      }
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.statusText === "UNAUTHORIZED") {
          this.router.navigate(["/sign"]);
        }
        // else {
        //   this.state.showMessage({
        //     type: "message",
        //     message: [
        //       "There is some problem while processing the data. Please try again.",
        //     ],
        //   });
        // }
        return this.errorHandler(error);
      })
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error("Request error", response);
    }
    throw response;
  }
}
