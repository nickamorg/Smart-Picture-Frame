import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    showNewWallModal = false;
    showLoadWallModal = false;

    constructor(private shapesService: ShapesService, private router: Router) { }

    toggleNewWallModal() {
        this.showNewWallModal = !this.showNewWallModal;
    }

    toggleLoadWallModal() {
        this.shapesService.getWallSets();
        this.showLoadWallModal = !this.showLoadWallModal;
    }

    toggleActiveWall() {
        this.shapesService.loadedWallSet.active = !this.shapesService.loadedWallSet.active;
        this.shapesService.wallSets[this.shapesService.loadedWallSetIndex].active = this.shapesService.loadedWallSet.active;
        this.shapesService.updateWallSet(this.shapesService.loadedWallSetIndex);

        if (this.shapesService.loadedWallSet.active) {
            for (var i = 0; i < this.shapesService.wallSets.length; i++) {
                if (this.shapesService.wallSets[i].type === 'Special' &&
                    this.shapesService.loadedWallSet.type === 'Special' &&
                    this.shapesService.wallSets[i]._id !== this.shapesService.loadedWallSet._id) {

                    if (this.shapesService.loadedWallSet.active) {
                        this.shapesService.loadedWallSet.active = false;
                        this.shapesService.updateWallSet(i);
                    }
                }
            }
        }

    }

    receiveMessage($event) {
        if ($event === 'toggleShowNewWallModalPartially') {
            this.toggleNewWallModal();
        } else {
            this.toggleLoadWallModal();
        }
    }
}
