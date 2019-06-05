import { Component } from '@angular/core';
import { ShapesService } from '../../shapes.service';
import { DatabaseService } from '../../database.service';
import { GalleryImage } from '../../galleryImage';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})

export class EditorComponent {
    images: GalleryImage[] = [];
    currentTime: String;

    constructor(private shapesService: ShapesService, private databaseService: DatabaseService) {
        this.getImages();
        this.showTime();
    }

    getImages() {
        this.databaseService.getImages().subscribe(
            images => {
                this.images = images;
            }
        );
    }

    getImageSRC(id: string) {
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i]._id === id) {
                return this.images[i].src;
            }
        }
    }

    addFrame(type: string) {
        this.shapesService.pushFrame(type);
    }

    showTime(){
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59

        this.currentTime =  ((h < 10) ? '0' + h : h).toString() + ':' +
                            ((m < 10) ? '0' + m : m).toString() + ':' +
                            ((s < 10) ? '0' + s : s).toString();

        setInterval(() => { this.showTime(); }, 1000);

    }

    getCurrentTime() {
        return this.currentTime;
    }

}
