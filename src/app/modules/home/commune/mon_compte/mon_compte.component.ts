import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { User } from 'src/app/core/widgets/models/user';
import { CommuneService } from 'src/app/core/services/commune.service';
import { MatSnackBar } from '@angular/material';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
  AsyncValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon_compte.component.html',
  styleUrls: ['./mon_compte.component.scss']
})
export class MonCompteComponent implements OnInit {

  form: FormGroup;
  delete = false;
  show: any;
  @Input() checked: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private communeService: CommuneService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private utilService: UtilsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loaderService.display();
    this.createFormGroup();
    this.communeService
      .findById(this.auth.currentUser.id)
      .subscribe(user => {
        this.form.patchValue(user);
        this.loaderService.hide();
        this.checked = user.isOpen;
      });
  }

  enLigne() {
    this.checked = !this.checked;
    const data = {isOpen: this.checked};
    this.communeService
      .updateOpen(data, this.auth.currentUser.id)
      .subscribe(res => {
        if (!res) {
          this.utilService.snackBarError(
            `Oups. Une erreur peut etre de notre part. Veillez recommencer plutard.`
          );
          this.ngOnInit();
        } else {
          this.utilService.snackBarSuccess(`Vos données ont bien été sauvé.`);
          this.ngOnInit();
        }
      });
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
      maxMise: [null, [
        Validators.required
      ]]
    });
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
            resolve(!(diff < 0) ? null : { futureBorn: true });
          } else {
            resolve(age >= 18 ? null : { tooYoung: true });
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
              resolve(
                users.length > 0 && email !== this.auth.currentUser.email ? null : { emailUsed: true }
              );
            });
          }
        }, 300);
      });
    };
  }

  public update() {
    const data = this.form.value;
    this.communeService
      .update(data, this.auth.currentUser.id)
      .subscribe(res => {
        if (!res) {
          this.utilService.snackBarError(
            `Oups. Une erreur peut etre de notre part. Veillez recommencer plutard.`
          );
          this.ngOnInit();
        } else {
          this.utilService.snackBarSuccess(`Vos données ont bien été sauvé.`);
          this.ngOnInit();
        }
      });
  }

  deleteUser() {
    const snackBarRef = this.snackBar.open(
      `User '${this.auth.currentUser.email}' Aurevoir et à bientot peut-etre...`,
      'Undo',
      { duration: 10000 }
    );
    snackBarRef.afterDismissed().subscribe(res => {
      if (!res.dismissedByAction) {
        this.communeService.delete(this.auth.currentUser).subscribe(user => {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/']);
        });
      }
    });
  }
}
