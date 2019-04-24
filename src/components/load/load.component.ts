import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { LoadImagesService } from '../../providers/load-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  files: FileItem[] = [];
  isOnElement = false;

  constructor(public loadImagesService: LoadImagesService) {}

  ngOnInit() {}

  loadImages() {
    this.loadImagesService.loadImagesFirebase(this.files);
  }

  clearFiles() {
    this.files = [];
  }
}
