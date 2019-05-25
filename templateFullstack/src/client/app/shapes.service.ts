import { Injectable } from '@angular/core';
import { WallSetDBService } from './wallSetDB.service';
import { WallDBService } from './wallDB.service';
import { FrameDBService } from './frameDB.service';
import { FrameImageDBService } from './frameImageDB.service';
import { WallImageDBService } from './wallImageDB.service';
import { WallpaperDBService } from './wallpaperDB.service';
import { WallSet } from './wallSet';
import { Frame } from './frame';
import { Wall } from './wall';

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
    wallImagesCol = 12;
    displayedWallImageIndex = 0;
    editMode = false;
    currWallpapers:  string[] = [];
    selectedWallpapers = 0;

    feedInit() {
        // var tmpFrame = new Frame();
        // tmpFrame.init(100, 5, './assets/materials/gold.jpg', 'rgb(34, 0, 78)', 15, 20, 200, 150, 150,
        // ['5ce50fcce2c5662518b5f3a0', '5ce50fd0e2c5662518b5f3a1'], 30);

        // var tmpFrame1 = new Frame();
        // tmpFrame1.init(0, 5, './assets/materials/brick.jpg', 'rgb(34, 0, 78)', 10, 50, 400, 100, 100,
        // ['5ce50fc6e2c5662518b5f39f', '5ce50fb9e2c5662518b5f39e'], 15);

        // var tmpFrames = [];
        // tmpFrames.push(tmpFrame);
        // tmpFrames.push(tmpFrame1);

        // var images = [ './assets/wallpapers/inferno.jpg', './assets/wallpapers/waterfalls.jpg'];
        // var tmpWall = new Wall();
        // tmpWall.init('./assets/materials/lava.jpg', 10, tmpFrames, images, 'Waterfalls Display');

        // this.wallSets.push(new WallSet());
        // this.wallSets[0].init([tmpWall, tmpWall], 'Home', 'General', 'Family', 'Title', 'There is no description');
        // this.wallSets.push(new WallSet());
        // this.wallSets[1].init([tmpWall, tmpWall], 'Home', 'General', 'Family', 'Title', 'There is no description');

        // this.loadedWallSet = this.wallSets[0].copy();
    }

    constructor(private wallDBService: WallDBService, private wallSetDBService: WallSetDBService,
                private frameDBService: FrameDBService, private frameImageDBService: FrameImageDBService, 
                private wallImageDBService: WallImageDBService, 
                private wallpapersDBService: WallpaperDBService) {
        this.feedInit();
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
        this.frameDBService.uploadFrame(
            this.wallDBService.currWallsID[this.focusedWallIndex],
            newFrame.borderRadius,
            newFrame.borderSize,
            newFrame.borderMaterial,
            newFrame.borderColor,
            newFrame.padding,
            newFrame.top,
            newFrame.left,
            newFrame.width,
            newFrame.height,
            newFrame.iterateTime
        );
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
        
        this.wallSetDBService.uploadWallSet(creator, type, target, title, description);
        this.wallDBService.currWallsID = [];
        this.frameDBService.currFramesID = [];
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
        console.log(this.wallSetDBService.currWallSetID);
        this.wallDBService.updateWall(  this.wallSetDBService.currWallSetID, this.wallDBService.currWallsID[index],
                                        this.loadedWallSet.walls[index].borderMaterial,
                                        this.loadedWallSet.walls[index].borderSize, title);
    }

    saveWall() {
        var wallSetWalls = this.wallSets[this.loadedWallSetIndex].walls;
        var editedWall = this.loadedWallSet.walls[this.focusedWallIndex];
        for (var i = 0; i < wallSetWalls.length; i++) {
            if (wallSetWalls[i]._id === editedWall._id) {
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

    getWallSets() {
        this.wallSetDBService.getWallSets().subscribe(wallsets => {
            wallsets.forEach(wallset => {
                var newWallSet = new WallSet();
                newWallSet.init(wallset._id, wallset.creator, wallset.type,
                                        wallset.target, wallset.title, wallset.description);
                this.wallSets.push(newWallSet);

                this.wallDBService.getWalls().subscribe(walls => {
                    walls.forEach(wall => {
                        if (wall.wallSetID === wallset._id) {
                            var newWall = new Wall();
                            newWall.init(wall._id, wall.borderMaterial, wall.borderSize, wall.title);
                            var wallImages = [];
                            newWall.images = wallImages;
                            newWallSet.walls.push(newWall);

                            this.wallImageDBService.getWallImages().subscribe(wallpapers => {
                                wallpapers.forEach(wallpaper => {
                                    if (wall._id === wallpaper.wallID) {
                                        this.wallpapersDBService.getWallpaper(wallpaper.imageID).subscribe(data=> {
                                            wallImages.push(data.src);
                                        })
                                        
                                    }
                                });
                            })

                            this.frameDBService.getFrames().subscribe(frames => {
                                frames.forEach(frame => {
                                    if (frame.wallID === wall._id) {
                                        var newFrame = new Frame();
                                        newFrame.init(frame._id, frame.borderRadius, frame.borderSize, 
                                        frame.borderMaterial, 'rgb(34, 0, 78)', frame.padding, 
                                        frame.top, frame.left, frame.width, frame.height, 30);
                                        var frameImages = [];
                                        newFrame.images = frameImages;
                                        newWall.frames.push(newFrame);

                                        this.frameImageDBService.getFrameImages().subscribe(images => {
                                            images.forEach(image => {
                                                if (frame._id === image.frameID) {
                                                    frameImages.push(image.imageID);
                                                }
                                            });
                                        })
                                    }
                                    console.log("LEVEL 4   " + frame._id);
                                });
                                console.log("LEVEL 3   " + wall._id);
                            })
                        }
                    });
                    console.log("LEVEL 2   " + wallset._id);
                })
            });
            console.log("LEVEL 1", this.wallSets);
        })
        // var tmpFrame = new Frame();
        // tmpFrame.init(100, 5, './assets/materials/gold.jpg', 'rgb(34, 0, 78)', 15, 20, 200, 150, 150,
        // ['5ce50fcce2c5662518b5f3a0', '5ce50fd0e2c5662518b5f3a1'], 30);

        // var tmpFrame1 = new Frame();
        // tmpFrame1.init(0, 5, './assets/materials/brick.jpg', 'rgb(34, 0, 78)', 10, 50, 400, 100, 100,
        // ['5ce50fc6e2c5662518b5f39f', '5ce50fb9e2c5662518b5f39e'], 15);

        // var tmpFrames = [];
        // tmpFrames.push(tmpFrame);
        // tmpFrames.push(tmpFrame1);

        // var images = [ './assets/wallpapers/inferno.jpg', './assets/wallpapers/waterfalls.jpg'];
        // var tmpWall = new Wall();
        // tmpWall.init('./assets/materials/lava.jpg', 10, tmpFrames, images, 'Waterfalls Display');

        // this.wallSets.push(new WallSet());
        // this.wallSets[0].init([tmpWall, tmpWall], 'Home', 'General', 'Family', 'Title', 'There is no description');
        // this.wallSets.push(new WallSet());
        // this.wallSets[1].init([tmpWall, tmpWall], 'Home', 'General', 'Family', 'Title', 'There is no description');

        // this.loadedWallSet = this.wallSets[0].copy();
    }
}

function IDgenerator() {
    var S4 = function() {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
