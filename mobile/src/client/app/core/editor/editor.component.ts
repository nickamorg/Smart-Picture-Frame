import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})

export class EditorComponent implements OnInit {
    showExpandedShapes = false;

    constructor(private shapesService: ShapesService) {

        //For test code
        this.shapesService.initNewWall('', '', '', '', '');
        this.shapesService.loadedWallSet = this.shapesService.wallSets[0].copy();
        this.shapesService.isFocusedWall = true;
        this.shapesService.isFocusedFrame = false;
    }

    ngOnInit() { }

    addFrame(type: string) {
        if (!this.shapesService.frames) {
          this.shapesService.frames = [];
        }
        this.shapesService.pushFrame(type);
        this.showExpandedShapes = false;
    }

    expandShapes() {
        this.showExpandedShapes = true;
    }

    stopExpandShapes() {
        this.showExpandedShapes = false;
    }

}
