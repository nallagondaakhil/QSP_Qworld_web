import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-message-popup",
  templateUrl: "./message-popup.component.html",
  styleUrls: ["./message-popup.component.scss"],
})
export class MessagePopupComponent implements OnInit {
  @Input() data: any;
  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    if (this.data.timer) {
      setTimeout(() => {
        this.data.callback();
      }, this.data.timer);
    }
  }

  @HostListener("document:click", ["$event.target"])
  public onClick(targetElement: any) {
    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.data["type"] == "message") {
      this.data.callback();
    }
  }
}
