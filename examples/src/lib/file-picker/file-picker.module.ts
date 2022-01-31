import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropDirective } from './drag-drop.directive';
import { FilePickerComponent } from './file-picker.component';

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [FilePickerComponent, DragDropDirective],
  exports: [FilePickerComponent],
  imports: [CommonModule, ReactiveFormsModule, MAT_MODULES],
})
export class VmcFilePickerModule {}
