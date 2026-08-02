import { Component, ChangeDetectionStrategy, inject, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-detection-demo',
  standalone: true,
  templateUrl: './change-detection-demo.component.html',
  styleUrls: ['./change-detection-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionDemoComponent implements DoCheck {

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
      .get<any>('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        this.count++;
        console.log('HttpClient → count =', this.count, data);
      });
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
  //  Для стратегии по умолчанию интерфейс обновится автоматически,
  //  ngDoCheck сработает один раз, после каждого асинхронного события.
  //  ChangeDetectorRef не нужен — Angular сам запустит проверку.
  //  В сценарии 1, клик триггерит change detection один раз.
  //  Во втором – после выполнения setTimeout, тоже 1 раз.
  //  После Promise – 1 раз по завершению then.
  //  После HttpClient-запроса – автоматически.
  //  С setInterval – при каждом срабатывании интервала будет запускаться проверка.
  //  А в комбинированном сценарии проверки будут запускаться последовательно — обычно сначала после клика,
  //  затем после выполнения Promise, и потом setTimeout. В этих случаях ChangeDetectorRef не требуется,
  //  если ты используешь ChangeDetectionStrategy.Default.
  // в dev-режиме ngDoCheck может вызываться чаще из-за дополнительных проверок.
  //  В prod-сборке, для простого случая, ожидается один вызов на цикл
}
