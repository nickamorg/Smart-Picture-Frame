import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})


export class GalleryComponent implements OnInit {
    imagesCol: number;
    galleryImages: Image[];

    constructor() { 
        this.imagesCol = 6;

        this.galleryImages = [
            new Image("Amazon Waterfall", "Description Example", "waterfall1.png"),
            new Image("Amazon Waterfall", "Description Example", "waterfall2.png"),
            new Image("Amazon Waterfall", "Description Example", "waterfall3.png"),
            new Image("Amazon Waterfall", "Description Example", "waterfall4.png")
        ]
    }

    ngOnInit() { }

    changeImagesCol(col:number) {
        this.imagesCol = col;
    }
}

class Image {
    title: string;
    description: string;
    src: string;

    constructor(title, descr, src) {
        this.title = title;
        this.description = descr;
        this.src = src;
    }
}