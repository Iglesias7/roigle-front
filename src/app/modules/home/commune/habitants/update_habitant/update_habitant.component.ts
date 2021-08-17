import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { User } from 'src/app/core/widgets/models/user';
import { CommuneService } from 'src/app/core/services/commune.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
    selector: 'app-update-habitant',
    templateUrl: './update_habitant.component.html',
    styleUrls: ['./update_habitant.component.scss']
})


export class UpdateHabitantComponent {

    public editForm: FormGroup;

    public ctlFirstName: FormControl;
    public ctlLastName: FormControl;
    public ctlEmail: FormControl;
    public ctlBirthDate: FormControl;

    constructor(public dialogRef: MatDialogRef<UpdateHabitantComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { user: User; },
                private formBuilder: FormBuilder,
                private communeService: CommuneService,
                private auth: AuthenticationService
    ) {
        this.ctlFirstName = this.formBuilder.control('', [Validators.minLength(3), Validators.maxLength(50)]);
        this.ctlLastName = this.formBuilder.control('', [Validators.minLength(3), Validators.maxLength(50)]);
        this.ctlEmail = this.formBuilder.control('', [Validators.required, Validators.email], [this.emailUsed()]);
        this.ctlBirthDate = this.formBuilder.control('',[], [this.validateBirthDate()]);

        this.editForm = this.formBuilder.group({
            firstName: this.ctlFirstName,
            lastName: this.ctlLastName,
            email: this.ctlEmail,
            birthDate: this.ctlBirthDate
        });

        this.editForm.patchValue(data.user);
    }

    get currentUser() {
      return this.auth.currentUser;
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

    emailUsed(): AsyncValidatorFn {
        let timeout: NodeJS.Timer;
        return (ctl: FormControl) => {
            clearTimeout(timeout);
            const email = ctl.value;
            return new Promise(resolve => {
                timeout = setTimeout(() => {
                    if (ctl.pristine) {
                        resolve(null);
                    } else {
                        this.communeService.find({email}).subscribe(user => {
                          if (email !== this.data.user.email ) {
                            resolve(user ? {emailUsed: true } :  null);
                          }
                        });
                    }
                }, 300);
            });
        };
    }

    public update() {
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
