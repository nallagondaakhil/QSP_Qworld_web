import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, Event } from "@angular/router";

@Component({
  selector: "app-common-model",
  templateUrl: "./common-modal.component.html",
  styleUrls: ["./common-modal.component.scss"],
})
export class CommonModalComponent implements OnInit {
  spin_color = "#6dc21f";
  spin_mode = "indeterminate";
  spin_value = 100;
  strokeWidth = 5;
  diameter = 50;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    const htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.classList.add("cdk-global-scrollblock");
  }

  close() {
    this.data.callback(this.data);
    const htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.classList.remove("cdk-global-scrollblock");
  }
}
