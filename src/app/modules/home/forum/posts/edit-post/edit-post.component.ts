import { MatAutocomplete } from '@angular/material/autocomplete';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Post } from 'src/app/core/widgets/models/post';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-userCard',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})

export class EditPostComponent {

  public editPostForm: FormGroup;
  public ctlTitle: FormControl;
  public ctlBody: FormControl;

  public isNew: boolean;
  public isQuestion: boolean;

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

  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post; isNew: boolean, isQuestion: boolean; },
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {
    this.ctlTitle = this.formBuilder.control('', [Validators.required]);
    this.ctlBody = this.formBuilder.control('', [Validators.required]);

    this.editPostForm = this.formBuilder.group({
      title: this.ctlTitle,
      body: this.ctlBody,
    });

    this.isNew = data.isNew;
    this.isQuestion = data.isQuestion;
    this.editPostForm.patchValue(data.post);
  }

  update() {
    const data = this.editPostForm.value;
    data.userId = this.auth.currentUser.id;
    data.parentId = null;

    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
