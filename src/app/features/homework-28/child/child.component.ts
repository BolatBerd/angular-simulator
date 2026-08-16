import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {

  @Input() user!: { name: string; age: number };

  //Компонент использует ChangeDetectionStrategy.OnPush.
  //Angular при OnPush проверяет не содержимое объекта, а его ссылку.

}
