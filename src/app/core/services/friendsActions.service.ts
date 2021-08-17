import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class FriendsActionsService {

  constructor(private http: HttpClient) {}

  public follow(user: User, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/friends-actions/follow`, {user, id }).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public accept(user: User, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/friends-actions/accept`, {user, id }).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public annuler(user: User, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/friends-actions/CancelAsk`, {user, id }).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public refuser(user: User, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/friends-actions/CancelReceived`, {user, id }).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public unfollow(user: User, id: number): Observable<boolean> {
    return this.http.put<User>(`${environment.baseUrl}/friends-actions/unfollow`, {user, id }).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
