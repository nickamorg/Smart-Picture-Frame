import { Injectable } from '@angular/core';

var imageID:number = -1;

class Frame {
    borderRadius: number = 0;
    borderSize: number = 0;
    hasMaterial: boolean = false;
    borderMaterial: string = "";
    borderColor: string = "";
    padding: number = 0;
    top: number = 50;
    left: number = 10;
    width: number = 100;
    height: number = 100;
    images: string[] = [];
    displayedImageIndex: number = 0;
    iterateTime: number = 0;

    init(borderRadius, borderSize, borderMaterial, borderColor, 
                padding, top, left, width, height, images, iterateTime) {
        
        this.borderRadius = borderRadius;
        this.borderSize = borderSize;
        this.hasMaterial = borderMaterial !== ''?true:false;
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
}

class FrameImage {
    src:string;
    selected:boolean;
    id: number;

    constructor(src:string) {
        this.src = src;
        this.selected = false;
        this.id = ++imageID;
    }
}

@Injectable()
export class ShapesService {
    frames: Frame[] = [];
    selectedFrame: number = 0;

    frameImages: FrameImage[];
    selectedImages: number;
    imagesCol: number;
    currFrameImages: string[];

    materials: string[];

    constructor() {

        var tmpFrame = new Frame();
        tmpFrame.init(100, 5, "iron.jpg", "rgb(34, 0, 78)", 15, 20, 200, 150, 150,
        ["waterfall4.png", "waterfall3.png"], 30);
        this.frames.push(tmpFrame);

        var tmpFrame = new Frame();
        tmpFrame.init(0, 5, "brick.jpg", "rgb(34, 0, 78)", 10, 50, 400, 100, 100,
        ["waterfall3.png", "waterfall1.png"], 15);
        this.frames.push(tmpFrame);

        this.currFrameImages = [];

        this.frameImages = [new FrameImage("waterfall1.png"),
                            new FrameImage("waterfall2.png"),
                            new FrameImage("waterfall3.png"),
                            new FrameImage("waterfall4.png")];
        this.selectedImages = 0;
        this.imagesCol = 6;

        this.materials = ["aqua.jpg", "lava.jpg", "brick.jpg", "iron.jpg", "stone.png", "gold.jpg"];

    }

    selectImage(id) {
        this.frameImages[id].selected = !this.frameImages[id].selected;
        
        if(this.frameImages[id].selected) { 
            const index = this.currFrameImages.indexOf(this.frameImages[id].src, 0);
            if (index === -1) {
                this.currFrameImages.push(this.frameImages[id].src);
            }
            this.selectedImages++;
        } else {
            const index = this.currFrameImages.indexOf(this.frameImages[id].src, 0);
            if (index > -1) {
                this.currFrameImages.splice(index, 1);
            }
            this.selectedImages--;
        }
    }

    changeImagesCol(col:number) {
        this.imagesCol = col;
    }

    uncheckAllImages() {
        this.selectedImages = 0
        this.currFrameImages = [];
        this.frameImages.forEach(function (value) {
            value.selected = false;
        });
    }

    addSelectedImages() {
        this.frames[this.selectedFrame].images = this.currFrameImages;
    }

    setPosX(posX) {
        this.frames[this.selectedFrame].left = posX;
    }
    
    setPosY(posY) {
        this.frames[this.selectedFrame].top = posY;
    }

    setWidth(width) {
        this.frames[this.selectedFrame].width = width;
    }

    setHeight(height) {
        this.frames[this.selectedFrame].height = height;
    }

    setPadding(padding) {
        this.frames[this.selectedFrame].padding = padding;
    }

    setIterateTime(iterateTime) {
        this.frames[this.selectedFrame].iterateTime = iterateTime;
    }

    setBorderSize(borderSize) {
        this.frames[this.selectedFrame].borderSize = borderSize;
    }

    toggleHasMaterial() {
        // this.frames[this.selectedFrame].hasMaterial = !this.frames[this.selectedFrame].hasMaterial;
    }

    addMaterial(index:number) {
        this.frames[this.selectedFrame].borderMaterial = this.materials[index];
        this.frames[this.selectedFrame].hasMaterial = true;
    }

    returnBazelMaterial() {
        let style = {
            'background-image': 'url("./assets/materials/' + this.frames[this.selectedFrame].borderMaterial + '")',
            'width': '207px',
            'height': '27px'
        }

        return style;
    } 

    setDropDownDisplayedMaterial(index: number) {
        let style = {
            'background-image': 'url("./assets/materials/' + this.materials[index] + '")',
            'width': '207px',
            'height': '27px',
            'margin-left': '10px',
            'margin-bottom': '10px',
            'cursor': 'pointer',
            'padding-bottom': '5px'
        }

        return style;
    }

    setFrameBezelsStyle(index: number) {
        let style = {
            'background-image': 'url("./assets/materials/' + this.frames[index].borderMaterial + '")',
            'background-color': this.frames[index].borderColor,
            'border-radius': this.frames[index].borderRadius + '%',
            'width': this.frames[index].width + 'px',
            'height': this.frames[index].height + 'px',
            'top': this.frames[index].top + 'px',
            'left': this.frames[index].left + 'px'
        };

        if(this.selectedFrame === index) {
            style['box-shadow'] = '0px 0px 0px 5px #30C2FF';
        }

        return style;
    }

    setFrameStyle(id:number) {
        let style = {
            'background-color': 'rgb(255, 255, 255)',
            'border-radius': this.frames[id].borderRadius + '%',
            'width': (this.frames[id].width - this.frames[id].borderSize * 2)  + 'px',
            'height': (this.frames[id].height - this.frames[id].borderSize * 2) + 'px',
            'top': this.frames[id].borderSize + 'px',
            'left': this.frames[id].borderSize + 'px',
            'padding': this.frames[id].padding + 'px'
        }

        return style;
    }

    setImageStyle(id:number) {
        let style = {
            'border-radius': this.frames[id].borderRadius + '%',
            'width': (this.frames[id].width - this.frames[id].padding * 2 - this.frames[id].borderSize * 2)  + 'px',
            'height': (this.frames[id].height - this.frames[id].padding * 2 - this.frames[id].borderSize * 2) + 'px',
        }

        return style;
    }

    focusFrame(index) {
        this.selectedFrame = index;
        this.initCurrFrameImages(index);
    }

    initCurrFrameImages(index: number) {
        this.currFrameImages = this.frames[index].images;
        this.selectedImages = this.currFrameImages.length;

        for (var i = 0; i < this.frameImages.length; i++) {
            this.frameImages[i].selected = false;
            for (var j = 0; j < this.currFrameImages.length; j++) {
                if(this.frameImages[i].src === this.currFrameImages[j]) {
                    this.frameImages[i].selected = true;
                }
            }
        }
    }

    pushFrame(type:string) {
        var newFrame = new Frame();
        newFrame.borderRadius = type === "square_frame"? 0:100;
        this.frames.push(newFrame);
        this.selectedFrame = this.frames.length - 1;
        this.initCurrFrameImages(this.selectedFrame);
    }

    changeDisplayedImage(index: number) {
        this.frames[this.selectedFrame].displayedImageIndex = index;
    }

}