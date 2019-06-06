import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';
import { Wall } from '../../wall';
import { WallSet } from '../../wallSet';

@Component({
    selector: 'app-wall-simulator',
    templateUrl: './wall-simulator.component.html',
    styleUrls: ['./wall-simulator.component.scss']
})

export class WallSimulatorComponent {
    images: GalleryImage[] = [];
    wallSetSimulated: WallSet;
    wallSimulated: Wall;
    lastAction = -1;
    displayWallSimulator = false;

    constructor(private shapesService: ShapesService, private databaseService: DatabaseService) {
        if (shapesService.wallSets.length === 0) {
            shapesService.getWallSets();
            this.getImages();
            return;
        }

        console.log(this.wallSimulated);

        this.displayWallSimulator = true;

        // if (!shapesService.editMode) {
        //     return;
        // }

        console.log(shapesService.wallSets);
        this.wallSimulated = shapesService.wallSets[1].walls[0];
        shapesService.isFocusedWall = false;
        shapesService.isFocusedFrame = false;

        // if (this.wallSimulated.images.length > 0) {
        //     var self = this;
        //     setInterval(function() {
        //         self.wallSimulated.displayedImageIndex = ++self.wallSimulated.displayedImageIndex % self.wallSimulated.images.length;
        //     }, self.wallSimulated.iterateTime * 60000);
        // }

        // this.wallSimulated.frames.forEach(frame => {
        //     if (frame.images.length > 0 && frame.iterateTime > 0) {
        //         setInterval(function() {
        //             frame.displayedImageIndex = ++frame.displayedImageIndex % frame.images.length;
        //         }, frame.iterateTime * 60000);
        //     }
        // });
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

    applyAction(index) {
        this.lastAction = index;
    }
}
