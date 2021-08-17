import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: "app-popUp-delete",
  templateUrl: "./popUp-delete.component.html",
  styleUrls: ["./popUp-delete.component.scss"]
})

export class PopUpDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<PopUpDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    public delete() {
      this.dialogRef.close(true);
    }

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public cancel() {
      this.dialogRef.close();
    }

}
