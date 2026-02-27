import { Component, inject } from '@angular/core';

// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Collection } from '../collection';
// import { IService } from '../interfaces/IService';
// import { ITourForm } from '../interfaces/ITourForm';
// import { IDestination } from '../interfaces/IDestination';
// import { ITravelBlog } from '../interfaces/ITravelBlog';
// import { IMessage } from '../interfaces/IMessage';
// import { IPhotoReport } from '../interfaces/IPhotoReport';
// import { MessageType } from '../enums/MessageType';
// import { LocalStorageService } from '../classes/local-storage.service';
// import { MessageService } from '../classes/message.service';
// import { IOurService } from '../interfaces/IOurService';
// import { ITravelEssential} from '../interfaces/ITravelEssential';
// import { IMessenger } from '../interfaces/IMessenger';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
// import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-header',
  imports: [
    // FormsModule,
    // CommonModule,
    // RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  router: Router = inject(Router);

  companyName: string = 'румтибет';

  redirect(){
    this.router.navigate(['/user']);
  }

}
