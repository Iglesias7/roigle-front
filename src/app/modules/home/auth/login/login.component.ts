import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImmoService } from 'src/app/core/services/immo.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;    // utilisé en HTML pour désactiver le bouton pendant la requête de login
    submitted = false;  // retient si le formulaire a été soumis ; utilisé pour n'afficher les
    // erreurs que dans ce cas-là (voir template)
    returnUrl: string;
    ctlEmail: FormControl;
    ctlPassword: FormControl;
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private communeService: CommuneService,
        private authenticationService: AuthenticationService,
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<LoginComponent>
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUser) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
      this.ctlEmail = this.formBuilder.control('', Validators.required, [this.emailNotExist()]);
      this.ctlPassword = this.formBuilder.control('', Validators.required, [this.badPassword()]);
      this.loginForm = this.formBuilder.group({
          email: this.ctlEmail,
          password: this.ctlPassword
      });

      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    }

    emailNotExist(): AsyncValidatorFn {
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
                          resolve(users.length > 0 ? null :  {emailNotExist: true } );
                      });
                  }
              }, 300);
          });
      };
    }

    badPassword(): AsyncValidatorFn {
      let timeout: NodeJS.Timer;
      return (ctl: FormControl) => {
        clearTimeout(timeout);
        const email = this.ctlEmail;
        const password = ctl.value;
        return new Promise(resolve => {
          timeout = setTimeout(() => {
            if (ctl.pristine) {
                resolve(null);
            } else {
                // @ts-ignore
              this.communeService.find({email: email.value, password}).subscribe(users => {
                    resolve(users.length > 0 ? null :  {badPassword: true } );
                });
            }
          }, 300);
        });
      };
    }

    // On définit ici un getter qui permet de simplifier les accès aux champs du formulaire dans le HTML
    get f() { return this.loginForm.controls; }

    /**
     * Cette méthode est bindée sur l'événement onsubmit du formulaire. On va y faire le
     * login en faisant appel à AuthenticationService.
     */
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) { return; }

        this.authenticationService.authenticate(this.f.email.value, this.f.password.value)
          .subscribe(
            data => {
                this.dialogRef.close();
                this.router.navigate([this.returnUrl]);
            },
            error => {
              const errors = error.error.errors;
              for (const field in errors) {
                  this.loginForm.get(field.toLowerCase()).setErrors({ custom: errors[field] });
              }
            }
          );
    }
}
