import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss']
})

export class UploadImagesComponent implements OnInit {
    walls: Wall[] = [];
    displayedWall = 0;

    constructor() {

        this.walls.push(
            new Wall('Example glossary', 'Home', 'General', 'Family', 'Just a usual wall',
                10, 'lava.jpg', '#C4C4C4', '#FFFFFF', '20:30', 0.1, 150, 30,
                ['waterfalls.jpg', 'inferno.jpg'], '#FFFFFFF',
                [
                    new Frame(0, 5, 'gold.jpg', 'rgb(34, 0, 78)', 10, 20, 50, 100, 100,
                        ['waterfall1.png', 'waterfall2.png'], 0.1),
                    new Frame(0, 5, 'stone.png', 'rgb(34, 0, 78)', 10, 130, 50, 100, 100,
                        ['waterfall2.png', 'waterfall3.png'], 0.5),
                    new Frame(0, 5, 'brick.jpg', 'rgb(34, 0, 78)', 10, 20, 300, 200, 200,
                        ['waterfall3.png', 'waterfall1.png'], 1),
                    new Frame(100, 5, 'iron.jpg', 'rgb(34, 0, 78)', 15, 50, 600, 150, 150,
                        ['waterfall4.png', 'waterfall3.png'], 1.5)
            ]));

            this.setDisplayedWall(0);
    }

    setBezelsStyle() {
        let style = {
            'background-image': 'url("./assets/materials/' + this.walls[this.displayedWall].borderMaterial + '")',
            'background-color': this.walls[this.displayedWall].borderColor
        };

        return style;
    }

    setWallStyle() {
        let style = {
            'height': 260 - this.walls[this.displayedWall].borderSize * 2 + 'px',
            'width': 990 - this.walls[this.displayedWall].borderSize * 2 + 'px',
            'top': this.walls[this.displayedWall].borderSize + 'px',
            'background-image': 'url("./assets/wallpapers/' + this.walls[this.displayedWall].
                                    wallpapers[this.walls[this.displayedWall].displayedWallpaperIndex] + '")',
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%',
            'background-color': this.walls[this.displayedWall].backgroundColor
        };

        return style;
    }

    setFrameBezelsStyle(id: number) {
        let style = {
            'background-image': 'url("./assets/materials/' + this.walls[this.displayedWall].frames[id].borderMaterial + '")',
            'background-color': this.walls[this.displayedWall].frames[id].borderColor,
            'border-radius': this.walls[this.displayedWall].frames[id].borderRadius + '%',
            'width': this.walls[this.displayedWall].frames[id].width + 'px',
            'height': this.walls[this.displayedWall].frames[id].height + 'px',
            'top': this.walls[this.displayedWall].frames[id].top + 'px',
            'left': this.walls[this.displayedWall].frames[id].left + 'px'
        };

        return style;
    }

    setFrameStyle(id: number) {
        let style = {
            'background-color': 'rgb(255, 255, 255)',
            'border-radius': this.walls[this.displayedWall].frames[id].borderRadius + '%',
            'width': (this.walls[this.displayedWall].frames[id].width - this.walls[this.displayedWall].frames[id].borderSize * 2)  + 'px',
            'height': (this.walls[this.displayedWall].frames[id].height - this.walls[this.displayedWall].frames[id].borderSize * 2) + 'px',
            'top': this.walls[this.displayedWall].frames[id].borderSize + 'px',
            'left': this.walls[this.displayedWall].frames[id].borderSize + 'px',
            'padding': (this.walls[this.displayedWall].frames[id].padding) + 'px'
        };

        return style;
    }

    setImageStyle(id: number) {
        let style = {
            'border-radius': this.walls[this.displayedWall].frames[id].borderRadius + '%',
            'width': (this.walls[this.displayedWall].frames[id].width - this.walls[this.displayedWall].
                frames[id].padding * 2 - this.walls[this.displayedWall].frames[id].borderSize * 2)  + 'px',
            'height': (this.walls[this.displayedWall].frames[id].height - this.walls[this.displayedWall].
                frames[id].padding * 2 - this.walls[this.displayedWall].frames[id].borderSize * 2) + 'px',
        };

        return style;
    }

    setDisplayedWall(index: number) {
        this.displayedWall = index;
    }

    ngOnInit() { }

}

class Wall {
    title = '';
    creator = '';
    type = '';
    target = '';
    description = '';
    borderSize = 0;
    borderMaterial = '';
    borderColor = '';
    backgroundColor = '';
    displayTime = '';
    duration = 0;
    repeatTime = 0;
    wallpaperIterateTime = 0;
    wallpapers: string[] = [];
    color = '';
    frames: Frame[] = [];
    displayedWallpaperIndex = 0;

    constructor(title, creator, type, target, description, borderSize,
                    borderMaterial, borderColor, backgroundColor, displayTime, duration,
                    repeatTime, wallpaperIterateTime, wallpapers, color, frames) {

        this.title = title;
        this.creator = creator;
        this.type = type;
        this.target = target;
        this.description = description;
        this.borderSize = borderSize;
        this.borderMaterial = borderMaterial;
        this.borderColor = borderColor;
        this.backgroundColor = backgroundColor;
        this.displayTime = displayTime;
        this.duration = duration;
        this.repeatTime = repeatTime;
        this.wallpaperIterateTime = wallpaperIterateTime;
        this.wallpapers = wallpapers;
        this.color = color;
        this.frames = frames;

        if (this.wallpapers.length > 0) {
            var self = this;
            setInterval(function() {
                self.displayedWallpaperIndex = ++self.displayedWallpaperIndex % self.wallpapers.length;
            }, self.duration * 60000);
        }
    }
}

class Frame {
    borderRadius = 0;
    borderSize = 0;
    borderMaterial = '';
    borderColor = '';
    padding = 0;
    top = 0;
    left = 0;
    width = 0;
    height = 0;
    images: string[] = [];
    displayedImageIndex = 0;
    iterateTime = 0;

    constructor(borderRadius, borderSize, borderMaterial, borderColor,
                    padding, top, left, width, height, images, iterateTime) {
        this.borderRadius = borderRadius;
        this.borderSize = borderSize;
        this.borderMaterial = borderMaterial;
        this.borderColor = borderColor;
        this.padding = padding;
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.images = images;
        this.iterateTime = iterateTime;

        if (this.images.length > 0) {
            var self = this;
            setInterval(function() {
                self.displayedImageIndex = ++self.displayedImageIndex % self.images.length;
            }, self.iterateTime * 60000);
        }
    }
}
