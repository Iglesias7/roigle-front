import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Post } from '../widgets/models/post';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class PostService {

  posts: Post[];
  postsSubject = new Subject<Post[]>();

  responses: Post[] = [];
  responsesSubject = new Subject<Post[]>();

  post: Post;
  postSubject = new Subject<Post>();

  constructor(private http: HttpClient) {}

  public emitAllPosts() {
    this.postsSubject.next(this.posts.slice());
  }

  public emitAllResponses() {
    this.responsesSubject.next(this.responses.slice());
  }

  public emitPost() {
    this.postSubject.next(this.post);
  }

  public getRefrechAllPosts() {
    this.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.emitAllPosts();
    });
  }

  public getRefrechPost(id: number) {
    this.getPostById(id).subscribe(post => {
      this.post = post;
      this.getResponseById(id).subscribe(response =>{
        this.responses = response;
        this.emitAllResponses();
      });
      this.emitPost();
    });
  }

  public getAllPosts() {
    return this.http.get<any>(`${environment.baseUrl_filters}/newest`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    );
  }

  public getPostById(id: number) {
    return this.http.get<any>(`${environment.baseUrl_posts}/${id}`).pipe(
      map((m: {data: any}) => {
        return new Post(m.data);
    }),
    catchError(err => of(null))
    );
  }

  public getResponseById(id: number) {
    return this.http.get<any>(`${environment.baseUrl_posts}/responses/${id}`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    );
  }

  // public add(p: Post): Observable<boolean> {
  //   return this.http.post<Post>(`${environment.baseUrl_posts}/add`, p).pipe(
  //     map(res => true),
  //     catchError(err => {
  //       console.error(err);
  //       return of(false);
  //     })
  //   );
  // }

  public add(request: any): Observable<Post> {
    return this.http.post<any>(`${environment.baseUrl_posts}/add`, request).pipe(
      map((m: {data: any}) => {
        return new Post(m.data);
    }),
    catchError(err => of(null))
    );
  }

  public update(p: Post, id:number): Observable<boolean> {
    return this.http.put<Post>(`${environment.baseUrl_posts}/${id}`, p).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public delete(p: Post): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl_posts}/${p.id}`).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
