import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';

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
                "border-size": 10,
                "border-material": "gold.png",
                "border-color": "#C4C4C4",
                "background-color": "rgb(97, 0, 0)",
                "display-time": "20: 30",
                "duration": 30,
                "repeat-time": "02:30:00",
                "wallpapers-iterate-time": 30,
                "wallpapers": {
                    "image1": "waterfall.png",
                    "image2": "waterfall2.png"
                },
                "color": "#ffffff",
                "frames": [
                    {
                        "id": 0,
                        "border-radius": 0,
                        "border-size": 5,
                        "border-material": "gold.png",
                        "border-color": "rgb(34, 0, 78)",
                        "padding": 10,
                        "top": 20,
                        "left": 50,
                        "width": 100,
                        "height": 100,
                        "images": ["waterfall1.png", "waterfall2.png"],
                        "iterate-time": 30
                    },
                    {
                        "id": 1,
                        "border-radius": 0,
                        "border-size": 5,
                        "border-material": "gold.png",
                        "border-color": "rgb(255, 209, 5)",
                        "padding": 10,
                        "top": 130,
                        "left": 50,
                        "width": 100,
                        "height": 100,
                        "images": ["waterfall2.png", "waterfall2.png"],
                        "iterate-time": 30
                    },
                    {
                        "id": 2,
                        "border-radius": 100,
                        "border-size": 5,
                        "border-material": "gold.png",
                        "border-color": "purple",
                        "padding": 10,
                        "top": 20,
                        "left": 200,
                        "width": 200,
                        "height": 200,
                        "images": ["waterfall3.png", "waterfall2.png"],
                        "iterate-time": 30
                    },
                    {
                        "id": 3,
                        "border-radius": 100,
                        "border-size": 10,
                        "border-material": "gold.png",
                        "border-color": "purple",
                        "padding": 30,
                        "top": 20,
                        "left": 500,
                        "width": 150,
                        "height": 150,
                        "images": ["waterfall3.png", "waterfall2.png"],
                        "iterate-time": 30
                    }
                ]
            }
        };
    }

    setBezelsStyle() {
        let style = {
            'background-color': this.walls["wall1"]["border-color"]
        };

        return style;
    }

    setWallStyle() {
        let style = {
            'height': 260 - this.walls["wall1"]["border-size"] * 2 + 'px',
            'width': 990 - this.walls["wall1"]["border-size"] * 2 + 'px',
            'top': this.walls["wall1"]["border-size"] + 'px',
            'background-color': this.walls["wall1"]["background-color"]
        };

        return style;
    }

    setFrameBezelsStyle(id: number) {
        let style = {
            'background-color': this.walls['wall1']['frames'][id]['border-color'],
            'border-radius': this.walls['wall1']['frames'][id]['border-radius'] + '%',
            'width': this.walls['wall1']['frames'][id]['width'] + 'px',
            'height': this.walls['wall1']['frames'][id]['height'] + 'px',
            'top': this.walls['wall1']['frames'][id]['top'] + 'px',
            'left': this.walls['wall1']['frames'][id]['left'] + 'px'
        };

        return style;
    }

    setFrameStyle(id:number) {
        let style = {
            'background-color': 'rgb(255, 255, 255)',
            'border-radius': this.walls['wall1']['frames'][id]['border-radius'] + '%',
            'width': (this.walls['wall1']['frames'][id]['width'] - this.walls['wall1']['frames'][id]['border-size'] * 2)  + 'px',
            'height': (this.walls['wall1']['frames'][id]['height'] - this.walls['wall1']['frames'][id]['border-size'] * 2) + 'px',
            'top': this.walls['wall1']['frames'][id]['border-size'] + 'px',
            'left': this.walls['wall1']['frames'][id]['border-size'] + 'px',
            'padding': (this.walls['wall1']['frames'][id]['padding']) + 'px'
        }

        return style;
    }

    setImageStyle(id:number) {
        let style = {
            'border-radius': this.walls['wall1']['frames'][id]['border-radius'] + '%',
            'width': (this.walls['wall1']['frames'][id]['width'] - this.walls['wall1']['frames'][id]['padding'] * 2 - this.walls['wall1']['frames'][id]['border-size'] * 2)  + 'px',
            'height': (this.walls['wall1']['frames'][id]['height'] - this.walls['wall1']['frames'][id]['padding'] * 2 - this.walls['wall1']['frames'][id]['border-size'] * 2) + 'px',
        }

        return style;
    }

    ngOnInit() { }

}
