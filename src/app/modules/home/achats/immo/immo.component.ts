import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Immobilier } from 'src/app/core/widgets/models/immobilier';
import { MatDialog } from '@angular/material';
import { ImmoService } from 'src/app/core/services/immo.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import {AddImmoComponent} from './add_immo/add_immo.component';

@Component({
  selector: 'app-immo',
  templateUrl: './immo.component.html',
  styleUrls: ['./../vehicule/vehicule.component.scss']
})

export class ImmoComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private utilsService: UtilsService,
    public dialog: MatDialog,
    private immoService: ImmoService,
    private communeService: CommuneService
  ) {}

  ngOnInit() {}

  get currentUser() {
    return this.auth.currentUser;
  }

  refreshCurrentUser() {
    this.communeService.findById(this.auth.currentUser.id).subscribe(u => {
      this.auth.storeToken(u);
    });
  }

  create() {
    const immo = new Immobilier({});
    const dlg = this.dialog.open(AddImmoComponent, { data: { immo } });
    dlg.beforeClose().subscribe(res => {
      if (res) {
        // tslint:disable-next-line:no-shadowed-variable
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        this.immoService.add(res).subscribe(res => {
          if (!res) {
            // this.snackBar.open(
            //   `There was an error at the server. The member has not been created! Please try again.`,
            //   'Dismiss',
            //   {duration: 10000}
            // )
          }
        });
      }
    });
  }

  achat(name: string, price: number, type: string) {
    const immo = new Immobilier({name, price, type});
    const id = this.currentUser.id;

    if (this.currentUser.compte.solde < price) {
      this.utilsService.snackBarError(`Oups ! Vous n'avez pas assez d\'argent pour vous offir cette belle maison !`);
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      this.immoService.add(id, immo).subscribe(immo => {
        if (immo) {
          this.refreshCurrentUser();
          this.utilsService.snackBarSuccess(`Felicitation ! vous venez d\'acheter ${name}.`);
        } else {
          this.utilsService.snackBarError(`Oups ! peux-etre une mauvaise négociation de votre part ?`);
        }
      });
    }
  }
}
