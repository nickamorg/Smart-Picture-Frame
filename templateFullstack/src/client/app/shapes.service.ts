import { Injectable } from '@angular/core';

var counter:number = -1;

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
        return style;
    }

    tellme() {
        this.top += 10;
    }
}

@Injectable()
export class ShapesService {
    shapes: Shape[];
    
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

    constructor() { 
        this.id = 0;
        this.shapes = [new Shape("square_frame")];
        this.top = 50;
        this.left = 10;
        this.width = 100;
        this.height = 100;
        this.hasBazels = false;
        this.bazelMaterial = "";
    }

    focusShape(id) {
        this.id = id;
        console.log("xaxa  " + id);
        this.shapes[id].top += 10;
        this.top = this.shapes[id].top;
        this.left = this.shapes[id].left;
        this.width = this.shapes[id].width;
        this.height = this.shapes[id].height;
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