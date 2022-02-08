import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FileUtils } from './file-utils';

export interface HTMLInputElementChangeEvent extends Event {
  target: HTMLInputElement | null;
}

/**
 * Based on:
 * https://www.positronx.io/angular-material-file-browse-upload-ui-with-material-components/
 */
@Component({
  selector: 'vmc-mat-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePickerComponent {
  readonly chooseText = 'Browse for or Drag a File';
  @Input() control: FormControl = new FormControl(this.chooseText);
  /**
   * Define the accepted file types. This parameter sets the Input Element's
   * [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) attribute.
   * @Input
   */
  @Input() accept = undefined;
  @Input() dragOverColor = '#C1C1C1';
  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() color: 'primary' | 'accent' | 'warn' | null = 'primary';

  /**
   * Emits the uploaded file, which is of the form of the Browser's
   * [`File` API](https://developer.mozilla.org/en-US/docs/Web/API/File/File)
   */
  @Output() readonly fileChange = new EventEmitter<File | null>();

  /**
   * Emits the input files data as a [base64 encoded Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
   * @event
   */
  @Output() readonly dataChange = new EventEmitter<string | null>();

  constructor(private fileUtils: FileUtils) {}

  uploadFileEvt(event: unknown) {
    if (!event) {
      console.warn('No event?');
      return;
    }

    const uploadedFile = (event as HTMLInputElementChangeEvent)?.target
      ?.files?.[0];
    this.fileChange.emit(uploadedFile ?? null);
    if (uploadedFile) {
      this.control.setValue(uploadedFile.name);
    } else {
      this.control.setValue(this.chooseText);
    }

    if (uploadedFile && this.dataChange.observers.length > 0) {
      this.fileUtils
        .readFile(uploadedFile)
        .then((data) => this.dataChange.emit(data))
        .catch((err) => {
          console.error(err);
          this.dataChange.emit(null);
        });
    }
  }
}
