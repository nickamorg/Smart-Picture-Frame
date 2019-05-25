import { Frame } from "./frame";

export class Wall {
    _id: string;
    wallSetID: string;
    borderMaterial: string;
    hasMaterial = false;
    borderSize: number;
    title: string;
    frames: Frame[] = [];
    images: string[] = [];
    displayedImageIndex = 0;

    init(_id, borderMaterial, borderSize, title) {
        this._id = _id;
        this.borderMaterial = borderMaterial;
        this.borderSize = borderSize;
        this.title = title;
        this.hasMaterial = borderMaterial !== '' ? true : false;
    }

    getBorderStyle() {
        let style = {
            'background-size': 'cover',
            'background-color': '#ffffff',
            'width': '800px',
            'height': '200px'
        };

        if (this.borderMaterial !== '' && this.borderMaterial !== undefined) {
            style['background-image'] = 'url(' + this.borderMaterial + ')';
        }

        return style;
    }

    getWallStyle() {
        let style = {
            'width': (800 - this.borderSize) + 'px',
            'height': (200 - this.borderSize) + 'px',
            'top': (this.borderSize / 2) + 'px',
            'left': (this.borderSize / 2) + 'px',
            'background-color': '#C4C4C4',
            'position': 'relative',
            'background-size': 'cover'
        };

        var wallWallpaper = this.images[this.displayedImageIndex];
        if (wallWallpaper !== '' && wallWallpaper !== undefined) {
            style['background-image'] = 'url(' + wallWallpaper + ')';
        }

        return style;
    }

    copy() {
        var newWall = new Wall();
        newWall.borderMaterial = this.borderMaterial;
        newWall.hasMaterial = this.hasMaterial;
        newWall.borderSize = this.borderSize;
        newWall.displayedImageIndex = this.displayedImageIndex;
        newWall.title = this.title;
        newWall._id = this._id;

        newWall.images = [];
        for (var i = 0; i < this.images.length; i++) {
            newWall.images.push(this.images[i]);
        }

        newWall.frames = [];
        for (i = 0; i < this.frames.length; i++) {
            newWall.frames.push(this.frames[i].copy());
        }

        return newWall;
    }
}