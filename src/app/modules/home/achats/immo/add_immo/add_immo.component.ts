import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ImmoComponent } from '../immo.component';
import { Immobilier } from 'src/app/core/widgets/models/immobilier';
import { ImmoService } from 'src/app/core/services/immo.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
    selector: 'app-add-immo',
    templateUrl: './add_immo.component.html',
    styleUrls: ['./add_immo.component.scss']
})


export class AddImmoComponent implements OnDestroy {
    public editForm: FormGroup;
    public ctlName: FormControl;
    public ctlType: FormControl;
    public ctlPrice: FormControl;
    public ctlPicture: FormControl;

    private tempPicturePath: string;
    private pictureChanged: boolean;

    constructor(
      public dialogRef: MatDialogRef<ImmoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { immo: Immobilier; },
      private formBuilder: FormBuilder,
      private immoService: ImmoService,
      private auth: AuthenticationService
    ) {
        this.ctlName = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
        this.ctlType = this.formBuilder.control('');
        this.ctlPrice = this.formBuilder.control('');

        this.editForm = this.formBuilder.group({
            name: this.ctlName,
            type: this.ctlType,
            price: this.ctlPrice,
            picture: this.ctlPicture

        }, {});

        this.pictureChanged = false;
    }

    get currentUser() {
      return this.auth.currentUser;
    }

    public update() {
        const data = this.editForm.value;
        data.picture = this.tempPicturePath;
        if (this.pictureChanged) {
            this.immoService.confirmPicture(data.name, this.tempPicturePath).subscribe();
            data.picturePath = 'uploads/' + data.name + '.jpg';
            this.pictureChanged = false;
        }
        this.dialogRef.close(data);
    }

    // public cancelTempPicture() {
    //     const data = this.editForm.value;
    //     if (this.pictureChanged) {
    //         this.immoService.cancelPicture(this.tempPicturePath).subscribe();
    //     }
    // }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public cancel() {
        this.dialogRef.close();
    }

    public fileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];
            this.immoService.uploadPicture(this.editForm.value.pseudo || 'empty', file).subscribe(path => {
                console.log(path);
                // this.cancelTempPicture();
                this.tempPicturePath = path;
                this.pictureChanged = true;
                this.editForm.markAsDirty();
            });
        }
    }

    get picturePath(): string {
        return this.tempPicturePath && this.tempPicturePath !== '' ? this.tempPicturePath : 'uploads/unknown-user.jpg';
    }

    ngOnDestroy(): void {
        // this.cancelTempPicture();
    }
}
