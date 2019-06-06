import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';
import { Wall } from '../../wall';
import { WallSet } from '../../wallSet';
import { InteractionData } from '../../InteractionData';

@Component({
    selector: 'app-wall-simulator',
    templateUrl: './wall-simulator.component.html',
    styleUrls: ['./wall-simulator.component.scss']
})

export class WallSimulatorComponent {
    images: GalleryImage[] = [];
    wallSetSimulated: WallSet;
    wallSimulated: Wall;
    wallSetSimulatedIndex: number;
    wallSimulatedIndex: number;
    lastAction = -1;
    displayWallSimulator = false;
    interactionData = new InteractionData();

    constructor(private shapesService: ShapesService, private databaseService: DatabaseService) {
        if (shapesService.wallSets.length === 0) {
            shapesService.getWallSets();
            this.getImages();
            return;
        }

        this.getImages();
        this.displayWallSimulator = true;

        this.wallSetSimulated = shapesService.wallSets[1];
        this.wallSimulated = this.wallSetSimulated.walls[0];
        this.wallSetSimulatedIndex = 1;
        this.wallSimulatedIndex = 0;

        this.initIterations();
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

    initIterations() {
        if (this.wallSimulated.images.length > 0) {
            var self = this;
            setInterval(function() {
                self.wallSimulated.displayedImageIndex =
                ++self.wallSimulated.displayedImageIndex % self.wallSimulated.images.length;
            }, self.wallSimulated.iterateTime * 60000);
        }

        this.wallSimulated.frames.forEach(frame => {
            if (frame.images.length > 0 && frame.iterateTime > 0) {
                setInterval(function() {
                    frame.displayedImageIndex = ++frame.displayedImageIndex % frame.images.length;
                }, frame.iterateTime * 60000);
            }
        });
    }

    applyAction(index) {
        this.lastAction = index;

        if (index === 0) {
            this.interactionData.brightness = 0;
        } else if (index === 1) {
            // TODO
        } else if (index === 2) {
            // TODO
        } else if (index === 3) {
            // TODO
        } else if (index === 4) {
            this.interactionData.brightness = 50;
        } else if (index === 5) {
            // TODO

            for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                if (this.shapesService.wallSets[i].type === 'Special') { // + active
                    this.wallSetSimulated = this.shapesService.wallSets[i];
                    this.wallSimulated = this.wallSetSimulated.walls[0];
                    this.wallSetSimulatedIndex = i;
                    this.wallSimulatedIndex = 0;
                    this.initIterations();

                    return;
                }
            }
        }
    }

    setWallBorderStyle() {
        let style = {
            'background-size': 'cover',
            'background-color': '#ffffff',
            'filter': 'brightness(' + this.interactionData.brightness + '%)'
        };

        var wallBorderMaterial = this.wallSimulated.borderMaterial;
        if (wallBorderMaterial !== '' && wallBorderMaterial !== undefined) {
            style['background-image'] = 'url(' + wallBorderMaterial + ')';
        }

        return style;
    }

    setFrameBorderStyle(index: number) {
        let style = {
            'background-color': this.wallSimulated.frames[index].borderColor,
            'border-radius': this.wallSimulated.frames[index].borderRadius + '%',
            'width': this.wallSimulated.frames[index].width + 'px',
            'height': this.wallSimulated.frames[index].height + 'px',
            'top': this.wallSimulated.frames[index].top + 'px',
            'left': this.wallSimulated.frames[index].left + 'px',
            'z-index': this.wallSimulated.frames[index].zIndex
        };

        var frameBorderMaterial = this.wallSimulated.frames[index].borderMaterial;
        if (frameBorderMaterial !== '' && frameBorderMaterial !== undefined) {
            style['background-image'] = 'url(' + frameBorderMaterial + ')';
        }

        return style;
    }
}