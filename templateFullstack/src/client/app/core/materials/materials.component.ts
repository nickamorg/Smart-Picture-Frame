import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.scss']
})

export class MaterialsComponent implements OnInit {
    materials: Material[];

    constructor() { 
        this.materials = [
            new Material("gold.jpg", "Gold"),
            new Material("brick.jpg", "Brick"),
            new Material("iron.jpg", "Iron"),
            new Material("stone.png", "Stone"),
            new Material("aqua.jpg", "Aqua"),
            new Material("lava.jpg", "Lava")
        ];
    }

    ngOnInit() { }

    deleteMaterial(src: string) {
        this.materials = this.materials.filter(function(elem){
            return elem.src != src;
        });
    }
}

class Material {
    src: string;
    title: string;

    constructor(src: string, title: string) {
        this.src = src;
        this.title = title;
    }
}
