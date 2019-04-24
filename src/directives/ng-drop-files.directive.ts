import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() files: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any): void {
    this.mouseSobre.emit(true);
    this._preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): void {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    const transfer = this._getTransfer(event);

    if (!transfer) {
      return;
    }

    this._extractFiles(transfer.files);
    this._preventStop(event);
    this.mouseSobre.emit(false);
  }

  private _getTransfer(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles(listFiles: FileList) {
    // console.log(listFiles);
    // tslint:disable-next-line: forin
    for (const property in Object.getOwnPropertyNames(listFiles)) {
      const temporalFile = listFiles[property];
      if (this._fileCanBeDropped(temporalFile)) {
        const newFile = new FileItem(temporalFile);
        this.files.push(newFile);
      }
    }

    // console.log(this.files);
  }

  // Validators

  /**
   * Validate both validations, it means if the file is dropped and if is an image
   * @param file File to validate
   */
  private _fileCanBeDropped(file: File): boolean {
    if (!this._fileIsDropped(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Stop event that Chrome opens image
   */
  private _preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Validate that the file doesn't exist in the Images Array
   */
  private _fileIsDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.nameFile === fileName) {
        console.log('File ' + fileName + ' is added already!');
        return true;
      }
    }

    return false;
  }

  /**
   * Verify that the element droped is an Image
   */
  private _isImage(fileType: string): boolean {
    return fileType === '' || fileType === undefined ? false : fileType.startsWith('image');
  }
}
