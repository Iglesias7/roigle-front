import { Component, OnInit, Injectable} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Card } from 'src/app/core/widgets/models/card';
import { CardService } from 'src/app/core/services/card.service';
import { User } from 'src/app/core/widgets/models/user';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MatchService } from 'src/app/core/services/match.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Match } from 'src/app/core/widgets/models/match';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.scss']
})

@Injectable({ providedIn: 'root' })

export class PartieComponent implements OnInit {
  bank: Card[];
  public hand1: any[] = [];
  public hand1Subsription: Subscription;
  hand2: Card[] = [];
  hand2Subsription: Subscription;

  mise: number;
  miseSubsription: Subscription;

  adversaire: User;
  adversaireSubsription: Subscription;
  moi: User = null;
  moiSubsription: Subscription;

  bankOne: Card;
  bankOneSubsription: Subscription;

  centre: Card;
  centreSubsription: Subscription;

  idMatch = this.route.snapshot.params.id;
  match: Match;

  tour: string;
  tourSubsription: Subscription;

  color1: string;
  backcolor1: string;

  color2: string;
  backcolor2: string;

  constructor(
    private auth: AuthenticationService,
    private cardService: CardService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private matchService: MatchService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.hand1Subsription = this.matchService.hand1Subject.subscribe(hand => {
      this.hand1 = hand;
    });

    this.hand2Subsription = this.matchService.hand2Subject.subscribe(hand => {
      this.hand2 = hand;
    });

    this.centreSubsription = this.matchService.centerSubject.subscribe(centre => {
      this.centre = centre;
    });

    this.bankOneSubsription = this.matchService.bankOneSubject.subscribe(bankOne => {
      this.bankOne = bankOne;
    });

    this.moiSubsription = this.matchService.joueur1Subject.subscribe(user => {
      this.moi = user;
      if (user.aMoi) {
        this.backcolor1 = '#0dbab0';
        this.color1 = '#0c1424';
      } else {
        this.backcolor1 = '#0c1424';
        this.color1 = '#0dbab0';
      }
    });

    this.adversaireSubsription = this.matchService.joueur2Subject.subscribe(user => {
      this.adversaire = user;
      if (user.hand.length < 3) {
        this.backcolor2 = '#ef9a9a';
        this.color2 = '#b71c1c';
      } else {
        this.backcolor2 = '#28344c';
        this.color2 = '#eceff1';
      }
    });

    this.miseSubsription = this.matchService.miseSubject.subscribe(mise => {
      this.mise = mise;
    });

    this.tourSubsription = this.matchService.tourSubject.subscribe(tour => {
      this.tour = tour;
    });

    this.bank = this.cardService.getBanque().sort(() => Math.random() - Math.random());

    this.matchService.getRefrechMatch(this.idMatch);

    this.connect();
  }

  connect(): void {
    const sourceInit = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://monsite.com/init'));
    sourceInit.addEventListener('message', match => {
        this.bank.sort(() => Math.random() - Math.random());

        const id = JSON.parse(match.data).message;

        this.matchService.getRefrechMatch(id);
    });

    // tslint:disable-next-line:max-line-length
    const sourcePeche = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://monsite.com/peche'));
    sourcePeche.addEventListener('message', match => {
      this.bank.sort(() => Math.random() - Math.random());
      const id = JSON.parse(match.data).message;
      this.matchService.getRefrechMatchAfterInit(id);
    });

    const sourcePlay = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://monsite.com/play'));
    sourcePlay.addEventListener('message', match => {
      this.bank.sort(() => Math.random() - Math.random());

      const id = JSON.parse(match.data).message;

      this.matchService.getRefrechMatchAfterInit(id);
    });

    // tslint:disable-next-line:max-line-length
    const sourceStop = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://monsite.com/delete_match'));
    sourceStop.addEventListener('message', match => {
      this.utilsService.snackBarInfo(`Ce match a été annuler!`);
      this.router.navigate(['/choice']);
    });

    // tslint:disable-next-line:max-line-length
    const sourceFinish = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://monsite.com/finish_match'));
    sourceFinish.addEventListener('message', match => {
      const gagnant = JSON.parse(match.data).message;
      this.utilsService.snackBarInfo(`Ce match est terminé et a été remporté par ${gagnant}`);
      this.router.navigate(['/choice']);
    });
  }

  init() {
    for (let i = 0; i < 4; ++i) {
      this.moi.hand.push(this.bank.pop());
      this.bank.sort(() => Math.random() - Math.random());
    }

    for (let i = 0; i < 4; ++i) {
      this.adversaire.hand.push(this.bank.pop());
      this.bank.sort(() => Math.random() - Math.random());
    }

    this.centre = this.bank.pop();

    this.moi.aMoi = true;
    this.adversaire.aMoi = false;

    this.tour = this.moi.firstName;

    const bank = this.bank[this.bank.length - 1];
    bank.faceUp = false;
    // const simplebank = this.bank.pop();

    this.bankOne = this.bank.pop();

    const request = {
      joueur1: this.moi,
      joueur2: this.adversaire,
      milieux: this.centre,
      bank: this.bankOne,
      matchId: this.idMatch
    };

    this.matchService.init(request).subscribe();
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  addHand() {
    if (this.moi.aMoi) {
      const bank = this.bank[this.bank.length - 1];
      bank.faceUp = false;
      const simplebank = this.bank.pop();
      this.moi.hand.push(this.bankOne);
      this.hand1.push(this.bankOne);

      const request = {
        joueur1: this.moi,
        joueur2: this.adversaire,
        peche: this.bankOne,
        bank: simplebank,
        matchId: this.idMatch
      };

      this.matchService.peche(request).subscribe(() => {
        this.moi.aMoi = false;
        this.adversaire.aMoi = true;
      });
    } else {
      this.utilsService.snackBarError(`ce n'est pas à vous de jouer`);
    }
  }

  addCentre(card: Card) {
    if (this.moi.aMoi) {
      if (card.number === this.centre.number || card.type === this.centre.type || card.number === '2') {
        this.bank.push(this.centre);
        this.bank.sort(() => Math.random() - Math.random());
        this.centre = card;

        this.moi.hand.splice(this.moi.hand.indexOf(card), 1);
        this.hand1.splice(this.hand1.indexOf(card), 1);
        

        const request = {
          joueur1: this.moi,
          joueur2: this.adversaire,
          cardPlayId: card.id,
          bank: this.bankOne,
          matchId: this.idMatch
        };

        this.matchService.play(request).subscribe(() => {
          if (this.moi.hand.length === 0 || this.adversaire.hand.length === 0) {
            this.finish();
          }
          this.moi.aMoi = true;
          this.adversaire.aMoi = false;
        });
      } else {
        this.utilsService.snackBarError(`Vous avez jouer une mauvaise carte.`);
      }
    } else {
      this.utilsService.snackBarError(`ce n'est pas à vous de jouer`);
    }
  }

  stop() {
    const request = {
      joueur1: this.moi,
      joueur2: this.adversaire,
      matchId: this.idMatch
    };

    this.matchService.delete(request).subscribe();
  }

  finish() {
    const request = {
      joueur1Id: this.moi.id,
      joueur2Id: this.adversaire.id,
      matchId: this.idMatch
    };
    console.log(request);
    this.matchService.finish(request).subscribe();
  }
}
