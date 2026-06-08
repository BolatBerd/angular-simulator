import { Component, Input, Output, EventEmitter, inject, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IPost } from '../IPost';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnChanges, OnInit {

  private dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private fb: FormBuilder = inject(FormBuilder);

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<IPost> = new EventEmitter<IPost>();
  @Input() post!: IPost;

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    tags: ['', Validators.required],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.post = this.dialogConfig.data;

    const tagsString: string = Array.isArray(this.post.tags)
      ? this.post.tags.join(', ')
      : String(this.post.tags);

    this.editForm.patchValue({
      title: this.post.title,
      tags: tagsString,
      views: this.post.views
    });
  }

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

      const tagsArray: string[] = this.editForm.value.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      const updatedPost: IPost = {
        ...this.post,
        title: this.editForm.value.title,
        tags: tagsArray,
        views: this.editForm.value.views
      };
      this.ref.close(updatedPost);
    }
  }

  onCancel(): void {
    this.ref.close();
  }

}
