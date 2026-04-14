import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-filter',
  imports: [],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  // @Output() filterUsers = new EventEmitter<string>();

  // onFilterChange(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.filterUsers.emit(inputElement.value);
  // }

}
