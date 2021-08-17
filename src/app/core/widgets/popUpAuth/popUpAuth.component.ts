import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from 'src/app/modules/home/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/home/auth/signup/signup.component';

@Component({
  selector: 'app-popUpAuth',
  templateUrl: './popUpAuth.component.html',
  styleUrls: ['./popUpAuth.component.scss']
})
export class PopUpAuthComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
     private loaderService: LoaderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PopUpAuthComponent>
    ) {}

  ngOnInit() {

  }

  public connexion(){
    this.dialogRef.close();
    this.dialog.open(LoginComponent);
  }

  public register(){
    this.dialogRef.close();
    this.dialog.open(SignupComponent);
  }
}
