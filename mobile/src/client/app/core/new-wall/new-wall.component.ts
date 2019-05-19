import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { NavigationService } from '../../navigation.service';

@Component({
    selector: 'app-new-wall',
    templateUrl: './new-wall.component.html',
    styleUrls: ['./new-wall.component.scss'],
})
export class NewWallComponent implements OnInit {
    @Input() showNewWallModalPartially: boolean;
    @Output() messageEvent = new EventEmitter<string>();
    
    showNewWall: boolean = false;
    creators: string[] = ["Home", "Dad", "Mom", "Nick"];
    types: string[] = ["General", "Personal", "Special"];
    targets: string[] = ["Family"];
    selectedCreator: string = "Home";
    selectedType: string = "General";
    selectedTarget: string = "Family";
    title: string;
    description: string;
    
    constructor(private shapesService: ShapesService, private navigationService: NavigationService) { }

    ngOnInit() { }

    sendMessage() {
        this.messageEvent.emit("toggleShowNewWallModalPartially")
    }

    toggleDisplayedStatues() {
        this.showNewWall = !this.showNewWall;
    }

    createNewWall() {
        this.sendMessage();
        this.shapesService.initNewWall( this.selectedCreator, this.selectedType, 
                                        this.selectedTarget, this.title, this.description);
        this.navigationService.showNavBar = false;
        this.shapesService.isFocusedWall = true;
        this.shapesService.isFocusedFrame = false;
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
