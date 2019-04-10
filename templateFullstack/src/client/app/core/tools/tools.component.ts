import { Component, OnInit, ViewChild } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
    showChooseFrameImagesModal: boolean = false;
    case:number = 1;

    toggleChooseFrameImagesModal(){
        this.showChooseFrameImagesModal = !this.showChooseFrameImagesModal;
    }
    
    constructor(private shapesService: ShapesService) { }

    ngOnInit() { }

    receiveMessage($event) {
        this.toggleChooseFrameImagesModal();
        //this.message = $event
    }

}
