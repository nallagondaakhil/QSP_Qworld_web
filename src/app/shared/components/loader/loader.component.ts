import { Component, OnInit } from "@angular/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  color = "primary";
  mode: ProgressSpinnerMode = "indeterminate";
  value = 100;
  strokeWidth = 5;
  diameter = 50;

  constructor() {}

  ngOnInit() {}
}
