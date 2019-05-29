import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
  selector: 'app-wall-images',
  templateUrl: './wall-images.component.html',
  styleUrls: ['./wall-images.component.scss']
})
export class WallImagesComponent implements OnInit {
    @Input() showChooseWallImagesModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();

    showChooseWallImages = false;
    constructor(private shapesService: ShapesService) {}

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit('toggleChooseWallImagesModal');
    }

    applySelectedWallImages() {
        this.shapesService.addSelectedWallpapers();
        this.sendMessage();
    }

}
