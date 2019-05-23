import { Injectable } from '@angular/core';

var imageID = -1;
var wallImageID = -1;

class Frame {
    borderRadius = 0;
    borderSize = 0;
    hasMaterial = false;
    borderMaterial = '';
    borderColor = '';
    padding = 0;
    top = 50;
    left = 10;
    width = 100;
    height = 100;
    images: string[] = [];
    displayedImageIndex = 0;
    iterateTime = 0;
    id: string = IDgenerator();

    init(borderRadius, borderSize, borderMaterial, borderColor,
                padding, top, left, width, height, images, iterateTime) {

        this.borderRadius = borderRadius;
        this.borderSize = borderSize;
        this.hasMaterial = borderMaterial !== '' ? true : false;
        this.borderMaterial = borderMaterial;
        this.borderColor = borderColor;
        this.padding = padding;
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.images = images;
        this.iterateTime = iterateTime;
    }

    getFrameBorderStyle(index: number) {
        let style = {
            'background-color': this.borderColor,
            'border-radius': this.borderRadius + '%',
            'width': this.width + 'px',
            'height': this.height + 'px',
            'top': this.top + 'px',
            'left': this.left + 'px'
        };

        if (this.borderMaterial !== '' && this.borderMaterial !== undefined) {
            style['background-image'] = 'url(' + this.borderMaterial + ')';
        }

        return style;
    }

    getFrameStyle() {
        let style = {
            'background-color': 'rgb(255, 255, 255)',
            'border-radius': this.borderRadius + '%',
            'width': (this.width - this.borderSize * 2)  + 'px',
            'height': (this.height - this.borderSize * 2) + 'px',
            'top': this.borderSize + 'px',
            'left': this.borderSize + 'px',
            'padding': this.padding + 'px'
        };

        return style;
    }

    getFirstImageStyle() {
        let style = {
            'border-radius': this.borderRadius + '%',
            'width': (this.width - this.padding * 2 - this.borderSize * 2)  + 'px',
            'height': (this.height - this.padding * 2 - this.borderSize * 2) + 'px',
            'top': this.borderSize + 'px',
            'left': this.borderSize + 'px'
        };

        return style;
    }

    copy() {
        var newFrame = new Frame();
        newFrame.borderRadius = this.borderRadius;
        newFrame.borderSize = this.borderSize;
        newFrame.hasMaterial = this.hasMaterial;
        newFrame.borderMaterial = this.borderMaterial;
        newFrame.borderColor = this.borderColor;
        newFrame.borderColor = this.borderColor;
        newFrame.padding = this.padding;
        newFrame.top = this.top;
        newFrame.left = this.left;
        newFrame.width = this.width;
        newFrame.id = this.id;
        newFrame.height = this.height;
        newFrame.displayedImageIndex = this.displayedImageIndex;
        newFrame.iterateTime = this.iterateTime;

        newFrame.images = [];
        for (var i = 0; i < this.images.length; i++) {
            newFrame.images.push(this.images[i]);
        }

        return newFrame;
    }
}

class FrameImage {
    src: string;
    selected: boolean;
    id: number;

    constructor(src: string) {
        this.src = src;
        this.selected = false;
        this.id = ++imageID;
    }
}

class WallImage {
    src: string;
    selected: boolean;
    id: number;

    constructor(src: string) {
        this.src = src;
        this.selected = false;
        this.id = ++wallImageID;
    }
}

class Wall {
    borderMaterial = '';
    hasMaterial = false;
    borderSize = 0;
    frames: Frame[] = [];
    images: string[] = [];
    displayedImageIndex = 0;
    title = '';
    id: string = IDgenerator();

