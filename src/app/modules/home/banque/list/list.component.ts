import {Component, OnInit, Input, Injectable, AfterViewInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PretService } from 'src/app/core/services/pret.service';
import { Pret } from 'src/app/core/widgets/models/pret';
import { CommuneService } from 'src/app/core/services/commune.service';
import { MatDialog } from '@angular/material';
import { MessageComponent } from '../message/message.component';
import {Subscription} from 'rxjs';
import { BanqueComponent } from '../banque.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

@Injectable({ providedIn: 'root' })

export class ListComponent implements AfterViewInit {

    public emprunts: Pret[];
    public empruntsSend: Pret[];
    public pretsSend: Pret[];
    public prets: any[];

  empruntsSubsription: Subscription;
  empruntsSendSubsription: Subscription;
  pretsSendSubsription: Subscription;
  pretsSubsription: Subscription;

    @Input() type: number;

    constructor(
        public auth: AuthenticationService,
        private pretService: PretService,
        private communeService: CommuneService,
        private dialog: MatDialog
    ) {
    }

  ngAfterViewInit(): void {
    this.refreshPret();
  }

    get currentUser() {
      return this.auth.currentUser;
    }

    refreshPret() {
      this.empruntsSubsription = this.pretService.empruntsSubject.subscribe(
        prets => {
          this.emprunts = prets;
        }
      );

      this.pretService.getRefrechEmprunts(this.currentUser.id);

      this.empruntsSendSubsription = this.pretService.empruntsSendSubject.subscribe(
        prets => {
          this.empruntsSend = prets;
        }
      );

      this.pretService.getRefrechEmpruntsSend(this.currentUser.id);

      this.pretsSendSubsription = this.pretService.pretsSendSubject.subscribe(
        prets => {
          this.pretsSend = prets;
        }
      );

      this.pretService.getRefrechPretsSend(this.currentUser.id);

      this.pretsSubsription = this.pretService.pretsSubject.subscribe(
        prets => {
          this.prets = prets;
        }
      );

      this.pretService.getRefrechPrets(this.currentUser.id);
    }

  refreshCurrentUser() {
    this.communeService.findById(this.auth.currentUser.id).subscribe(u => {
      // this.pretService.getRefrechUser(this.currentUser.id);
      this.auth.storeToken(u);
      // this.banqueComponent.user = u;
      // sessionStorage.setItem('currentUser', JSON.stringify(u));
    });
  }

    public rembourser(pret: Pret) {
      const idCompte = this.currentUser.compte.id;
      const email = pret.donneur.email;

      this.pretService.rembourser(idCompte, email, pret).subscribe(() => {
        this.refreshCurrentUser();
        this.refreshPret();
      });
    }

    public rembourserBanque(pret: Pret) {
      const idCompte = this.currentUser.compte.id;
      this.pretService.rembourserBanque(idCompte, pret).subscribe(() => {
        this.refreshCurrentUser();
        this.refreshPret();
      });
    }

    preter(pret: Pret) {
      const idCompte = this.currentUser.compte.id;
      const email = pret.demandeur.email;

      this.pretService.preter(idCompte, email, pret).subscribe(() => {
        this.refreshCurrentUser();
        this.refreshPret();
      });
    }

    refuser(pret: Pret) {
      const idCompte = this.currentUser.compte.id;
      const email = pret.demandeur.email;

      this.pretService.refuser(idCompte, email, pret).subscribe(() => {
        this.refreshPret();
      });
    }

    annuler(pret: Pret) {
      const idCompte = pret.donneur.compte.id;
      const email = this.currentUser.email;

      this.pretService.refuser(idCompte, email, pret).subscribe(() => {
        this.refreshPret();
      });
    }

    message(pret: Pret) {
      this.dialog.open(MessageComponent, {
        data: { pret },
        panelClass: 'popUp-delete',
        height: '400px'
      });
    }
}
