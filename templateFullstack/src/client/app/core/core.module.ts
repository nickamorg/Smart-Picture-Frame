import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core.routes.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NewWallComponent } from './new-wall/new-wall.component';
import { LoadWallComponent } from './load-wall/load-wall.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { MaterialsComponent } from './materials/materials.component';
import { WallpapersComponent } from './wallpapers/wallpapers.component';
import { GalleryComponent } from './gallery/gallery.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ToolsComponent } from './tools/tools.component';
import { EditorComponent } from './editor/editor.component';
import { ShapesService } from '../shapes.service';
import { FrameImagesComponent } from './frame-images/frame-images.component';
import { WallImagesComponent } from './wall-images/wall-images.component';
import { DatabaseService } from '../database.service';
import { MaterialDatabaseService } from '../materialDatabase.service';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NewWallComponent,
    LoadWallComponent,
    UploadImagesComponent,
    MaterialsComponent,
    GalleryComponent,
    WorkspaceComponent,
    ToolsComponent,
    EditorComponent,
    FrameImagesComponent,
    WallpapersComponent,
    WallImagesComponent
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
  ],
  providers: [ShapesService, DatabaseService, MaterialDatabaseService]
})
export class CoreModule { }
