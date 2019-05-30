import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { GalleryImage } from '../../galleryImage';
import { DatabaseService } from '../../database.service';

@Component({
    selector: 'app-load-wall',
    templateUrl: './load-wall.component.html',
    styleUrls: ['./load-wall.component.scss'],
})

export class LoadWallComponent {
    showLoadWall = false;
    images: GalleryImage[] = [];

    constructor(private shapesService: ShapesService, private databaseService: DatabaseService) {
        this.getImages();
        this.loadWallSets();
    }

    loadWallSets() {
        this.shapesService.getWallSets();
    }

    getImages() {
        this.databaseService.getImages().subscribe(
            images => {
                this.images = images;
            }
        );
    }

    getImageSRC(id: string) {
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i]._id === id) {
                return this.images[i].src;
            }
        }
    }

    toggleDisplayedStatues() {
        this.showLoadWall = !this.showLoadWall;
    }

    loadWall(wallSetIndex, wallIndex) {
        this.shapesService.loadedWallSet = this.shapesService.wallSets[wallSetIndex].copy();
        this.shapesService.focusedWallIndex = wallIndex;
        this.shapesService.editMode = true;
        this.shapesService.isFocusedFrame = false;
        this.shapesService.isFocusedWall = true;
        this.shapesService.selectedFrame = -1;
        this.shapesService.loadedWallSetIndex = wallSetIndex;
        this.shapesService.focusedWallIndex = wallIndex;

        this.shapesService.currWallpapers = this.shapesService.loadedWallSet.walls[wallIndex].images;
        this.shapesService.wallpapers = [];
        this.shapesService.selectedWallpapers = this.shapesService.currWallpapers.length;

        for (var i = 0; i < this.shapesService.currWallpapers.length; i++) {
            this.shapesService.wallpapers.push(this.shapesService.currWallpapers[i]);
        }
    }
}
