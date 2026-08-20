import { Component, ChangeDetectionStrategy, inject, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-change-detection-default',
  standalone: true,
  templateUrl: './change-detection-default.component.html',
  styleUrls: ['./change-detection-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionDefaultComponent implements DoCheck {

  private http: HttpClient = inject(HttpClient);
  count: number = 0;

  ngDoCheck(): void {
    console.log('Change Detection');
  }

  oneClick(): void {
    this.count++;
    console.log('click → count =', this.count);
  }

  clickTimeout(): void {
    setTimeout(() => {
      this.count++;
      console.log('setTimeout → count =', this.count);
    }, 1000);
  }

  clickPromise(): void {
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    }).then(() => {
      this.count++;
      console.log('Promise → count =', this.count);
    });
  }

  clickHttpClient(): void {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/todos/1').pipe(
        tap((data) => {
          this.count++;
          console.log('HttpClient → count =', this.count, data);
        })
      ).subscribe();
  }

  intervalId?: number;

  clickSetInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
      console.log('setInterval остановлен');
      return;
    }
    this.intervalId = setInterval(() => {
      this.count++;
      console.log('setInterval → count =', this.count);
    }, 1000);
  }

  clickMixed(): void {

    this.count++;
    console.log('(click): count =', this.count);


    setTimeout(() => {
      this.count++;
      console.log('(setTimeout): count =', this.count);
    }, 500);


    Promise.resolve().then(() => {
      this.count++;
      console.log('(Promise): count =', this.count);
    });
  }

}
