import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[hover]',
  standalone: true,
})
export class HoverDirective {

  private el: ElementRef = inject(ElementRef);

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
