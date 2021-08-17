import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PretService } from 'src/app/core/services/pret.service';
import { PretComponent } from './pret/pret.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import {ListComponent} from './list/list.component';

@Component({
    selector: 'app-banque',
    templateUrl: './banque.component.html',
    styleUrls: ['./banque.component.scss'],
})

export class BanqueComponent {

    constructor(
        private auth: AuthenticationService,
        private pretService: PretService,
        private dialog: MatDialog,
        private utilsService: UtilsService,
        private communeService: CommuneService,
        private listComponent: ListComponent
    ) {
    }

    get currentUser() {
      return this.auth.currentUser;
    }

    refreshCurrentUser() {
      this.communeService.findById(this.auth.currentUser.id).subscribe(u => {
        this.auth.storeToken(u);
      });
    }

    pretBancaire() {
      const dlg = this.dialog.open(PretComponent, {
        data: null,
        panelClass: 'popUp-delete'
      });

      const idCompte = this.currentUser.compte.id;

      dlg.beforeClose().subscribe(pret => {
        if (pret) {
          this.pretService.pretBancaire(idCompte, pret).subscribe(res => {
            if (!res) {
              this.utilsService.snackBarError(`Oups erreur dans le serveur. le pret a echoué.`);
            } else {
              this.refreshCurrentUser();
              this.listComponent.ngAfterViewInit();
              this.utilsService.snackBarSuccess(`Vous venez d'emprunter ${pret.montant} à la banque.`);
            }
          });
        }
      });
    }
}
