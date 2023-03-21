import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-title-with-back-arrow",
  templateUrl: "./title-with-back-arrow.component.html",
  styleUrls: ["./title-with-back-arrow.component.scss"],
})
export class TitleWithBackArrowComponent implements OnInit {
  @Input("titleWithBack") titleWithBack: any = {};

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    if (this.titleWithBack?.goBackUrk) {
      this.router.navigate([this.titleWithBack?.goBackUrk]);
    } else {
      this.location.back();
    }
  }
}
