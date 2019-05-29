import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    showNewWallModal = false;

    toggleNewWallModal() {
        this.showNewWallModal = !this.showNewWallModal;
    }

    receiveMessage($event) {
        this.toggleNewWallModal();
    }

}
