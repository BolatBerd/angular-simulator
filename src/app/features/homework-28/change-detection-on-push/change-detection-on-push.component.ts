import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, inject, DoCheck, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-change-detection-on-push',
  standalone: true,
  imports: [],
  templateUrl: './change-detection-on-push.component.html',
  styleUrl: './change-detection-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionOnPushComponent implements OnDestroy, DoCheck, AfterViewChecked {

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private intervalId?: number;

  count: number = 0;

  ngDoCheck(): void {
    console.log('ngDoCheck: компонент проверяется, count =', this.count);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked: view проверена, DOM актуален, count =', this.count);
  }

  markForCheckScenario(): void {
    setTimeout(() => {
      this.count++;
      console.log('count изменён в setTimeout:', this.count);
      this.cdr.markForCheck();
      console.log('markForCheck() вызван для компонента, count =', this.count);
    }, 1000);
  }

  detectChangesScenario(): void {
    setTimeout(() => {
      this.count++;
      console.log('count изменён в setTimeout:', this.count);
      this.cdr.detectChanges();
      console.log('detectChanges() завершён');
    }, 1000);
  }

  changeClick(): void {
    this.count++;
    console.log('count изменён через (click):', this.count);
  }

  changeTimeout(): void {
    console.log('setTimeout запущен');
    setTimeout(() => {
      this.count++
      console.log('count изменён через setTimeout:', this.count)
    }, 1000);
  }

  changeInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      console.log('setInterval остановлен');
      return;
    }
    console.log('setInterval запущен');
    this.intervalId = setInterval(() => {
      this.count++;
      console.log('count изменён через setInterval:', this.count);
    }, 1000);
  }

  changePromise(): void {
    console.log('Promise запущен');
    Promise.resolve().then(() => {
      this.count++;
      console.log('count изменён через Promise:', this.count);
    });
  }

  detach(): void {
    console.log('detach() — компонент отключён от Change Detection');
    this.cdr.detach();
    this.cdr.markForCheck();
  }

  reattach(): void {
    this.cdr.reattach();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

}
