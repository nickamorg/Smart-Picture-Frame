import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent implements OnInit {
    wallpapers: Wallpaper[];
    uploadedWallpapers: Wallpaper[];
    showUploadedWallpapersModal = false;

    constructor() {
        this.wallpapers = [
            new Wallpaper('/assets/wallpapers/waterfalls.jpg', 'Waterfalls'),
            new Wallpaper('/assets/wallpapers/inferno.jpg', 'Inferno'),
        ];
    }

    ngOnInit() { }

    deleteWallpaper(src: string) {
        this.wallpapers = this.wallpapers.filter(function(elem) {
            return elem.src !== src;
        });
    }

    processFile(imageInput) {
        this.uploadedWallpapers = [];
        this.showUploadedWallpapersModal = true;

        for (var i = 0; i < imageInput.files.length; i++) {
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                this.uploadedWallpapers.push(new Wallpaper(event.target.result, ''));
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

class Wallpaper {
    src: string;
    title: string;

    constructor(src: string, title: string) {
        this.src = src;
        this.title = title;
    }
}
