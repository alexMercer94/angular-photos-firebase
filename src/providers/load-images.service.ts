import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {
  private IMAGES_FOLDER = 'img';

  constructor(private db: AngularFirestore) {}

  private saveImage(image: { name: string; url: string }) {
    this.db.collection(`/${this.IMAGES_FOLDER}`).add(image);
  }

  loadImagesFirebase(images: FileItem[]) {
    const storageRef = firebase.storage().ref();
    for (const item of images) {
      item.isUploading = true;
      if (item.progress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.IMAGES_FOLDER}/${item.nameFile}`)
        .put(item.file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error('Error in upload: ' + error),
        () => {
          console.log('Images uploaded successfuly!');
          uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            item.url = downloadUrl;
            item.isUploading = false;
            this.saveImage({
              name: item.nameFile,
              url: item.url
            });
          });
        }
      );
    }
  }
}
