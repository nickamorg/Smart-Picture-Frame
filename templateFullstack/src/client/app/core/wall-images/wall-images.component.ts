import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { Wallpaper } from '../../wallpaper';
import { WallpaperDBService } from '../../wallpaperDB.service';

@Component({
  selector: 'app-wall-images',
  templateUrl: './wall-images.component.html',
  styleUrls: ['./wall-images.component.scss']
})
export class WallImagesComponent implements OnInit {

    @Input() showChooseWallImagesModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();

    showChooseWallImages = false;
    wallpapers: Wallpaper[] = [];

    constructor(private shapesService: ShapesService, private wallpaperDBService: WallpaperDBService) {
        this.getWallpapers();
    }

    getWallpapers() {
        this.wallpaperDBService.getWallpapers().subscribe(
            wallpapers => {
                this.wallpapers = wallpapers;
            }
        );
    }

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit('toggleChooseWallImagesModal');
        this.shapesService.currWallpapers = [];
        this.shapesService.selectedWallpapers = this.shapesService.wallpapers.length;
        this.shapesService.wallpapers.forEach(wallpaper => {
            this.shapesService.currWallpapers.push(wallpaper);
        });
    }

    applySelectedWallpapers() {
        if (this.shapesService.selectedWallpapers) {
            this.shapesService.addSelectedWallpapers();
            this.sendMessage();
        }
    }

}
