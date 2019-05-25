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

    receiveMessage($event) {
        if ($event === 'toggleShowNewWallModalPartially') {
            this.toggleNewWallModal();
        } else {
            this.toggleLoadWallModal();
        }
    }
}
