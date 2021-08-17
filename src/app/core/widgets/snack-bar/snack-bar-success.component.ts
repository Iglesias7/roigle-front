import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
    templateUrl: './snack-bar-success.component.html'
})

export class SnackBarComponent {

    constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: any,
      public snackBarRef: MatSnackBarRef<SnackBarComponent>
    ) {
    }

}
