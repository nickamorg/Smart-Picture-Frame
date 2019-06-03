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

    showNewWall = false;
    creators: string[] = ['Home', 'Father', 'Mother', 'Nick'];
    types: string[] = ['General', 'Personal', 'Special'];
    targets: string[] = ['Father', 'Mother', 'Nick', 'Mother-in-law', 'Grandparents'];
    selectedCreator = 'Home';
    selectedType = 'General';
    selectedTarget = 'Grandparents';
    title: string;
    description: string;

    constructor(private shapesService: ShapesService) {}

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit('toggleShowNewWallModalPartially');
    }

    toggleDisplayedStatues() {
        this.showNewWall = !this.showNewWall;
    }

    createNewWall() {
        if (this.selectedType !== 'personal') {
            this.selectedTarget = '';
        }

        this.sendMessage();
        this.shapesService.initNewWall(this.selectedCreator, this.selectedType,
                                        this.selectedTarget, this.title, this.description);
    }

    selectWallCreator(creator) {
        this.selectedCreator = creator;
    }

    selectWallType(type) {
        this.selectedType = type;
    }

    selectWallTarget(target) {
        this.selectedTarget = target;
    }

    setWallTitle(title) {
        this.title = title;
    }

    setWallDescription(description) {
        this.description = description;
    }
}
