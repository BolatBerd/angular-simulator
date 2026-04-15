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

  @Output() onFilterUsers: EventEmitter<string> = new EventEmitter<string>();

  private fb: FormBuilder = inject(FormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);

  filterControl: FormControl<string> = this.fb.nonNullable.control('');

  constructor() {
    this.filterControl.valueChanges
      .pipe(
        delay(200),
        distinctUntilChanged(),
        tap((value: string) => this.onFilterUsers.emit(value)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

}
