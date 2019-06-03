import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewWallComponent } from './new-wall/new-wall.component';
import { LoadWallComponent } from './load-wall/load-wall.component';
import { PreviewWallComponent } from './preview-wall/preview-wall.component';
import { MaterialsComponent } from './materials/materials.component';
import { WallpapersComponent } from './wallpapers/wallpapers.component';
import { GalleryComponent } from './gallery/gallery.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const coreRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-wall', component: NewWallComponent },
  { path: 'load-wall', component: LoadWallComponent },
  { path: 'preview-wall', component: PreviewWallComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'wallpapers', component: WallpapersComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'workspace', component: WorkspaceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
