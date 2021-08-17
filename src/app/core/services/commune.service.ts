import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class CommuneService {

  constructor(private http: HttpClient) {}

  public find(filter?: {email?: string, friend?: number, ask?: number, received?: number}) {
    let parametres = new HttpParams();
    if (!!filter && !!filter.email) {
      parametres = parametres.append('email', filter.email);
    }

    if (!!filter && !!filter.friend) {
      parametres = parametres.append('friend', JSON.stringify(filter.friend));
    }

    if (!!filter && !!filter.ask) {
      parametres = parametres.append('ask', JSON.stringify(filter.ask));
    }

    if (!!filter && !!filter.received) {
      parametres = parametres.append('received', JSON.stringify(filter.received));
    }

    return this.http.get<any>(`${environment.baseUrl}/users`, {params: parametres}).pipe(
      map((res: {data: any}) => res.data.map(u => new User(u)))
    );
  }

  public findById(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/users/${id}`).pipe(
      map((m: {data: any}) => {
        return new User(m.data);
      }),
      catchError(err => of(null))
    );
  }

  public create(user: any): Observable<HttpResponse<User>> {
    return this.http.post<any>(`${environment.baseUrl}/users`, { data: user });
  }

  public update(user: User, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/users/${id}`, user).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public updateOpen(data: any, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/users/open/${id}`, data).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public delete(user: User): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}/users/${user.id}`).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