    init(borderMaterial, borderSize, frames, images, title) {
        this.borderMaterial = borderMaterial;
        this.borderSize = borderSize;
        this.frames = frames;
        this.images = images;
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
        newWall.id = this.id;

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

class WallSet {
    walls: Wall[] = [];
    creator = '';
    type = '';
    target = '';
    title = '';
    description = '';
    id: string = IDgenerator();

    init(walls, creator, type, target, title, description) {
        this.walls = walls;
        this.creator = creator;
        this.type = type;
        this.target = target;
        this.title = title;
        this.description = description;
    }

    copy() {
        var newWallSet = new WallSet();
        newWallSet.creator = this.creator;
        newWallSet.type = this.type;
        newWallSet.target = this.target;
        newWallSet.title = this.title;
        newWallSet.description = this.description;
        newWallSet.id = this.id;

        newWallSet.walls = [];
        for (var i = 0; i < this.walls.length; i++) {
            newWallSet.walls.push(this.walls[i].copy());
        }

        return newWallSet;
    }
}

@Injectable()
export class ShapesService {
    wallSets: WallSet[] = [];
    loadedWallSet: WallSet;
    focusedWallIndex = 0;
    loadedWallSetIndex = 0;
    wallMaterial = '';
    hasWallMaterial = false;
    wallBorderSize = 0;
    frames: Frame[] = [];
    selectedFrame = -1;
    frameImages: string[];
    selectedImages = 0;
    imagesCol = 6;
    currFrameImages: string[] = [];
    isFocusedFrame = false;
    isFocusedWall = true;
    wallImages: WallImage[];
    wallImagesCol = 12;
    displayedWallImageIndex = 0;
    editMode = false;
    currWallpapers:  string[] = [];
    selectedWallpapers = 0;

    feedInit() {
        var tmpFrame = new Frame();
        tmpFrame.init(100, 5, './assets/materials/gold.jpg', 'rgb(34, 0, 78)', 15, 20, 200, 150, 150,
        ['5ce50fcce2c5662518b5f3a0', '5ce50fd0e2c5662518b5f3a1'], 30);

        var tmpFrame1 = new Frame();
        tmpFrame1.init(0, 5, './assets/materials/brick.jpg', 'rgb(34, 0, 78)', 10, 50, 400, 100, 100,
        ['5ce50fc6e2c5662518b5f39f', '5ce50fb9e2c5662518b5f39e'], 15);

        var tmpFrames = [];
        tmpFrames.push(tmpFrame);
        tmpFrames.push(tmpFrame1);

        var images = [ './assets/wallpapers/inferno.jpg', './assets/wallpapers/waterfalls.jpg'];
        var tmpWall = new Wall();
        tmpWall.init('./assets/materials/lava.jpg', 10, tmpFrames, images, 'Waterfalls Display');

        this.wallSets.push(new WallSet());
        this.wallSets[0].init([tmpWall, tmpWall], 'Home', 'General', 'Family', 'Title', 'There is no description');
        this.wallSets.push(new WallSet());
        this.wallSets[1].init([tmpWall, tmpWall], 'Home', 'General', 'Family', 'Title', 'There is no description');

        this.loadedWallSet = this.wallSets[0].copy();
    }

    constructor() {
        this.feedInit();

        this.wallImages = [ new WallImage('inferno.jpg'),
                            new WallImage('waterfalls.jpg')];
    }

    selectImage(id) {
        const index = this.currFrameImages.indexOf(id, 0);
        if (index === -1) {
            this.currFrameImages.push(id);
            this.selectedImages++;
        } else {
            this.currFrameImages.splice(index, 1);
            this.selectedImages--;
        }
    }

    selectWallpaper(src) {
        const index = this.currWallpapers.indexOf(src, 0);
        if (index === -1) {
            this.currWallpapers.push(src);
            this.selectedWallpapers++;
        } else {
            this.currWallpapers.splice(index, 1);
            this.selectedWallpapers--;
        }
    }

    changeImagesCol(col: number) {
        this.imagesCol = col;
    }

    uncheckAllImages() {
        this.selectedImages = 0;
        this.currFrameImages = [];
    }

    addSelectedImages() {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].images = this.currFrameImages;
    }

    setPosX(posX) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].left = posX;
    }

    setPosY(posY) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].top = posY;
    }

    setWidth(width) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].width = width;
    }

    setHeight(height) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].height = height;
    }

    setPadding(padding) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].padding = padding;
    }

    setIterateTime(iterateTime) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].iterateTime = iterateTime;
    }

    setBorderSize(borderSize) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderSize = borderSize;
    }

    returnBorderMaterial() {
        let style = {
            'background-image': 'url(' + this.loadedWallSet.walls[this.focusedWallIndex].
                                            frames[this.selectedFrame].borderMaterial + ')',
            'width': '207px',
            'height': '27px'
        };

        return style;
    }

    setFrameBorderStyle(index: number) {
        let style = {
            'background-color': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].borderColor,
            'border-radius': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].borderRadius + '%',
            'width': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].width + 'px',
            'height': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].height + 'px',
            'top': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].top + 'px',
            'left': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].left + 'px'
        };

        var frameBorderMaterial = this.loadedWallSet.walls[this.focusedWallIndex].frames[index].borderMaterial;
        if (frameBorderMaterial !== '' && frameBorderMaterial !== undefined) {
            style['background-image'] = 'url(' + frameBorderMaterial + ')';
        }

        if (this.selectedFrame === index) {
            style['box-shadow'] = '0px 0px 0px 5px #30C2FF';
        }

        return style;
    }

    setFrameStyle(id: number) {
        let style = {
            'background-color': 'rgb(255, 255, 255)',
            'border-radius': this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderRadius + '%',
            'width': (this.loadedWallSet.walls[this.focusedWallIndex].frames[id].width -
                this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderSize * 2)  + 'px',
            'height': (this.loadedWallSet.walls[this.focusedWallIndex].frames[id].height -
                this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderSize * 2) + 'px',
            'top': this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderSize + 'px',
            'left': this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderSize + 'px',
            'padding': this.loadedWallSet.walls[this.focusedWallIndex].frames[id].padding + 'px'
        };

        return style;
    }

    setImageStyle(id: number) {
        let style = {
            'border-radius': this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderRadius + '%',
            'width': (this.loadedWallSet.walls[this.focusedWallIndex].frames[id].width -
                this.loadedWallSet.walls[this.focusedWallIndex].frames[id].padding * 2 -
                this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderSize * 2)  + 'px',
            'height': (this.loadedWallSet.walls[this.focusedWallIndex].frames[id].height -
                this.loadedWallSet.walls[this.focusedWallIndex].frames[id].padding * 2 -
                this.loadedWallSet.walls[this.focusedWallIndex].frames[id].borderSize * 2) + 'px',
        };

        return style;
    }

    focusFrame(index) {
        this.isFocusedFrame = true;
        this.isFocusedWall = false;
        this.selectedFrame = index;
        this.initCurrFrameImages(index);
    }

    initCurrFrameImages(index: number) {
        this.currFrameImages = this.loadedWallSet.walls[this.focusedWallIndex].frames[index].images;
        this.frameImages = [];
        this.selectedImages = this.currFrameImages.length;

        for (var i = 0; i < this.currFrameImages.length; i++) {
            this.frameImages.push(this.currFrameImages[i]);
        }
    }

    pushFrame(type: string) {
        this.isFocusedFrame = true;
        this.isFocusedWall = false;
        var newFrame = new Frame();
        newFrame.borderRadius = type === 'square_frame' ? 0 : 100;
        this.loadedWallSet.walls[this.focusedWallIndex].frames.push(newFrame);
        this.selectedFrame = this.loadedWallSet.walls[this.focusedWallIndex].frames.length - 1;
        this.initCurrFrameImages(this.selectedFrame);
    }

    changeDisplayedImage(index: number) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].displayedImageIndex = index;
    }

    focusWall() {
        if (!this.editMode) {
            return;
        }

        this.isFocusedFrame = false;
        this.isFocusedWall = true;
        this.selectedFrame = null;
    }

    setWallStyle() {
        let style = {
            'width':  (800 - this.loadedWallSet.walls[this.focusedWallIndex].borderSize) + 'px',
            'height': (200 - this.loadedWallSet.walls[this.focusedWallIndex].borderSize) + 'px',
            'top': (this.loadedWallSet.walls[this.focusedWallIndex].borderSize / 2) + 'px',
            'left': (this.loadedWallSet.walls[this.focusedWallIndex].borderSize / 2) + 'px',
            'background-color': '#C4C4C4',
            'position': 'absolute',
            'background-size': 'cover'
        };

        var wallWallpaper = this.loadedWallSet.walls[this.focusedWallIndex].images[this.loadedWallSet.
                                                    walls[this.focusedWallIndex].displayedImageIndex];
        if (wallWallpaper !== '' && wallWallpaper !== undefined) {
            style['background-image'] = 'url(' + wallWallpaper + ')';
        }

        return style;
    }

    setWallBorderStyle() {
        if (!this.editMode) {
            return undefined;
        }

        let style = {
            'background-size': 'cover',
            'background-color': '#ffffff'
        };

        var wallBorderMaterial = this.loadedWallSet.walls[this.focusedWallIndex].borderMaterial;
        if (wallBorderMaterial !== '' && wallBorderMaterial !== undefined) {
            style['background-image'] = 'url(' + wallBorderMaterial + ')';
        }

        if (this.isFocusedWall) {
            style['box-shadow'] = '0px 0px 0px 5px #30C2FF';
        }

        return style;
    }

    addWallMaterial(src: string) {
        this.loadedWallSet.walls[this.focusedWallIndex].borderMaterial = src;
        this.hasWallMaterial = true;
    }

    

    addFrameMaterial(src: string) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderMaterial = src;
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].hasMaterial = true;
    }

    returnWallMaterial() {
        let style = {
            'background-image': 'url(' + this.loadedWallSet.walls[this.focusedWallIndex].borderMaterial + ')',
            'width': '190px',
            'height': '27px'
        };

        return style;
    }

    setWallBorderSize(borderSize) {
        this.loadedWallSet.walls[this.focusedWallIndex].borderSize = borderSize;
    }

    changeWallImagesCol(col: number) {
        this.wallImagesCol = col;
    }

    uncheckAllWallpapers() {
        this.selectedWallpapers = 0;
        this.currWallpapers = [];
    }

    addSelectedWallpapers() {
            this.loadedWallSet.walls[this.focusedWallIndex].images = this.currWallpapers;
            console.log(this.loadedWallSet.walls[this.focusedWallIndex].images);
    }

    changeDisplayedWallImage(index: number) {
        this.loadedWallSet.walls[this.focusedWallIndex].displayedImageIndex = index;
    }

    initNewWall(creator, type, target, title, description) {
        var newWallSet = new WallSet();
        newWallSet.creator = creator;
        newWallSet.type = type;
        newWallSet.target = target;
        newWallSet.title = title;
        newWallSet.description = description;
        newWallSet.walls = [];
        newWallSet.walls.push(new Wall());
        this.wallSets.push(newWallSet);
        this.loadedWallSet = newWallSet.copy();
        this.editMode = true;
        this.loadedWallSetIndex = this.wallSets.length - 1;
        this.focusedWallIndex = 0;
    }

    setWallTitleStyle(index) {
        return this.focusedWallIndex === index ?
        {'background-color': '#30C2FF', 'color': 'white'} :
        {'background-color': '#F5F5F5', 'color': 'black'};
    }

    selectCurrWallSetFocusedWall(index) {
        this.focusedWallIndex = index;
        this.isFocusedWall = true;
        this.isFocusedFrame = false;
        this.selectedFrame = -1;
    }

    addCurrWallSetWall() {
        var flag = false;
        this.loadedWallSet.walls.forEach(element => {
            if (element.title === '') {
                flag = true;
            }
        });

        if (!flag) {
            this.loadedWallSet.walls.push(new Wall());
        }
        this.selectCurrWallSetFocusedWall(this.loadedWallSet.walls.length - 1);
    }

    setCurrWallSetFocusedWallNewTitle(index, title) {
        this.loadedWallSet.walls[index].title = title;
    }

    saveWall() {
        var wallSetWalls = this.wallSets[this.loadedWallSetIndex].walls;
        var editedWall = this.loadedWallSet.walls[this.focusedWallIndex];
        for (var i = 0; i < wallSetWalls.length; i++) {
            if (wallSetWalls[i].id === editedWall.id) {
                wallSetWalls[i] = editedWall.copy();
            }
        }
    }

    saveWallSet() {
        this.wallSets[this.loadedWallSetIndex] = this.loadedWallSet.copy();
    }

    isImageSelected(id: string) {
        return this.currFrameImages.indexOf(id) > -1 ? true : false;
    }

    isWallpaperSelected(src: string) {
        return this.currWallpapers.indexOf(src) > -1 ? true : false;
    }
}

function IDgenerator() {
    var S4 = function() {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
