import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { NavigationService } from '../../navigation.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})

export class EditorComponent implements OnInit {

    constructor(private shapesService: ShapesService, private navigationService: NavigationService) {
        this.navigationService.showNavBar = false;

        //For test code

        this.shapesService.initNewWall("", "", "", "", "");
        this.shapesService.loadedWallSet = this.shapesService.wallSets[0].copy();
        this.navigationService.showNavBar = false;
        this.shapesService.isFocusedWall = true;
        this.shapesService.isFocusedFrame = false;
    }
    
    ngOnInit() { }

    addFrame(type: string) {
        if (!this.shapesService.frames) {
          this.shapesService.frames = [];
        }
        this.shapesService.pushFrame(type);
    }
    
}
