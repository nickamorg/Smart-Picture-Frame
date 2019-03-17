import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core.routes.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NewWallComponent } from './new-wall/new-wall.component';
import { LoadWallComponent } from './load-wall/load-wall.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { UploadMaterialsComponent } from './upload-materials/upload-materials.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NewWallComponent,
    LoadWallComponent,
    UploadImagesComponent,
    UploadMaterialsComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    CoreRoutingModule,
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
