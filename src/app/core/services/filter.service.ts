import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostService } from './post.service';
import { Post } from '../widgets/models/post';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class FilterService {

  constructor(private postService: PostService, private http: HttpClient) {}

  public getall() {
    this.http.get<any>(`${environment.baseUrl_filters}/all`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    ).subscribe(posts => {
      this.postService.posts = posts;
      this.postService.emitAllPosts();
    });
  }

  public newest() {
    this.http.get<any>(`${environment.baseUrl_filters}/newest`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    ).subscribe(posts => {
      this.postService.posts = posts;
      this.postService.emitAllPosts();
    });
  }

  public active() {
    this.http.get<any>(`${environment.baseUrl_filters}/active`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    ).subscribe(posts => {
      this.postService.posts = posts;
      this.postService.emitAllPosts();
    });
  }

  public vote() {
    this.http.get<any>(`${environment.baseUrl_filters}/vote`).pipe(
      map((res: {data: any}) => res.data.map(m => new Post(m)))
    ).subscribe(posts => {
      this.postService.posts = posts;
      this.postService.emitAllPosts();
    });
  }
}
