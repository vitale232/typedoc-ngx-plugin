import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[vmcDragDrop]',
})
export class DragDropDirective {
  @Input('vmcDragDrop') color = '#E0E0E0';

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragOver(): void {
    this.highlight(this.color);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(): void {
    this.highlight(null);
  }

  @HostListener('drop', ['$event']) onDrop(): void {
    this.highlight(null);
  }

  private highlight(color: string | null): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.el.nativeElement as HTMLElement).style.backgroundColor = color as any;
  }
}
