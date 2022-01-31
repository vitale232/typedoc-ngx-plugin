import { ElementRef } from '@angular/core';
import { DragDropDirective } from './drag-drop.directive';

describe('DragDropDirective', () => {
  it('should create an instance', () => {
    const directive = new DragDropDirective(new ElementRef({}));
    expect(directive).toBeTruthy();
  });
});
