import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUtils {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Returns the contents of a file as a base64 encoded
   * [`dataUrl`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
   *
   * @param file a JavaScript [`File` object](https://developer.mozilla.org/en-US/docs/Web/API/File)
   * @returns a base64 encoded
   * [`dataUrl`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
   * of the file contents
   */
  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event?.target?.result as string);
      reader.onerror = (event) => reject(event);
      reader.readAsDataURL(file);
    });
  }

  async createObjectURL(dataUrlBase64: string): Promise<string> {
    try {
      const res = await fetch(dataUrlBase64);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      return objectUrl;
    } catch (error) {
      console.error('createObjectURL', error);
      throw error;
    }
  }

  /**
   * @seeAlso `FileUtils.openTempImgUrl`
   *
   * Opens an image in a new tab. Most useful as a workaround for Content-Security-Policy issues with
   * the `openTempImgUrl` method.
   *
   * @param dataUrl a valid [Base64 Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
   * @param fillWidth If true, the default, the image will be set to have a `max-width: 100%;`
   */
  popOpenImage(dataUrl: string, fillWidth = true): void {
    if (dataUrl && window) {
      const image = new Image();
      image.src = dataUrl;
      if (fillWidth) {
        image.style.maxWidth = '100%';
      }

      const container = this.document.createElement('div');
      container.style.width = '100%;';
      container.innerHTML = image.outerHTML;

      const newWindow = window.open('');
      newWindow?.document.write(container.outerHTML);
    } else {
      console.warn(
        'Could not operate, as either the data or window are malformed',
        dataUrl,
        window
      );
    }
  }

  /**
   * Returns a temporary URL to the image represented by the input base64 data. **Note**: This method employs
   * [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) under the hood.
   *
   * **Important**: Has the side-effect/benefit of opening the image in the native browser image view.
   *
   * @param dataUrl a valid [Base64 Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
   * @param revokeAfter Optional. If provided, the method will wait `revokeAfter` milliseconds, then revoke the temporary
   * object URL to free up the memory resources. Note that if the URL is open in the tab, revoking won't affect the view,
   * but refreshing the page is a dead link.
   * @param filename Optional. A filename for the internal file that is produced and presented at the URL
   * @returns A temporary URL to the file, with native browser zoom support, that lives for the lifetime osf the `document`
   */
  async openTempImgUrl(dataUrl: string, revokeAfter?: number): Promise<string> {
    try {
      const url = await this.createObjectURL(dataUrl);
      window?.open(url, '_blank', 'noopener noreferrer');
      if (revokeAfter) {
        setTimeout(() => URL.revokeObjectURL(url), revokeAfter);
      }
      return url;
    } catch (error) {
      console.error('openTempImgUrl', error);
      throw error;
    }
  }

  /**
   * Download a file to the client device. Accepts a Base64 encoded string
   * dataURL,`Blob`, or `File`.
   *
   * @param data the data that is to be downloaded, as a base64
   * encoded dataURL,`Blob`, or `File`
   * @param filename the filename to be assigned to the download
   */
  async download(data: string | Blob | File, filename: string): Promise<void> {
    try {
      let url: string;
      if (typeof data === 'string') {
        url = await this.createObjectURL(data);
      } else {
        url = URL.createObjectURL(data);
      }
      const a = document.createElement('a') as HTMLAnchorElement;
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('download', error);
      throw error;
    }
  }

  getImageSize(dataUrl: string): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve([image.naturalWidth, image.naturalHeight]);
      image.onerror = (err) => reject(err);
      image.src = dataUrl;
    });
  }
}
