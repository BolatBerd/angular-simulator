import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private fb: FormBuilder = inject(FormBuilder);
  @Input() post!: IPost;
  @Output() save: EventEmitter<IPost> = new EventEmitter<IPost>();

  editForm: FormGroup = this.fb.group({
    title: [this.post?.title, Validators.required],
    tags: [this.post?.tags, Validators.required],
    views: [this.post?.views, Validators.min(0)],
  });

  ngOnChanges() {
    if (this.post) {
      this.editForm.patchValue({
        title: this.post.title,
        tags: this.post.tags,
        views: this.post.views,
      });
    }
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedPost: IPost = { ...this.post, ...this.editForm.value };
      this.save.emit(updatedPost);
    }
  }
  
}
