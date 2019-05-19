import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-frame-images',
    templateUrl: './frame-images.component.html',
    styleUrls: ['./frame-images.component.scss']
})
export class FrameImagesComponent implements OnInit {
    @Input() showChooseFrameImagesModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();

    showChooseFrameImages = false;
    constructor(private shapesService: ShapesService) {}

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit('toggleChooseFrameImagesModal');
    }

    applySelectedImages() {
        this.shapesService.addSelectedImages();
        this.sendMessage();
    }

}
