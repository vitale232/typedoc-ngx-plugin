import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[vmcMatHoverElevation]',
})
export class HoverElevationDirective {
  /**
   * Sets the Material Design elevation's `z-value`, which determines the mat-elevation helper
   * that's added to the element on hover.
   *
   * For example, when the input value is `3`, the class `mat-elevation-z3` is added.
   */
  @Input('vmcMatHoverElevation') zValue: string | number | null = '3';

  private nativeEl: HTMLElement | null = null;

  constructor(private el: ElementRef) {
    this.nativeEl = this.el.nativeElement;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.zValue)
      this.nativeEl?.classList.add(`mat-elevation-z${this.zValue}`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.zValue)
      this.nativeEl?.classList.remove(`mat-elevation-z${this.zValue}`);
  }
}
