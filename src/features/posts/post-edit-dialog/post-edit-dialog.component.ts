import { Component, Input, Output, EventEmitter, inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../IPost';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private fb: FormBuilder = inject(FormBuilder);
  @Input() post!: IPost;
  @Output() save: EventEmitter<IPost> = new EventEmitter<IPost>();
  @Output() cancel = new EventEmitter<void>();

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    tags: ['', Validators.required],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['post'] && this.post) {
        const tagsString: string = Array.isArray(this.post.tags)
      ? this.post.tags.join(', ')
      : this.post.tags;

      this.editForm.patchValue({
        title: this.post.title,
        tags: tagsString,
        views: this.post.views
      });
    } else {
      this.editForm.reset({ title: '', tags: '', views: 0 });
    }
  }

  onSave(): void {
    if (this.editForm.valid && this.post) {
      const formValue = this.editForm.value;

      const tagsArray = formValue.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      const updatedPost: IPost = {
        ...this.post,
        title: formValue.title,
        tags: tagsArray,
        views: formValue.views
      };
      this.save.emit(updatedPost);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
