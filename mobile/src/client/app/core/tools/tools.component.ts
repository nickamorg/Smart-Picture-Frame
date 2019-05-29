import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { MaterialDBService } from '../../materialDB.service';
import { Material } from '../../material';

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {
    showChooseFrameImagesModal = false;
    showChooseWallImagesModal = false;
    materials: Material[] = [];

    constructor(private shapesService: ShapesService, private materialDBService: MaterialDBService) {
        this.getMaterials();
    }

    getMaterials() {
        this.materialDBService.getMaterials().subscribe(
            materials => {
                this.materials = materials;
            }
        );
    }

    setDropDownDisplayedMaterial(src: String) {
        let style = {
            'background-image': 'url(' + src + ')',
            'width': '100%',
            'height': '27px',
            'margin-left': '10px',
            'margin-bottom': '10px',
            'cursor': 'pointer',
            'padding-bottom': '5px'
        };

        return style;
    }

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
