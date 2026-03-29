import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../classes/loader.service';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  get loading$() {
    return this.loaderService.loading$;
  }

  constructor(private loaderService: LoaderService) {

    this.loaderService.showLoader();

    setTimeout(() => {
      console.log('Данные загружены');
      this.loaderService.hideLoader();
    }, 2000);
  }

}
