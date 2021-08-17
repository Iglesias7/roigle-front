import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Car } from 'src/app/core/widgets/models/car';
import { AddVehiculeComponent } from './add_vehicule/add_vehicule.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CarService } from 'src/app/core/services/car.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { User } from 'src/app/core/widgets/models/user';
import { CommuneService } from 'src/app/core/services/commune.service';

@Component({
  selector: 'app-achats',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {

  public user: User;

  constructor(
    private auth: AuthenticationService,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private carService: CarService,
    public snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private communeService: CommuneService
  ) {}

  ngOnInit() {

  }

  create() {
    const car = new Car({});
    const dlg = this.dialog.open(AddVehiculeComponent,
      { data: { car },
      panelClass: 'popUp-delete', });
    dlg.beforeClose().subscribe(res => {
      if (res) {
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.carService.add(res).subscribe(res => {
          if (!res) {
            this.snackBar.open(
              `There was an error at the server. The member has not been created! Please try again.`,
              'Dismiss',
              { duration: 10000 }
            );
          }
        });
      }
    });
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  refreshCurrentUser() {
    this.communeService.findById(this.auth.currentUser.id).subscribe(u => {
      this.auth.storeToken(u);
    });
  }

  achat(name: string, price: number, mark: string) {
    const car = new Car({name, price, mark});
    const id = this.currentUser.id;

    if (this.currentUser.compte.solde < price) {
      this.utilsService.snackBarError(`Oups ! Vous n'avez pas assez d\'argent pour vous offrir cette voiture !`);
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      this.carService.add(id, car).subscribe(car => {
        if (car) {
          this.refreshCurrentUser();
          this.utilsService.snackBarSuccess(`Felicitation ! vous venez d\'acheter ${name}.`);
        } else {
          this.utilsService.snackBarError(`Oups ! peux-etre une mauvaise négociation de votre part ?`);
        }
      });
    }
  }
}
