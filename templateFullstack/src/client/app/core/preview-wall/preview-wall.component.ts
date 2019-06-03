import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';
import { Wall } from '../../wall';

@Component({
    selector: 'app-display-wall',
    templateUrl: './preview-wall.component.html',
    styleUrls: ['./preview-wall.component.scss']
})

export class PreviewWallComponent {
    images: GalleryImage[] = [];
    previewWall: Wall;

    constructor(private shapesService: ShapesService, private databaseService: DatabaseService) {
        if (!shapesService.editMode) {
            return;
        }

        this.getImages();

        this.previewWall = shapesService.loadedWallSet.walls[shapesService.focusedWallIndex];
        shapesService.isFocusedWall = false;
        shapesService.isFocusedFrame = false;

        if (this.previewWall.images.length > 0) {
            var self = this;
            setInterval(function() {
                self.previewWall.displayedImageIndex = ++self.previewWall.displayedImageIndex % self.previewWall.images.length;
            }, self.previewWall.iterateTime * 60000);
        }

        this.previewWall.frames.forEach(frame => {
            if (frame.images.length > 0 && frame.iterateTime > 0) {
                setInterval(function() {
                    frame.displayedImageIndex = ++frame.displayedImageIndex % frame.images.length;
                }, frame.iterateTime * 60000);
            }
        });
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
}
