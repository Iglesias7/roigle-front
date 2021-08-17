import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Car } from 'src/app/core/widgets/models/car';
import { CarService } from 'src/app/core/services/car.service';


@Component({
  // tslint:disable-next-line:component-selector
    selector: 'app-add_vehicule',
    templateUrl: './add_vehicule.component.html',
    styleUrls: ['./add_vehicule.component.scss']
})


export class AddVehiculeComponent implements OnDestroy {
    public editForm: FormGroup;
    public ctlName: FormControl;
    public ctlMark: FormControl;
    public ctlPrice: FormControl;
    public ctlPicture: FormControl;
    public picture: File;

    private tempPicturePath: string;
    private pictureChanged: boolean;


    constructor(public dialogRef: MatDialogRef<AddVehiculeComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { car: Car; },
                private formBuilder: FormBuilder,
                private carService: CarService,
                private auth: AuthenticationService
    ) {
        this.ctlName = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
        this.ctlMark = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
        this.ctlPrice = this.formBuilder.control('');

        this.editForm = this.formBuilder.group({
            name: this.ctlName,
            mark: this.ctlMark,
            price: this.ctlPrice,
            picture: this.picturePath

        }, {});

        this.pictureChanged = false;
    }

    get currentUser() {
      return this.auth.currentUser;
    }

    public update() {
        const data = this.editForm.value;
        console.log(data);
        // data.picturePath = this.tempPicturePath;
        // if (this.pictureChanged) {
        //     this.carService.confirmPicture(data.name, this.tempPicturePath).subscribe();
        //     data.picturePath = 'uploads/' + data.name + '.jpg';
        //     this.pictureChanged = false;
        // }
        this.dialogRef.close(data);
    }

    public cancelTempPicture() {
        const data = this.editForm.value;
        if (this.pictureChanged) {
            this.carService.cancelPicture(this.tempPicturePath).subscribe();
        }
    }

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
            this.picture = file;
            // this.carService.uploadPicture(this.editForm.value.name || 'empty', file).subscribe(path => {
            //     console.log(path);
            //     // this.cancelTempPicture();
            //     this.tempPicturePath = path;
            //     // this.pictureChanged = true;
            //     this.editForm.markAsDirty();
            // });
        }
    }

    get picturePath(): string {
        return this.tempPicturePath && this.tempPicturePath !== '' ? this.tempPicturePath : 'http://localhost:8000/uploads/achats/m11.jpg';
    }

    ngOnDestroy(): void {
        this.cancelTempPicture();
    }
}
