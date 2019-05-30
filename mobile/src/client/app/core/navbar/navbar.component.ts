import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    showNewWallModal = false;
    showExpandedMenu = false;

    constructor(private shapesService: ShapesService) { }

    toggleNewWallModal() {
        this.showNewWallModal = !this.showNewWallModal;
        this.showExpandedMenu = false;
        document.body.classList.add('modal-open');
    }

    toggleExpandableMenu() {
        this.showExpandedMenu = !this.showExpandedMenu;
    }

    closeExpandedMenu() {
        this.showExpandedMenu = false;
    }

    receiveMessage($event) {
        this.showNewWallModal = !this.showNewWallModal;
        this.showExpandedMenu = false;
    }
}
