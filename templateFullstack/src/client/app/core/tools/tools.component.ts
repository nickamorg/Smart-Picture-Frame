import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
    showChooseFrameImagesModal = false;
    showChooseWallImagesModal = false;

    constructor(private shapesService: ShapesService) { }

    ngOnInit() { }

    toggleChooseFrameImagesModal() {
        this.showChooseFrameImagesModal = !this.showChooseFrameImagesModal;
    }

    toggleChooseWallImagesModal() {
        this.showChooseWallImagesModal = !this.showChooseWallImagesModal;
    }

    receiveMessage($event) {
        if ($event === 'toggleChooseFrameImagesModal') {
            this.toggleChooseFrameImagesModal();
        } else {
            this.toggleChooseWallImagesModal();
        }
    }

}
