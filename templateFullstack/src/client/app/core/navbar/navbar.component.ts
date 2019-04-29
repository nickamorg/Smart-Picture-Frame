import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    showNewWallModal: boolean = false;
    
    constructor() { }

    ngOnInit() { }

    toggleNewWallModal() {
        this.showNewWallModal = !this.showNewWallModal;
        console.log(this.showNewWallModal);
    }

    receiveMessage($event) {
       this.toggleNewWallModal();
    }
}
