import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { LoadComponent } from '../components/load/load.component';
import { PhotosComponent } from '../components/photos/photos.component';
import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';
import { environment } from '../environments/environment';
import { LoadImagesService } from '../providers/load-images.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, LoadComponent, PhotosComponent, NgDropFilesDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [LoadImagesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
