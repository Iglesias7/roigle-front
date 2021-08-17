import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-userCard',
    templateUrl: './edit-comment.component.html',
    styleUrls: ['./edit-comment.component.scss'],
})

export class EditCommentComponent {

    public editCommentForm: FormGroup;
    public ctlBody: FormControl;
    public isNew: boolean;

    public editorConfig: AngularEditorConfig = {
      editable: true,
        spellcheck: true,
        height: '4000 px',
        minHeight: '400',
        maxHeight: '4000',
        width: 'auto',
        minWidth: 'auto',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]
  };


    constructor(public dialogRef: MatDialogRef<EditCommentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { comment: Comment; isNew: boolean; postId: number},
        private formBuilder: FormBuilder,
        private postService: PostService,
        private auth: AuthenticationService
    ) {
        this.ctlBody = this.formBuilder.control('', [Validators.required]);

        this.editCommentForm = this.formBuilder.group({
            body: this.ctlBody
        });

        this.isNew = data.isNew;
        this.editCommentForm.patchValue(data.comment);
    }

    update() {
        const data = this.editCommentForm.value;
        data.userId = this.auth.currentUser.id;
        data.postId = this.data.postId;
        this.dialogRef.close(data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }
}
