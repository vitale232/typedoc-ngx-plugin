import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverElevationDirective } from './hover-elevation.directive';

@NgModule({
  declarations: [HoverElevationDirective],
  exports: [HoverElevationDirective],
  imports: [CommonModule],
})
export class VmcHoverElevationModule {}
