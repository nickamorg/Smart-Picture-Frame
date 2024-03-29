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
    loadedWallSetIndex = 0;
    focusedWallIndex = 0;
    selectedFrame = -1;
    editMode = false;
    isFocusedFrame = false;
    isFocusedWall = true;
    wallImagesCol = 12;
    imagesCol = 6;
    currFrameImages: string[] = [];
    frameImages: string[];
    selectedImages = 0;
    currWallpapers: string[] = [];
    wallpapers: string[] = [];
    selectedWallpapers = 0;

    constructor(private wallDBService: WallDBService, private wallSetDBService: WallSetDBService,
                private frameDBService: FrameDBService, private frameImageDBService: FrameImageDBService,
                private wallImageDBService: WallImageDBService,
                private wallpapersDBService: WallpaperDBService) {
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
            this.frameImages = [];
            this.selectedImages = this.currFrameImages.length;
            this.currFrameImages.forEach(image => {
                this.frameImages.push(image);
            });
    }

    setFrameValue(type, value) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame][type] = value;
    }

    setFrameWidth(value) {
        var wallBorder = this.loadedWallSet.walls[this.focusedWallIndex].hasMaterial ?
                            this.loadedWallSet.walls[this.focusedWallIndex].borderSize : 0;
        var frame = this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame];
        value < 50 ? frame.width = 50 :
        value > 1980 - frame.left - wallBorder ? frame.width = 1980 - frame.left - wallBorder : frame.width = value;
    }

    setFrameHeight(value) {
        var wallBorder = this.loadedWallSet.walls[this.focusedWallIndex].hasMaterial ?
                            this.loadedWallSet.walls[this.focusedWallIndex].borderSize : 0;
        var frame = this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame];
        value < 50 ? frame.height = 50 :
        value > 520 - frame.top - wallBorder ? frame.height = 520 - frame.top - wallBorder : frame.height = value;
    }

    setFrameTop(value) {
        var wallBorder = this.loadedWallSet.walls[this.focusedWallIndex].hasMaterial ?
                            this.loadedWallSet.walls[this.focusedWallIndex].borderSize : 0;
        var frame = this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame];
        value < 0 ? frame.top = 0 :
        value > 520 - frame.height - wallBorder ? frame.top = 520 - frame.height - wallBorder : frame.top = value;
    }

    setFrameLeft(value) {
        var wallBorder = this.loadedWallSet.walls[this.focusedWallIndex].hasMaterial ?
                            this.loadedWallSet.walls[this.focusedWallIndex].borderSize : 0;
        var frame = this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame];
        value < 0 ? frame.left = 0 :
        value > 1980 - frame.width - wallBorder ? frame.left = 1980 - frame.width - wallBorder : frame.left = value;
    }

    setFramePadding(value) {
        var frame = this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame];
        var frameBorder = frame.hasMaterial ? frame.borderSize : 0;
        var minValue = (frame.width < frame.height ? frame.width : frame.height) / 2 - frameBorder;
        frame.padding = value > minValue ? minValue : value;
    }

    setFrameZIndex(value) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].zIndex = value;
    }

    setFrameBorderSize(value) {
        var frame = this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame];
        var minValue = (frame.width < frame.height ? frame.width : frame.height) / 2;
        frame.borderSize = value > minValue ? minValue : value;
    }

    returnBorderMaterial() {
        let style = {
            'background-image': 'url(' + this.loadedWallSet.walls[this.focusedWallIndex].
                                            frames[this.selectedFrame].borderMaterial + ')',
            'width': '100%',
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
            'left': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].left + 'px',
            'z-index': this.loadedWallSet.walls[this.focusedWallIndex].frames[index].zIndex
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
        this.loadedWallSet.walls[this.focusedWallIndex].hasMaterial = true;

        if (this.loadedWallSet.walls[this.focusedWallIndex].borderSize === 0) {
            this.loadedWallSet.walls[this.focusedWallIndex].borderSize = 10;
        }
    }

    removeWallMaterial() {
        this.loadedWallSet.walls[this.focusedWallIndex].borderMaterial = '';
        this.loadedWallSet.walls[this.focusedWallIndex].hasMaterial = false;
        this.loadedWallSet.walls[this.focusedWallIndex].borderSize = 0;
    }

    addFrameMaterial(src: string) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderMaterial = src;
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].hasMaterial = true;

        if (this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderSize === 0) {
            this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderSize = 10;
        }
    }

    removeFrameMaterial() {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderMaterial = '';
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].hasMaterial = false;
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].borderSize = 0;
    }

    returnWallMaterial() {
        let style = {
            'background-image': 'url(' + this.loadedWallSet.walls[this.focusedWallIndex].borderMaterial + ')',
            'width': '100%',
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
            this.wallpapers = [];
            this.selectedWallpapers = this.currWallpapers.length;
            this.currWallpapers.forEach(wallpaper => {
                this.wallpapers.push(wallpaper);
            });
    }

    changeDisplayedWallpaper(index: number) {
        this.loadedWallSet.walls[this.focusedWallIndex].displayedImageIndex = index;
    }

    initNewWall(creator, type, target, title, description) {
        var newWallSet = new WallSet();
        newWallSet.creator = creator;
        newWallSet.type = type;
        newWallSet.target = target;
        newWallSet.title = title;
        newWallSet.description = description;
        newWallSet.active = false;
        newWallSet.walls = [];
        newWallSet.walls.push(new Wall());
        this.wallSets.push(newWallSet);
        this.loadedWallSet = newWallSet.copy();
        this.editMode = true;
        this.loadedWallSetIndex = this.wallSets.length - 1;
        this.focusedWallIndex = 0;

        this.wallSetDBService.uploadWallSet(creator, type, target, title, description, false).subscribe(data => {
            this.loadedWallSet._id = data.json()._id;
            this.wallDBService.uploadWall(data.json()._id).subscribe(data => {
                this.loadedWallSet.walls[0]._id = data.json()._id;
            });
        });
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

        this.wallDBService.uploadWall(this.loadedWallSet._id).subscribe(data => {
            this.loadedWallSet.walls[this.loadedWallSet.walls.length - 1]._id = data.json()._id;
        });
    }

    setCurrWallSetFocusedWallNewTitle(index, title) {
        this.loadedWallSet.walls[index].title = title;
        this.wallDBService.updateWall(  this.loadedWallSet.walls[index]._id, this.loadedWallSet._id,
                                        this.loadedWallSet.walls[index].borderMaterial,
                                        this.loadedWallSet.walls[index].borderSize, title,
                                        this.loadedWallSet.walls[index].iterateTime,
                                        this.loadedWallSet.walls[index].isLocked,
                                        this.loadedWallSet.walls[index].toBeDisplayed);
    }

    saveWall(flag) {
        var wallSetWalls = this.loadedWallSet.walls;
        var editedWall = this.loadedWallSet.walls[this.focusedWallIndex];
        wallSetWalls.forEach(wall => {
            if (wall._id === editedWall._id || flag) {
                if (wall._id === editedWall._id) {
                    wall = editedWall.copy();
                }

                this.wallDBService.updateWall(wall._id, wall.wallSetID,
                    wall.borderMaterial, wall.borderSize, wall.title,
                    wall.iterateTime, wall.isLocked, wall.toBeDisplayed);

                this.wallImageDBService.getWallImages().subscribe(wallpapers => {
                    wallpapers.forEach(wallpaper => {
                        if (wallpaper.wallID === wall._id) {
                            this.wallImageDBService.deleteWallImage(wallpaper._id);
                        }
                    });

                    this.wallpapersDBService.getWallpapers().subscribe(wallpapers => {
                        wallpapers.forEach(wallpaper => {
                            wall.images.forEach(wallImage => {
                                if (wallpaper.src === wallImage) {
                                    this.wallImageDBService.uploadWallImage(wall._id, wallpaper._id);
                                }
                            });
                        });
                    });
                });

                for (var i = 0; i < wall.frames.length; i++) {
                    var frame = wall.frames[i];
                    if (frame._id === undefined) {
                        this.frameDBService.uploadFrame(
                            this.loadedWallSet.walls[this.focusedWallIndex]._id,
                            frame.borderRadius, frame.borderSize, frame.borderMaterial,
                            frame.borderColor, frame.padding, frame.top, frame.left,
                            frame.width, frame.height, frame.iterateTime, frame.interactionType
                        ).subscribe(data => {
                            frame._id = data.json()._id;
                        });
                    } else {
                        this.frameDBService.updateFrame(frame._id, frame.wallID, frame.borderRadius,
                            frame.borderSize, frame.borderMaterial, frame.borderColor, frame.padding,
                            frame.top, frame.left, frame.width, frame.height, frame.iterateTime,
                            frame.zIndex, frame.interactionType);
                    }

                    this.frameImageDBService.getFrameImages().subscribe(images => {
                        images.forEach(image => {
                            if (image.frameID === frame._id) {
                                this.frameImageDBService.deleteFrameImage(image._id);
                            }
                        });
                        frame.images.forEach(image => {
                            this.frameImageDBService.uploadFrameImage(frame._id, image);
                        });
                    });

                }
            }
        });
    }

    saveWallSet() {
        this.wallSets[this.loadedWallSetIndex] = this.loadedWallSet.copy();
        this.saveWall(true);
    }

    isImageSelected(id: string) {
        return this.currFrameImages.indexOf(id) > -1 ? true : false;
    }

    isWallpaperSelected(src: string) {
        return this.currWallpapers.indexOf(src) > -1 ? true : false;
    }

    getWallSets() {
        this.wallSetDBService.getWallSets().subscribe(wallsets => {
            this.wallSets = [];
            wallsets.forEach(wallset => {
                var newWallSet = new WallSet();
                newWallSet.init(wallset._id, wallset.creator, wallset.type, wallset.target,
                                        wallset.title, wallset.description, wallset.active);
                this.wallSets.push(newWallSet);

                this.wallDBService.getWalls().subscribe(walls => {
                    walls.forEach(wall => {
                        if (wall.wallSetID === wallset._id) {
                            var newWall = new Wall();
                            newWall.init(wall._id, wall.borderMaterial, wall.borderSize, wall.title,
                                                wall.iterateTime, wall.isLocked, wall.toBeDisplayed);
                            var wallImages = [];
                            newWall.images = wallImages;
                            newWallSet.walls.push(newWall);

                            this.wallImageDBService.getWallImages().subscribe(wallpapers => {
                                wallpapers.forEach(wallpaper => {
                                    if (wall._id === wallpaper.wallID) {
                                        this.wallpapersDBService.getWallpaper(wallpaper.imageID).subscribe(data=> {
                                            wallImages.push(data.src);
                                        });
                                    }
                                });
                            });

                            this.frameDBService.getFrames().subscribe(frames => {
                                frames.forEach(frame => {
                                    if (frame.wallID === wall._id) {
                                        var newFrame = new Frame();
                                        newFrame.init(frame._id, frame.borderRadius, frame.borderSize,
                                        frame.borderMaterial, 'rgb(34, 0, 78)', frame.padding, frame.top, frame.left,
                                        frame.width, frame.height, frame.iterateTime, frame.zIndex, frame.interactionType);
                                        var frameImages = [];
                                        newFrame.images = frameImages;
                                        newWall.frames.push(newFrame);

                                        this.frameImageDBService.getFrameImages().subscribe(images => {
                                            images.forEach(image => {
                                                if (frame._id === image.frameID) {
                                                    frameImages.push(image.imageID);
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                });
            });
        });
    }

    deleteFocusedFrame() {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].images.forEach(image => {
            this.frameImageDBService.deleteFrameImage(image);
        });
        this.frameDBService.deleteFrame(
            this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame]._id
        );
        this.loadedWallSet.walls[this.focusedWallIndex].frames.splice(
            this.loadedWallSet.walls[this.focusedWallIndex].frames.indexOf(
                this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame]
            ), 1
        );
        this.selectedFrame = -1;
        this.isFocusedFrame = false;
        this.isFocusedWall = true;
    }

    duplicateFocusedFrame() {
        this.loadedWallSet.walls[this.focusedWallIndex].frames.push(
            this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].copy()
        );
        this.selectedFrame = this.loadedWallSet.walls[this.focusedWallIndex].frames.length - 1;
    }

    deleteWall(index) {
        this.loadedWallSet.walls[index].frames.forEach(frame => {
            frame.images.forEach(image => {
                this.frameImageDBService.deleteFrameImage(image);
            });
            this.frameDBService.deleteFrame(frame._id);
        });

        this.wallDBService.deleteWall(this.loadedWallSet.walls[index]._id);
        this.loadedWallSet.walls.splice(
            this.loadedWallSet.walls.indexOf(this.loadedWallSet.walls[index]), 1
        );
    }

    toggleWallLocked() {
        this.loadedWallSet.walls[this.focusedWallIndex].isLocked = !this.loadedWallSet.walls[this.focusedWallIndex].isLocked;
    }
    isWallLocked() {
        return this.loadedWallSet.walls[this.focusedWallIndex].isLocked;
    }

    toggleWallToBeDisplayed() {
        this.loadedWallSet.walls[this.focusedWallIndex].toBeDisplayed = !this.loadedWallSet.walls[this.focusedWallIndex].toBeDisplayed;
    }

    wallToBeDisplayed() {
        return this.loadedWallSet.walls[this.focusedWallIndex].toBeDisplayed;
    }

    selectFrameInteraction(value) {
        this.loadedWallSet.walls[this.focusedWallIndex].frames[this.selectedFrame].interactionType = value;
    }

    getCurrentDay() {
        return (new Date()).getDate();
    }

    getCurrentMonth() {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ];

        return monthNames[(new Date()).getMonth()];
    }

    updateWallSet(index) {
        this.wallSetDBService.updateWallSet(
            this.wallSets[index]._id, this.wallSets[index].creator,
            this.wallSets[index].type, this.wallSets[index].target,
            this.wallSets[index].title, this.wallSets[index].description,
            this.wallSets[index].active
        );
    }
}
