import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-load-wall',
    templateUrl: './load-wall.component.html',
    styleUrls: ['./load-wall.component.scss'],
})

export class LoadWallComponent {
    @Input() showLoadWallModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();

    showLoadWall = false;

    constructor(private shapesService: ShapesService) {}

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit('toggleShowLoadWallModalPartially');
    }

    toggleDisplayedStatues() {
        this.showLoadWall = !this.showLoadWall;
    }

    loadWall(wallSetIndex, wallIndex) {
        this.sendMessage();
        this.shapesService.loadedWallSet = this.shapesService.wallSets[wallSetIndex].copy();
        this.shapesService.focusedWallIndex = wallIndex;
        this.shapesService.editMode = true;
        this.shapesService.isFocusedFrame = false;
        this.shapesService.isFocusedWall = true;
        this.shapesService.selectedFrame = -1;
        this.shapesService.loadedWallSetIndex = wallSetIndex;
        this.shapesService.focusedWallIndex = wallIndex;
        // this.shapesService.loadWall(....);
    }
}
