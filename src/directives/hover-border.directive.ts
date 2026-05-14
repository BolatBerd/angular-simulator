import { Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { GradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[hoverBorder]',
  standalone: true,
})
export class HoverBorderDirective implements OnDestroy {

  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  @Input() defaultConfig: GradientConfiguration = {
    delay: 1000,
    colors: ['red', 'blue'],
    thickness: 2
  };

  @HostBinding('style.border')
  border: string = '1px solid transparent';

  @HostListener('mouseenter')
  onEnter(): void {
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      const color = this.defaultConfig?.colors?.[0] ?? 'black';
      this.border = `${this.defaultConfig.thickness}px solid ${color}`;
    }, this.defaultConfig.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    this.border = '1px solid transparent';
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }
}
