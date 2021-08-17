import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { Post } from 'src/app/core/widgets/models/post';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PostService } from 'src/app/core/services/post.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import {UtilsService} from '../../../../../core/services/utils.service';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'app-userCard',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.scss'],
})

export class SinglePostListComponent implements OnInit, OnDestroy {
    responseBody = '';
    user: User;

    id = this.route.snapshot.params.id;

    post: Post;
    postSubsription: Subscription;

    responses: Post[];
    responsesSubsription: Subscription;

    constructor(private auth: AuthenticationService,
                private postService: PostService,
                private route: ActivatedRoute,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                private utilsService: UtilsService
    ) {
    }

    public ngOnInit() {
      this.postSubsription = this.postService.postSubject.subscribe(post => {
        this.post = post;

        this.responsesSubsription = this.postService.responsesSubject.subscribe(responses => {
          this.responses = responses;
        });
      });

      this.postService.getRefrechPost(this.id);
    }

  get currentUser() {
    return this.auth.currentUser;
  }

    public reply() {
      if (this.responseBody === '') {
        this.utilsService.snackBarAlert(`Oups! rien à ajouter!`);
      } else {
        const body = this.responseBody;
        const parentId = this.post.id;
        const userId = this.currentUser.id;
        const title = null;

        const post = new Post({ body, userId, parentId, title });
        // tslint:disable-next-line:no-shadowed-variable
        this.postService.add(post).subscribe(post => {
          this.postService.getRefrechPost(this.id);
          this.utilsService.snackBarSuccess(`Votre réponse a été ajouté avec succès!`);
        });
      }

      this.responseBody = '';
    }

    public ngOnDestroy(): void {
      this.postSubsription.unsubscribe();
      this.responsesSubsription.unsubscribe();
      this.snackBar.dismiss();
    }
}
