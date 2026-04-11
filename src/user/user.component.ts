import { Component } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { UsersPageComponent } from "../users-page/users-page.component";

@Component({
  selector: 'app-user',
  imports: [LoaderComponent, UsersPageComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

}
