import { Injectable } from '@angular/core';
import { l } from '@angular/core/src/render3';

var counter:number = -1;
var imageID:number = -1;

class Shape {
    
    padding: number;
    id: number;
    type: string;
    backgroundColor: string;
    top: number;
    left: number;
    width: number;
    height: number;
    hasBazels: boolean;
    bazelMaterial: string;
    frameImages: string[];

    constructor(type:string) {
        counter++;
        this.padding = 0;
        this.top = 50;
        this.left = 10;
        this.width = 100;
        this.height = 100;
        this.backgroundColor = randomColor();
        this.type = type;
        this.id = counter;
        this.hasBazels = false;
        this.bazelMaterial = "";

        this.frameImages = [];

        console.log("NEW SHAPE  " + this.id);
    }

    setStyle() {
        let style = {
            'background-color': this.backgroundColor,
            'top': this.top + 'px',
            'left': this.left + 'px',
            'width': this.width + 'px',
            'height': this.height + 'px'
        };

        if(this.bazelMaterial !== "") {
            let bazel_img_url = "/assets/materials/" + this.bazelMaterial + ".png";
            
            style["border"] = "10px solid transparent";
            style["border-image"] = "url('" + bazel_img_url + "') 13";
        }
        return style;
    }

    tellme() {
        this.top += 10;
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
    shapes: Shape[];
    frameImages: FrameImage[];
    selectedImages: number;
    imagesCol: number;

    padding: number;
    id: number;
    type: string;
    backgroundColor: string;
    top: number;
    left: number;
    width: number;
    height: number;
    hasBazels: boolean;
    bazelMaterial: string;
    currFrameImages: string[];

    constructor() { 
        this.id = 0;
        this.shapes = [new Shape("square_frame")];
        this.top = 50;
        this.left = 10;
        this.width = 100;
        this.height = 100;
        this.hasBazels = false;
        this.bazelMaterial = "";
        this.currFrameImages = [];

        this.frameImages = [new FrameImage("waterfall1.png"),
                            new FrameImage("waterfall2.png"),
                            new FrameImage("waterfall3.png"),
                            new FrameImage("waterfall4.png")];
        this.selectedImages = 0;
        this.imagesCol = 6;

    }

    focusShape(id) {
        this.id = id;
        console.log("xaxa  " + id);
        this.shapes[id].top += 10;
        this.top = this.shapes[id].top;
        this.left = this.shapes[id].left;
        this.width = this.shapes[id].width;
        this.height = this.shapes[id].height;
        this.currFrameImages = this.shapes[id].frameImages;
        this.selectedImages = this.currFrameImages.length;
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
        this.frameImages.forEach(function (value) {
            value.selected = false;
        });

        this.selectedImages = 0;
    }

    addSelectedImages() {
        this.shapes[this.id].frameImages = this.currFrameImages;
        console.log(this.currFrameImages);
    }

    pushShape(type:string) {
        this.shapes.push(new Shape(type));

        this.padding = 0;
        this.top = 50;
        this.left = 10;
        this.width = 100;
        this.height = 100;
        this.backgroundColor = randomColor();
        this.type = type;
        this.id = counter;
        this.hasBazels = false;
        this.bazelMaterial = "";
        this.currFrameImages = [];
    }

    setPosX(posX) {
        posX = parseInt(posX);
        
        console.log(this.id);
        this.left = posX;
        this.shapes[this.id].left = posX;
        console.log("TEST");
    }
    
    setPosY(posY) {
        posY = parseInt(posY);
        
        console.log(this.id);
        this.top = posY;
        this.shapes[this.id].top = posY;
        console.log("TEST");
    }

    setWidth(width) {
        width = parseInt(width);
        
        console.log(this.id);
        this.width = width;
        this.shapes[this.id].width = width;
        console.log("TEST");
    }

    setHeight(height) {
        height = parseInt(height);
        
        console.log(this.id);
        this.height = height;
        this.shapes[this.id].height = height;
        console.log("TEST");
    }

    toggleHasBazels() {
        this.shapes[this.id].hasBazels = !this.hasBazels;
        this.hasBazels = !this.hasBazels;
    }

    addMaterial(mat:string) {
        this.bazelMaterial = mat;
        this.shapes[this.id].bazelMaterial = mat;
    }
}

function randomColor():string {
    return '#' + (function co(lor){   return (lor +=
        [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
        && (lor.length == 6) ?  lor : co(lor); })('');
}