import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[hover]',
  standalone: true,
})
export class HoverDirective {

  constructor(private el: ElementRef) {}

    @HostBinding('style.fontWeight') textBold: string = 'normal';

    @HostListener('mouseenter')
    onEnter(): void {
      this.textBold = 'bold';
    }
    @HostListener('mouseleave')
    onLeave(): void {
      this.textBold = 'normal';
    }
}
