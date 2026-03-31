import { AsyncPipe } from '@angular/common';
import { Component,inject } from '@angular/core';
import { LoaderService } from '../classes/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  private loaderService: LoaderService = inject(LoaderService)

  isLoading$: Observable<boolean> = this.loaderService.isLoading$;

}
