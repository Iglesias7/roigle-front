import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnackBarComponent } from '../widgets/snack-bar/snack-bar-success.component';
import { PopUpDeleteComponent } from '../widgets/popUpDelete/popUp-delete.component';
import { LoginComponent } from 'src/app/modules/home/auth/login/login.component';

@Injectable({ providedIn: 'root' })

export class UtilsService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  public snackBarSuccess(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: 'snack-success',
      verticalPosition: 'top',
    });
  }

  public snackBarError(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: 'snack-error',
      verticalPosition: 'top',
    });
  }

  public snackBarAlert(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: 'snack-alert',
      verticalPosition: 'top',
    });
  }

  public snackBarInfo(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: 'snack-info',
      verticalPosition: 'top',
    });
  }

  public dialogSuppress(data: any) {
    return this.dialog.open(PopUpDeleteComponent, {
      data,
      panelClass: 'popUp-delete'
    });
  }

  public connexion() {
    this.dialog.open(LoginComponent);
  }
}
