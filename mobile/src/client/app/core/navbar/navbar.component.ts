import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../navigation.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    showNewWallModal: boolean = false;
    showLoadWallModal: boolean = false;
    showExpandedMenu: boolean = false;

    constructor(private shapesService: ShapesService, 
                private navigationService: NavigationService, 
                private router: Router) { }

    ngOnInit() { }

    toggleNewWallModal() {
        this.showNewWallModal = !this.showNewWallModal;
        this.showExpandedMenu = false;
    }

    toggleLoadWallModal() {
        this.showLoadWallModal = !this.showLoadWallModal;
        this.showExpandedMenu = false;
    }

    toggleExpandableMenu() {
        this.showExpandedMenu = !this.showExpandedMenu;
    }

    closeExpandedMenu() {
        this.showExpandedMenu = false;
    }

    receiveMessage($event) {
        if($event === "toggleShowNewWallModalPartially") {
            this.toggleNewWallModal();
        } else {
            this.toggleLoadWallModal();
        }
    }
}
