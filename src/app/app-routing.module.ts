import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadComponent } from '../components/load/load.component';
import { PhotosComponent } from '../components/photos/photos.component';

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'load', component: LoadComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'photos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
