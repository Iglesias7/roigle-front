import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, MatTableDataSource} from '@angular/material';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/widgets/models/user';
import { PostService } from 'src/app/core/services/post.service';
import { FilterService } from 'src/app/core/services/filter.service';
import { Post } from 'src/app/core/widgets/models/post';
import {UtilsService} from "../../../../../core/services/utils.service";

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'app-userCard',
    templateUrl: './postlist.component.html',
    styleUrls: ['./postlist.component.scss'],
})

export class PostListComponent implements OnInit, OnDestroy {
    currentUser: User;
    posts: Post[];
    postsBackup: Post[] = [];
    postsSubsription: Subscription;
    filter: string = this.route.snapshot.params.name;

    length = 0;
    pageSize = 4;

    dataSources: MatTableDataSource<Post> = new MatTableDataSource();
    pageEvent: void;

    constructor(
      private auth: AuthenticationService,
      private filterService: FilterService,
      private postService: PostService,
      public dialog: MatDialog,
      private route: ActivatedRoute,
      public snackBar: MatSnackBar,
      private  utilsService: UtilsService
    ) {
      this.currentUser = this.auth.currentUser;
    }

    ngOnInit() {
      this.postsSubsription = this.postService.postsSubject.subscribe(
        posts => {
          this.posts = posts;
          this.dataSources.data = this.posts.slice(0, 4);
          this.length = this.posts.length;
          this.postsBackup = _.cloneDeep(posts);
        }
      );

      this.postService.getRefrechAllPosts();
    }

    onPageChange(event: PageEvent) {
      const startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if (endIndex > this.length) {
        endIndex = this.length;
      }
      this.dataSources.data = this.posts.slice(startIndex, endIndex);
    }

    newest() {
      this.filterService.newest();
      this.postService.emitAllPosts();
    }

    vote() {
      this.filterService.vote();
      this.postService.emitAllPosts();
    }

    active() {
      this.filterService.active();
      this.postService.emitAllPosts();
    }

    filterChanged(filter: string) {
      const lFilter = filter.toLowerCase();
      this.posts = _.filter(this.postsBackup, m => {
        const str = (m.user.firstName + ' ' + m.title + ' ' + m.body).toLowerCase();
        return str.includes(lFilter);
      });

      this.dataSources.data = this.posts.slice(0, 4);
    }

    public addQuestion() {
      const post = new Post({});

      const dlg = this.dialog.open(EditPostComponent, {
        data: { post, isNew: true, isQuestion: true },
        panelClass: 'popUp-delete'
      });

      dlg.beforeClose().subscribe(res => {
        if (res) {
          // tslint:disable-next-line:no-shadowed-variable
          this.postService.add(res).subscribe(res => {
            if (!res) {
              this.utilsService.snackBarError(`There was an error at the server. The question has not been created! Please try again.`);
            } else {
              this.utilsService.snackBarSuccess(`Votre question a été ajouté avec succès`);
              this.postService.getRefrechAllPosts();
            }
          });
        }
      });
    }

    public ngOnDestroy() {
      this.postsSubsription.unsubscribe();
      this.snackBar.dismiss();
    }
}
