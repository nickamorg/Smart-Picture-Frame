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
import { WorkspaceComponent } from './workspace/workspace.component';
import { ToolsComponent } from './tools/tools.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NewWallComponent,
    LoadWallComponent,
    UploadImagesComponent,
    UploadMaterialsComponent,
    GalleryComponent,
    WorkspaceComponent,
    ToolsComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    CoreRoutingModule,
    NavbarComponent,
    FooterComponent,
    WorkspaceComponent
  ]
})
export class CoreModule { }
