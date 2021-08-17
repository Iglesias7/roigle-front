import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from '../widgets/models/match';
import {Card} from '../widgets/models/card';
import {User} from '../widgets/models/user';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root' })

export class MatchService {

  hand1: Card[];
  hand1Subject = new Subject<Card[]>();

  hand2: Card[];
  hand2Subject = new Subject<Card[]>();

  joueur1: User;
  joueur1Subject = new Subject<User>();

  joueur2: User;
  joueur2Subject = new Subject<User>();

  center: Card;
  centerSubject = new Subject<Card>();

  bankOne: Card;
  bankOneSubject = new Subject<Card>();

  mise: number;
  miseSubject = new Subject<number>();

  tour: string;
  tourSubject = new Subject<string>();

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) {
  }

  public emitHand1() {
    this.hand1Subject.next(this.hand1.slice());
  }

  public emitHand2() {
    this.hand2Subject.next(this.hand2.slice());
  }

  public emitCenter() {
    this.centerSubject.next(this.center);
  }

  public emitBankOne() {
    this.bankOneSubject.next(this.bankOne);
  }

  public emitJoueur1() {
    this.joueur1Subject.next(this.joueur1);
  }

  public emitJoueur2() {
    this.joueur2Subject.next(this.joueur2);
  }

  public emitMise() {
    this.miseSubject.next(this.mise);
  }

  public emitTour() {
    this.tourSubject.next(this.tour);
  }

  public getRefrechMatch(id: number) {
    this.getMatchById(id).subscribe(match => {
      if (this.auth.currentUser.id === match.joueur1.id) {
        this.hand1 = match.joueur1.hand;
        this.joueur1 = match.joueur1;
        this.hand2 = match.joueur2.hand;
        this.joueur2 = match.joueur2;
      } else {
        this.hand1 = match.joueur2.hand;
        this.joueur1 = match.joueur2;
        this.hand2 = match.joueur1.hand;
        this.joueur2 = match.joueur1;
      }

      if (match.joueur1.aMoi) {
        this.tour = match.joueur1.firstName;
      } else {
        this.tour = match.joueur2.firstName;
      }

      this.center = match.milieux;
      this.bankOne = match.bank;
      this.mise = match.mise;
      this.emitHand1();
      this.emitHand2();
      this.emitCenter();
      this.emitBankOne();
      this.emitJoueur1();
      this.emitJoueur2();
      this.emitMise();
      this.emitTour();
    });
  }

  public getRefrechMatchAfterInit(id: number) {
    this.getMatchById(id).subscribe(match => {
      if (this.auth.currentUser.id === match.joueur1.id) {
        this.joueur1 = match.joueur1;
        this.joueur2 = match.joueur2;
      } else {
        this.joueur1 = match.joueur2;
        this.joueur2 = match.joueur1;
      }

      if (match.joueur1.aMoi) {
        this.tour = match.joueur1.firstName;
      } else {
        this.tour = match.joueur2.firstName;
      }

      this.center = match.milieux;
      this.bankOne = match.bank;
      this.emitCenter();
      this.emitBankOne();
      this.emitJoueur1();
      this.emitJoueur2();
      this.emitTour();
    });
  }

  public getMatchById(id: number) {
    return this.http.get<any>(`${environment.baseUrl_matchs}/${id}`).pipe(
      map((m: {data: any}) => {
          return new Match(m.data);
      }),
      catchError(err => of(null))
    );
  }

  public addMatch(id: number, email: string, request: any): Observable<Match> {
    return this.http.post<any>(`${environment.baseUrl_matchs}/add-match`, {id, email, request}).pipe(
      map((m: {data: any}) => {
        return new Match(m.data);
    }),
    catchError(err => of(null))
    );
  }

  public init(request: any): Observable<Match> {
    return this.http.post<any>(`${environment.baseUrl_matchs}/init`, request).pipe(
      map((m: {data: any}) => {
          return new Match(m.data);
      }),
      catchError(err => of(null))
    );
  }

  public play(request: any): Observable<Match> {
    return this.http.post<any>(`${environment.baseUrl_matchs}/play`, request).pipe(
      map((m: {data: any}) => {
          return new Match(m.data);
      }),
      catchError(err => of(null))
    );
  }

  public peche(request: any): Observable<Match> {
    console.log(request);
    return this.http.post<any>(`${environment.baseUrl_matchs}/peche`, request).pipe(
      map((m: {data: any}) => {
          return new Match(m.data);
      }),
      catchError(err => of(null))
    );
  }

  // tslint:disable-next-line:ban-types
  public delete(request: any): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.post<Boolean>(`${environment.baseUrl_matchs}/match/delete`, request).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  // tslint:disable-next-line:ban-types
  public finish(request: any): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.post<Boolean>(`${environment.baseUrl_matchs}/finish`, request).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
