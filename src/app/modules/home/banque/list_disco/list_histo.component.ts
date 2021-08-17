import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Immobilier } from 'src/app/core/widgets/models/immobilier';
import { ImmoService } from 'src/app/core/services/immo.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
    selector: 'app-list-histo',
    templateUrl: './list_histo.component.html',
    styleUrls: ['./list_histo.component.scss']
})


export class ListHistoComponent {

    constructor(
        private auth: AuthenticationService
    ) {

    }

    get currentUser() {
      return this.auth.currentUser;
    }
}
