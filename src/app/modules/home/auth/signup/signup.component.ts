import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss']
})

export class SignupComponent {

  form: FormGroup;
  hide = true;
  hide2 = true;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private communeService: CommuneService,
      private authenticationService: AuthenticationService,
      private dialog: MatDialog,
      private utilsService: UtilsService,
      public dialogRef: MatDialogRef<SignupComponent>
  ) {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      firstName: [null, [
        Validators.required, Validators.minLength(3), Validators.maxLength(50)
      ]],
      lastName: [null, [
        Validators.required, Validators.minLength(3), Validators.maxLength(50)
      ]],
      birthDate: [null, [
        Validators.required
      ], [this.validateBirthDate()]],
      email: [null, [
        Validators.required, Validators.email,
        Validators.pattern('^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$')
      ], [this.emailValidator()]],
      password: [null, [
        Validators.required, Validators.minLength(5)
      ]],
      confirm_password: [null, [
        Validators.required
      ], [this.validatePasswords()]]
    });
  }

  validateBirthDate(): AsyncValidatorFn {
      let timeout: NodeJS.Timer;
      return (ctl: FormControl) => {
          clearTimeout(timeout);
          const date = new Date(ctl.value);
          const diff = Date.now() - date.getTime();
          const age = new Date(diff).getUTCFullYear() - 1970;
          return new Promise(resolve => {
              timeout = setTimeout(() => {
                  if (ctl.pristine) {
                      resolve(null);
                  } else if (diff < 0) {
                      resolve (!(diff < 0) ? null : { futureBorn: true } );
                  } else {
                      resolve (age >= 18 ? null : { tooYoung: true });
                  }
              }, 300);
          });
      };
  }

  emailValidator(): AsyncValidatorFn {
      let timeout: NodeJS.Timer;
      return (ctl: FormControl) => {
          clearTimeout(timeout);
          const email = ctl.value;
          return new Promise(resolve => {
              timeout = setTimeout(() => {
                  if (ctl.pristine) {
                      resolve(null);
                  } else {
                    this.communeService.find({email}).subscribe(users => {
                        resolve(users.length > 0 ? {emailUsed: true }  : null);
                    });
                  }
              }, 300);
          });
      };
  }

  validatePasswords(): AsyncValidatorFn {
    let timeout: NodeJS.Timer;
    return (ctl: FormControl) => {
      clearTimeout(timeout);
      const confirmPassword = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() => {
          if (ctl.pristine) {
            resolve(null);
          } else {
            resolve(this.form.get('password').value === confirmPassword ? null : { passwordNotConfirmed: true });
          }
        }, 300);
      });
    };
  }

  signup() {
    const data = this.form.value;

    this.authenticationService.create(data).subscribe(() => {
      if (this.authenticationService.currentUser) {
        this.dialogRef.close();
        this.router.navigate(['/home']);
      }
    });
  }

  public connexion() {
    this.dialogRef.close();
    this.utilsService.connexion();
  }
}
