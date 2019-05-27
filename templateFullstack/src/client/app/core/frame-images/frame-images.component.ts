import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';

@Component({
    selector: 'app-frame-images',
    templateUrl: './frame-images.component.html',
    styleUrls: ['./frame-images.component.scss']
})
export class FrameImagesComponent implements OnInit {
    @Input() showChooseFrameImagesModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();

    showChooseFrameImages = false;
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

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit('toggleChooseFrameImagesModal');
        this.shapesService.currFrameImages = [];
        this.shapesService.selectedImages = this.shapesService.frameImages.length;
        this.shapesService.frameImages.forEach(image => {
            this.shapesService.currFrameImages.push(image);
        });;
    }

    applySelectedImages() {
        if (this.shapesService.selectedImages) {
            this.shapesService.addSelectedImages();
            this.sendMessage();
        }
    }

}
