import { ElementRef } from '@angular/core';
import { HoverElevationDirective } from './hover-elevation.directive';

describe('HoverElevationDirective', () => {
  it('should create an instance', () => {
    const directive = new HoverElevationDirective(new ElementRef({}));
    expect(directive).toBeTruthy();
  });
});
