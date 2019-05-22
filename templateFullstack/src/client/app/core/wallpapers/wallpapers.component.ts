import { Component } from '@angular/core';
import { WallpaperDBService } from '../../wallpaperDB.service';
import { Wallpaper } from './../../wallpaper';

@Component({
  selector: 'app-wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent {
    wallpapers: Wallpaper[] = [];
    uploadedWallpapers: Wallpaper[];
    showUploadedWallpapersModal = false;

    constructor(private wallpaperDBService: WallpaperDBService) {
        this.getWallpapers();
    }

    getWallpapers() {
        this.wallpaperDBService.getWallpapers().subscribe(
            wallpapers => {
                this.wallpapers = wallpapers;
            }
        );
    }

    deleteWallpaper(selectedWallpaper: Wallpaper) {
        this.wallpaperDBService.deleteWallpaper(selectedWallpaper._id);
        this.getWallpapers();
    }

    processFile(imageInput) {
        this.uploadedWallpapers = [];
        this.showUploadedWallpapersModal = true;

        for (var i = 0; i < imageInput.files.length; i++) {
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                this.uploadedWallpapers.push(new Wallpaper('', '', event.target.result));
            });
            reader.readAsDataURL(file);
        }
    }

    uploadWallpapers() {
        //Mongodb code missed
        this.showUploadedWallpapersModal = false;

        this.uploadedWallpapers.forEach(element => {
           this.wallpapers.push(element);
        });
    }

    cancelUploadWallpapers() {
        this.showUploadedWallpapersModal = false;
    }

    saveWallpaperTitle(index, event) {
        this.uploadedWallpapers[index].title = event.target.value;
    }

    deleteUploadedWallpaper(src: string) {
        this.uploadedWallpapers = this.uploadedWallpapers.filter(function(elem) {
            return elem.src !== src;
        });
    }
}