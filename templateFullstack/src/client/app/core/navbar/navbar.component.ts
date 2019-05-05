import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    showNewWallModal: boolean = false;
    
    constructor(private shapesService: ShapesService, private router: Router) { }

    ngOnInit() { }

    toggleNewWallModal() {
        this.showNewWallModal = !this.showNewWallModal;
    }

    receiveMessage($event) {
       this.toggleNewWallModal();
    }
}
