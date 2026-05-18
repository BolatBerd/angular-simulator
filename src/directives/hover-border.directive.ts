import { Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[hoverBorder]',
  standalone: true,
})
export class HoverBorderDirective implements OnDestroy {

  private timeoutId?: ReturnType<typeof setTimeout>;

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#ff0080','#7928ca', '#00d4ff', 'rgba(62, 80, 241, 0.13)'],
    thickness: 2,
  };

  private isActive: boolean = false;

  @HostBinding('style.border')
  get border(): string {
    if (this.isActive) {
      return `${this.gradientConfiguration.thickness ?? 2}px solid transparent`;
    }
    return `${this.gradientConfiguration.thickness ?? 2}px solid #dcdcdc`
  }

  @HostBinding('style.background')
    get background(): string {

    if (!this.isActive) {
      return 'transparent';
    }

    return `
      linear-gradient(white, white) padding-box,
      linear-gradient(90deg, ${this.gradientConfiguration.colors}) border-box
    `;
  }

  @HostBinding('style.backgroundSize')
  get backgroundSize(): string {
    return this.isActive ? '300% 300%' : '';
  }

  @HostBinding('style.animation')
  get animation(): string {
    return this.isActive ? 'gradientMove 3s linear infinite' : '';
  }

  @HostBinding('style.borderRadius')
  borderRadius: string = '12px';

  @HostBinding('style.transition')
  transition: string = 'all 0.3s ease';

  @HostListener('mouseenter')
  onEnter(): void {

    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.isActive = true;
    }, this.gradientConfiguration.delay ?? 1000);
  }

  @HostListener('mouseleave')
  onLeave(): void {

    clearTimeout(this.timeoutId);

    this.isActive = false;
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }
}
