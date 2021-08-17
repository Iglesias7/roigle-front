import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Post } from '../widgets/models/post';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class CommnentService {

  constructor(private http: HttpClient) {}

  public getAllCommentsByPost(id: number) {
    return this.http.get<any>(`${environment.baseUrl_filters}/all`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    );
  }

  public getComentById(id: number) {
    return this.http.get<any>(`${environment.baseUrl_posts}/${id}`).pipe(
      map((m: {data: any}) => {
        return new Post(m.data);
    }),
    catchError(err => of(null))
    );
  }

  public add(request: any): Observable<Post> {
    return this.http.post<any>(`${environment.baseUrl_comments}`, request).pipe(
      map((m: {data: any}) => {
        return new Post(m.data);
    }),
    catchError(err => of(null))
    );
  }

  public update(p: Comment, id:number): Observable<boolean> {
    return this.http.put<Post>(`${environment.baseUrl_comments}/${id}`, p).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public delete(c: any): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl_comments}/${c.id}`).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
