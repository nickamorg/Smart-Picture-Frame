import { Frame } from './frame';

export class Wall {
    _id: string;
    wallSetID: string;
    borderMaterial = '';
    hasMaterial = false;
    borderSize = 0;
    title = '';
    frames: Frame[] = [];
    images: string[] = [];
    displayedImageIndex = 0;
    iterateTime = 0;
    isLocked = false;
    toBeDisplayed = true;

    init(_id, borderMaterial, borderSize, title, iterateTime, isLocked, toBeDisplayed) {
        this._id = _id;
        this.borderMaterial = borderMaterial;
        this.hasMaterial = borderMaterial !== '' ? true : false;
        this.borderSize = borderSize;
        this.title = title;
        this.iterateTime = iterateTime;
        this.isLocked = isLocked;
        this.toBeDisplayed = toBeDisplayed;
    }

    getBorderStyle() {
        let style = {
            'background-size': 'cover',
            'background-color': '#ffffff',
            'width': '1980px',
            'height': '520px'
        };

        if (this.borderMaterial !== '' && this.borderMaterial !== undefined) {
            style['background-image'] = 'url(' + this.borderMaterial + ')';
        }

        return style;
    }

    getWallStyle() {
        let style = {
            'width':  (1980 - (this.hasMaterial ? this.borderSize : 0)) + 'px',
            'height': (520 - (this.hasMaterial ? this.borderSize : 0)) + 'px',
            'top':  ((this.hasMaterial ? this.borderSize : 0) / 2) + 'px',
            'left': ((this.hasMaterial ? this.borderSize : 0) / 2) + 'px',
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
        newWall.iterateTime = this.iterateTime;
        newWall.isLocked = this.isLocked;
        newWall.toBeDisplayed = this.toBeDisplayed;

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
