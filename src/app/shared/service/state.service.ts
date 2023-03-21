import { Injectable, Inject } from "@angular/core";
import { CommonModalComponent } from "../components/common-modal/common-modal.component";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class StateService {
  public calledApiList: Array<string> = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isAuthenticated() {
    return !(localStorage.token === undefined || localStorage.token === "");
  }

  addCalledApi(url: string) {
    setTimeout(() => {
      this.calledApiList.push(url);
    }, 0);
  }

  removeCalledApi(url: string) {
    setTimeout(() => {
      this.calledApiList.splice(this.calledApiList.indexOf(url), 1);
    }, 0);
  }

  showMessage(options: any): void {
    const dialogRef = this.dialog.open(CommonModalComponent, {
      data: {
        ...options,
        callback: (data: any) => {
          this.dialog.closeAll();
        },
      },
      width: "600px",
      maxHeight: "inherit",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  dialogClose() {
    this.dialog.closeAll();
  }

  getLocal(key: string) {
    return localStorage.getItem(key);
  }

  setLocal(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  logout() {
    localStorage.clear();
  }
}
