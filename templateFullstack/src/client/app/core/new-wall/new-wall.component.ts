import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-new-wall',
    templateUrl: './new-wall.component.html',
    styleUrls: ['./new-wall.component.scss'],
})
export class NewWallComponent implements OnInit {
    @Input() showNewWallModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();
    
    showNewWall: boolean = false;
    constructor(private shapesService: ShapesService) {}

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit("toggleShowNewWallModalPartially")
    }

    toggleDisplayedStatues() {
        this.showNewWall = !this.showNewWall;
    }

    createNewWall() {
        this.sendMessage();
        this.shapesService.initNewWall();
    }
}
