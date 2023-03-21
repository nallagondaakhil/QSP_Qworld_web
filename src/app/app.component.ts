import { Component } from "@angular/core";
import { StateService } from "./shared/service/state.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "quess-microservice";
  constructor(public stateService: StateService) {}
}
