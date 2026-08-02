import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {

  user: User = {
    name: 'Alex',
    age: 20
  };

  changeName(): void {
    this.user.name = 'Eugene';
  }

  changeSpreadName(): void {
    this.user = { ...this.user, name: 'Eugene' };
  }
  
}
