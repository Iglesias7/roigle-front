import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class FriendsService {

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${environment.baseUrl_friends}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((m) =>  {
          return new User(m);
        });
      })
    );
  }

  public getAllFollowers(id: number): Observable<User[]> {
    return this.http.get<any>(`${environment.baseUrl_friends}/followers/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((m) =>  {
          return new User(m);
        });
      })
    );
  }

  public getAllSends(id: number): Observable<User[]> {
    return this.http.get<any>(`${environment.baseUrl_friends}/friends-send/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((m) =>  {
          return new User(m);
        });
      })
    );
  }

  public getAllReceived(id: number): Observable<User[]> {
    return this.http.get<any>(`${environment.baseUrl_friends}/friends-received/${id}`).pipe(
      map((response: {data: any}) => {
        return response.data.map((m) =>  {
          return new User(m);
        });
      })
    );
  }

}
