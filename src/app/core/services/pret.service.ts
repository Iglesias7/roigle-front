import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';
import { Pret } from 'src/app/core/widgets/models/pret';
import {Post} from '../widgets/models/post';
import {CommuneService} from "./commune.service";

@Injectable({ providedIn: 'root' })

export class PretService {

  emprunts: Pret[] = [];
  empruntsSubject = new Subject<Pret[]>();

  empruntsSend: Pret[] = [];
  empruntsSendSubject = new Subject<Pret[]>();

  prets: Pret[] = [];
  pretsSubject = new Subject<Pret[]>();

  pretsSend: Pret[] = [];
  pretsSendSubject = new Subject<Pret[]>();

  user: User;
  userSubject = new Subject<User>();

  constructor(private http: HttpClient,
              private communeService: CommuneService) {
  }

  public emitUser() {
    this.userSubject.next(this.user);
  }

  public emitAllEmprunts() {
    this.empruntsSubject.next(this.emprunts.slice());
  }

  public emitAllEmpruntsSend() {
    this.empruntsSendSubject.next(this.empruntsSend.slice());
  }

  public emitAllPrets() {
    this.pretsSubject.next(this.prets.slice());
  }

  public emitAllPretsSend() {
    this.pretsSendSubject.next(this.pretsSend.slice());
  }

  public getRefrechUser(id: number) {
    // @ts-ignore
    this.communeService.getUserById(id).subscribe(user => {
      this.user = user;
      this.emitUser();
    });
  }

  public getRefrechEmprunts(id: number) {
    // @ts-ignore
    this.getListPrets(id).subscribe(emprunts => {
      this.emprunts = emprunts;
      this.emitAllEmprunts();
    });
  }

  public getRefrechEmpruntsSend(id: number) {
    // @ts-ignore
    this.getListPretsSend(id).subscribe(empruntsSend => {
      this.empruntsSend = empruntsSend;
      this.emitAllEmpruntsSend();
    });
  }

  public getRefrechPretsSend(id: number) {
    // @ts-ignore
    this.getListEmpruntsSend(id).subscribe(pretsSend => {
      this.pretsSend = pretsSend;
      this.emitAllPretsSend();
    });
  }

  public getRefrechPrets(id: number) {
    // @ts-ignore
    this.getListEmprunts(id).subscribe(prets => {
      this.prets = prets;
      this.emitAllPrets();
    });
  }

  public pretBancaire(idCompte: number, pret: Pret): Observable<boolean> {
    return this.http.post<Pret>(`${environment.baseUrl_prets}/pret-bancaire/${idCompte}`, pret).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public askPret(idCompte: number, email: string, pret: Pret): Observable<boolean> {
    return this.http.post<Pret>(`${environment.baseUrl_prets}/demander-pret/${idCompte}/${email}`, pret).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }


  public getListEmprunts(id: number): Observable<Pret[]> {
    return this.http.get<any>(`${environment.baseUrl_get_prets}/ceux-que-je-dois/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((p) =>  {
          return new Pret(p);
        });
      })
    );
  }

  public getListPrets(id: number): Observable<Pret[]> {
    return this.http.get<any>(`${environment.baseUrl_get_prets}/ceux-qui-me-doivent/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((p) =>  {
          return new Pret(p);
        });
      })
    );
  }

  public getListEmpruntsSend(id: number): Observable<Pret[]> {
    return this.http.get<any>(`${environment.baseUrl_get_prets}/demande-recus/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((p) =>  {
          return new Pret(p);
        });
      })
    );
  }

  public getListPretsSend(id: number): Observable<Pret[]> {
    return this.http.get<any>(`${environment.baseUrl_get_prets}/demande-envoyer/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((p) =>  {
          return new Pret(p);
        });
      })
    );
  }

  public preter(idCompte: number, email: string, pret: Pret): Observable<boolean> {
    const pretId = pret.id;
    return this.http.put<Pret>(`${environment.baseUrl_prets}/preter/${idCompte}/${email}/${pretId}`, pret).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }



  public refuser(idCompte: number, email: string, pret: any): Observable<boolean> {
    const pretId = pret.id;
    return this.http.post<any>(`${environment.baseUrl}/prets/refuser/${idCompte}/${email}/${pretId}`, pret).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public rembourser(idCompte: number, email: string, pret: Pret): Observable<boolean> {
    const pretId = pret.id;
    return this.http.put<Pret>(`${environment.baseUrl}/prets/rembourser/${idCompte}/${email}/${pretId}`, pret).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public rembourserBanque(idCompte: number, pret: Pret): Observable<boolean> {
    const pretId = pret.id;
    return this.http.put<Pret>(`${environment.baseUrl}/prets/rembourser-banque/${idCompte}/${pretId}`, pret).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

}
