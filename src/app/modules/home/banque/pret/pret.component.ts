import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, AsyncValidatorFn } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PretService } from 'src/app/core/services/pret.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import { User } from 'src/app/core/widgets/models/user';


@Component({
    selector: 'app-pret',
    templateUrl: './pret.component.html',
    styleUrls: ['./pret.component.scss']
})

export class PretComponent {
    public editForm: FormGroup;
    public ctlMessage: FormControl;
    public ctlMontant: FormControl;
    public ctlDelai: FormControl;

    constructor(public dialogRef: MatDialogRef<PretComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { user: User; },
                private formBuilder: FormBuilder,
                private pretService: PretService,
                private communeService: CommuneService,
                private auth: AuthenticationService,
                public snackBar: MatSnackBar

    ) {
        this.ctlMessage = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
        this.ctlMontant = this.formBuilder.control('', [Validators.required], [this.validateSomme()]);
        this.ctlDelai = this.formBuilder.control('', [Validators.required], [this.validateDate()]);

        this.editForm = this.formBuilder.group({
            message: this.ctlMessage,
            montant: this.ctlMontant,
            delai: this.ctlDelai
        }, {});
    }

  validateSomme(): AsyncValidatorFn {
    let timeout: NodeJS.Timer;
    return (ctl: FormControl) => {
      clearTimeout(timeout);
      const somme = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() => {
          if (ctl.pristine) {
            resolve(null);
          } else if (somme > 0) {
            resolve(!(somme > 150000) ? null : { somme: true });
          }
        }, 300);
      });
    };
  }

    validateDate(): AsyncValidatorFn {
      let timeout: NodeJS.Timer;
      return (ctl: FormControl) => {
        clearTimeout(timeout);
        const date = new Date(ctl.value);
        const diff = Date.now() - date.getTime();
        const max = new Date(Date.now()).getMonth() + 1;

        const diff2 = max - date.getMonth();
        const month = diff2;
        return new Promise(resolve => {
          timeout = setTimeout(() => {
            if (ctl.pristine) {
              resolve(null);
            } else if (diff > 0) {
              resolve(!(diff > 0) ? null : { avant: true });
            } else {
              resolve(diff2 >= 0 ? null : { plus: true });
            }
          }, 300);
        });
      };
    }

    get currentUser() {
      return this.auth.currentUser;
    }

    public preter() {
      const data = this.editForm.value;
      this.dialogRef.close(data);
    }

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public cancel() {
      this.dialogRef.close();
    }
}
