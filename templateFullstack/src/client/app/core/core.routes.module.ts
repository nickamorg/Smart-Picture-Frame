import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewWallComponent } from './new-wall/new-wall.component';
import { LoadWallComponent } from './load-wall/load-wall.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { UploadMaterialsComponent } from './upload-materials/upload-materials.component';
import { GalleryComponent } from './gallery/gallery.component';

const coreRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-wall', component: NewWallComponent },
  { path: 'load-wall', component: LoadWallComponent },
  { path: 'upload-images', component: UploadImagesComponent },
  { path: 'upload-materials', component: UploadMaterialsComponent },
  { path: 'gallery', component: GalleryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
