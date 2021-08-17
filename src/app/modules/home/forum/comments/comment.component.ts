import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommnentService } from 'src/app/core/services/comment.service';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { PostService } from 'src/app/core/services/post.service';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})

export class CommentComponent implements OnDestroy {
    @Input() comment: any;
    id = this.route.snapshot.params.id;

    constructor(private auth: AuthenticationService,
                private commentService: CommnentService,
                private postService: PostService,
                private route: ActivatedRoute,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                private utilsService: UtilsService
    ) {
    }

  get currentUser() {
    return this.auth.currentUser;
  }

    public update() {
      const comment = this.comment;
      const id = this.comment.id;

      const dlg = this.dialog.open(EditCommentComponent, {
        data: { comment, isNew: false },
        panelClass: 'popUp-delete'
      });

      dlg.beforeClose().subscribe(res => {
        if (res) {
          _.assign(comment, res);
          // tslint:disable-next-line:no-shadowed-variable
          this.commentService.update(res, id).subscribe(res => {
              if (!res) {
                this.utilsService.snackBarError(`la modification a échoué.`);
              } else {
                this.postService.getRefrechPost(this.id);
                this.utilsService.snackBarSuccess(`la modification a réussi.`);
              }
          });
        }
      });
    }

    public delete() {
      const comment = this.comment;
      // tslint:disable-next-line:prefer-const
      let snackBarRef = this.snackBar.open(`Your response will be deleted`, 'Undo', { duration: 4000 });

      snackBarRef.afterDismissed().subscribe(res => {
          if (!res.dismissedByAction) {
            this.commentService.delete(comment).subscribe(() => {
              this.postService.getRefrechPost(this.id);
            });
          }
      });
    }

    public ngOnDestroy(): void {
        this.snackBar.dismiss();
    }
}
