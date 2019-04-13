import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
    walls: {};

    constructor() { 
        this.walls = {
            "wall1": {
                "title": "example glossary",
                "creator": "Home",
                "type": "General",
                "target": "Family",
                "description": "Just a usual wall",
                "border-size": 5,
                "border-material": "gold.png",
                "display-time": "20: 30",
                "duration": 30,
                "repeat-time": "02:30:00",
                "wallpapers-iterate-time": 30,
                "wallpapers": {
                    "image1": "waterfall.png",
                    "image2": "waterfall2.png"
                },
                "color": "#ffffff",
                "frames": {
                    "frame1": {
                    "shape": "rectangle",
                    "border-size": 5,
                    "border-material": "gold.png",
                    "padding": 10,
                    "top": 30,
                    "left": 50,
                    "width": 100,
                    "height": 100,
                    "images": {
                        "image1": "waterfall.png",
                        "image2": "waterfall2.png"
                    },
                    "iterate-time": 30
                    }
                }
            }
        };

        console.log(this.walls);
    }

    ngOnInit() { }

}
