import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { delay, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() filterUsers = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  filterControl: FormControl<string> = this.fb.nonNullable.control('');

  constructor() {
    this.filterControl.valueChanges
      .pipe(
        delay(200),
        distinctUntilChanged(),
        tap(value => this.filterUsers.emit(value)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

}
