import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})

export class EditorComponent {
    showExpandedShapes = false;
    images: GalleryImage[] = [];

    constructor(private shapesService: ShapesService, private databaseService: DatabaseService) {
        this.getImages();
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

    addFrame(type: string) {
        this.shapesService.pushFrame(type);
    }

    expandShapes() {
        this.showExpandedShapes = true;
    }

    stopExpandShapes() {
        this.showExpandedShapes = false;
    }

    toggleActiveWall() {
        this.shapesService.loadedWallSet.active = !this.shapesService.loadedWallSet.active;
        this.shapesService.wallSets[this.shapesService.loadedWallSetIndex].active = this.shapesService.loadedWallSet.active;
        this.shapesService.updateWallSet(this.shapesService.loadedWallSetIndex);

        if (this.shapesService.loadedWallSet.active) {
            for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                if (((this.shapesService.wallSets[i].type === 'Special' &&
                    this.shapesService.loadedWallSet.type === 'Special') ||
                    this.shapesService.wallSets[i].type === 'General' &&
                    this.shapesService.loadedWallSet.type === 'General') &&
                    this.shapesService.wallSets[i]._id !== this.shapesService.loadedWallSet._id) {

                    if (this.shapesService.wallSets[i].active) {
                        this.shapesService.wallSets[i].active = false;
                        this.shapesService.updateWallSet(i);
                    }
                }

                if (this.shapesService.wallSets[i].type === 'Personal' &&
                    this.shapesService.loadedWallSet.type === 'Personal' &&
                    this.shapesService.wallSets[i].target === this.shapesService.loadedWallSet.target &&
                    this.shapesService.wallSets[i]._id !== this.shapesService.loadedWallSet._id) {

                    if (this.shapesService.wallSets[i].active) {
                        this.shapesService.wallSets[i].active = false;
                        this.shapesService.updateWallSet(i);
                    }
                }
            }
        }

    }
}
