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

    showLoadWall: boolean = false;

    constructor(private shapesService: ShapesService) {}

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit("toggleShowLoadWallModalPartially")
    }

    toggleDisplayedStatues() {
        this.showLoadWall = !this.showLoadWall;
    }

    loadWall() {
        this.sendMessage();
        // this.shapesService.loadWall(....);
    }
}