import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import * as _ from 'lodash';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Pret } from 'src/app/core/widgets/models/pret';


@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})


export class MessageComponent {

    constructor(public dialogRef: MatDialogRef<MessageComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { pret: Pret; },
                private auth: AuthenticationService
    ) {

    }

    get currentUser() {
      return this.auth.currentUser;
    }

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public cancel() {
      this.dialogRef.close();
    }

}
