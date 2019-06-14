import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';
import { Wall } from '../../wall';
import { WallSet } from '../../wallSet';
import { InteractionData } from '../../InteractionData';
import { of } from 'rxjs/observable/of';

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

        for ( var i = 0; i < shapesService.wallSets.length; i++) {
            if (shapesService.wallSets[i].type === 'General' &&
            shapesService.wallSets[i].active) {
                this.wallSetSimulated = shapesService.wallSets[i];
                this.wallSimulated = this.wallSetSimulated.walls[0];
                this.wallSetSimulatedIndex = i;
                this.wallSimulatedIndex = 0;

                this.initIterations();
            }
        }
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
            this.interactionData.interactedDevice = undefined;
            this.interactionData.people = [];
        } else if (index === 1) {
            var familyMembers = ['Mother', 'Father', 'Nick'];
            for (var i = 0; i < familyMembers.length; i++) {
                if (this.interactionData.people.indexOf(familyMembers[i]) < 0) {
                    this.interactionData.people.push(familyMembers[i]);
                }
            }

            if (this.interactionData.brightness === 0) {
                this.interactionData.brightness = 100;
            }
        } else if (index === 2) {
            if (this.interactionData.people.length > 0) {
                this.interactionData.people.push('Mother-in-law');
            }
        } else if (index === 3) {
            this.interactionData.people = ['Nick'];
        } else if (index === 4) {
            this.interactionData.brightness = 50;
        } else if (index === 5) {
            this.interactionData.interactedDevice = 'Couch';
        } else if (index === 6) {
            this.interactionData.interactedDevice = undefined;
        } else if (index === 7) {
            this.interactionData.brightness = 100;
        } else if (index === 8) {
            var motherIndex = this.interactionData.people.indexOf('Mother-in-law');
            if (motherIndex > -1) {
                this.interactionData.people.splice(motherIndex);
            }
        }

        // triggerEvent
        if (this.interactionData.interactedDevice !== undefined) {
            for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                if (this.shapesService.wallSets[i].type === 'Special' &&
                    this.shapesService.wallSets[i].active) {
                    this.wallSetSimulated = this.shapesService.wallSets[i];
                    this.wallSimulated = this.wallSetSimulated.walls[0];
                    this.wallSetSimulatedIndex = i;
                    this.wallSimulatedIndex = 0;
                    this.initIterations();

                    return;
                }
            }
        } else if (this.interactionData.people.length > 1) {
            if (this.interactionData.people.indexOf('Mother-in-law') > -1) {
                for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                    if (this.shapesService.wallSets[i].type === 'Personal' &&
                        this.shapesService.wallSets[i].active &&
                        this.shapesService.wallSets[i].target === 'Mother-in-law') {
                        this.wallSetSimulated = this.shapesService.wallSets[i];
                        this.wallSimulated = this.wallSetSimulated.walls[0];
                        this.wallSetSimulatedIndex = i;
                        this.wallSimulatedIndex = 0;
                        this.initIterations();
                        return;
                    }
                }
            }

            for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                if (this.shapesService.wallSets[i].type === 'General' &&
                    this.shapesService.wallSets[i].active) {
                    this.wallSetSimulated = this.shapesService.wallSets[i];
                    this.wallSimulated = this.wallSetSimulated.walls[0];
                    this.wallSetSimulatedIndex = i;
                    this.wallSimulatedIndex = 0;
                    this.initIterations();

                    return;
                }
            }
        } else if (this.interactionData.people.length === 1) {
            for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                if (this.shapesService.wallSets[i].type === 'Personal' &&
                    this.shapesService.wallSets[i].active &&
                    this.shapesService.wallSets[i].target === this.interactionData.people[0]) {
                    this.wallSetSimulated = this.shapesService.wallSets[i];
                    this.wallSimulated = this.wallSetSimulated.walls[0];
                    this.wallSetSimulatedIndex = i;
                    this.wallSimulatedIndex = 0;
                    this.initIterations();

                    return;
                }
            }
        } else if (this.interactionData.people.length === 0) {
            this.interactionData.brightness = 0;
        }


    }

    setWallBorderStyle() {
        let style = {
            'background-size': 'cover',
            'background-color': '#ffffff',
            'filter': 'brightness(' + this.interactionData.brightness + '%)'
        };

        if(this.interactionData.people.length === 0) {
            style.filter = 'brightness(0%)';
        }

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