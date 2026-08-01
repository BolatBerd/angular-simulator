import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() user!: { name: string; age: number };

  ngOnInit() {
    this.cdr.markForCheck();
  }

}

