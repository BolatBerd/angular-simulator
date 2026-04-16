import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() usersFiltered: EventEmitter<string> = new EventEmitter<string>();

  private destroyRef: DestroyRef = inject(DestroyRef);

  filterControl: FormControl = new FormControl('');

  ngOnInit() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((value: string) => this.usersFiltered.emit(value)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

}
