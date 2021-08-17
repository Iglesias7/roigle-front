import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, PageEvent } from '@angular/material';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { SinglePostListComponent } from '../single-post/single-post.component';
import { User } from 'src/app/core/widgets/models/user';
import { Post } from 'src/app/core/widgets/models/post';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PostService } from 'src/app/core/services/post.service';
import { EditCommentComponent } from '../../comments/edit-comment/edit-comment.component';
import { CommnentService } from 'src/app/core/services/comment.service';
import {UtilsService} from "../../../../../core/services/utils.service";

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss'],
})

export class PostViewComponent implements OnDestroy {
    id = this.route.snapshot.params.id;
    @Input() post: Post;
    postParent: Post;
    comments: boolean;

    constructor(private auth: AuthenticationService,
                private sp: SinglePostListComponent,
                private postService: PostService,
                private commentService: CommnentService,
                private route: ActivatedRoute,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                private router: Router,
                private utilsService: UtilsService
    ) {
      this.postService.getPostById(this.id).subscribe(post => {
          this.postParent = post;
          console.log(this.postParent);
      });
    }

    get currentUser() {
      return this.auth.currentUser;
    }

    public update() {
        const post = this.post;
        const id = this.post.id;
        let isQuestion = false;

        if (post.title != null) {
            isQuestion = true;
        }

        const dlg = this.dialog.open(EditPostComponent, {
          data: { post, isNew: false, isQuestion },
          panelClass: 'popUp-delete'
        });

        dlg.beforeClose().subscribe(res => {
            if (res) {
                _.assign(post, res);
              // tslint:disable-next-line:no-shadowed-variable
                this.postService.update(res, id).subscribe(res => {
                    if (!res) {
                        this.utilsService.snackBarError(`la modification a échoué.`);
                    } else {
                        this.utilsService.snackBarSuccess(`la modification a réussi.`);
                    }
                });
            }
        });
    }

    public delete() {
        const post = this.post;
        let snackBarRef;
        if (post.title != null) {
            snackBarRef = this.snackBar.open(`Post '${post.title}' will be deleted`, 'Undo', { duration: 4000 });
        } else {
            snackBarRef = this.snackBar.open(`Your response will be deleted`, 'Undo', { duration: 4000 });
        }

        snackBarRef.afterDismissed().subscribe(res => {
            if (!res.dismissedByAction) {
                this.postService.delete(post).subscribe(() => {
                    if (post.title != null) {
                        this.router.navigate(['/forum']);
                    } else {
                      this.postService.getRefrechPost(this.id);
                      this.comments = true;
                    }
                });
            }
        });
    }

    public comment() {
      const comment = new Comment();

      const dlg = this.dialog.open(EditCommentComponent, {
        data: { comment, isNew: true, postId: this.post.id },
        panelClass: 'popUp-delete'
      });

      dlg.beforeClose().subscribe(res => {
          if (res) {
              _.assign(comment, res);
            // tslint:disable-next-line:no-shadowed-variable
              this.commentService.add(res).subscribe(res => {
                  if (!res) {
                      this.utilsService.snackBarError(`la modification a échoué.`);
                  } else {
                    this.postService.getRefrechPost(this.id);
                    this.utilsService.snackBarSuccess(`la modification a réussi.`);
                    this.comments = true;
                  }
              });
          }
      });
  }

    public ngOnDestroy(): void {
        this.snackBar.dismiss();
    }
}
