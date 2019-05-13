import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.scss']
})

export class MaterialsComponent implements OnInit {
    materials: Material[];
    uploadedMaterials: Material[];
    imagesToBeUploaded: boolean = false;

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

    processFile(imageInput) {
        console.log(imageInput);
        this.uploadedMaterials = [];
        this.imagesToBeUploaded = true;
        for(var i = 0; i < imageInput.files.length; i++) {
         
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                //console.log(event.target.result, file)
                this.uploadedMaterials.push(new Material(event.target.result, ""));
                console.log(this.uploadedMaterials.length);
                /*
                this.selectedFile = new ImageSnippet(event.target.result, file);
            
                this.imageService.uploadImage(this.selectedFile.file).subscribe(
                    (res) => {
                    
                    },
                    (err) => {
                    
                })

                */
            });
        
            reader.readAsDataURL(file);
        }
    }

    uploadMaterials() {
        //Mongodb code missed
        this.imagesToBeUploaded = false;
        console.log(this.uploadedMaterials);
    }

    cancelUploadMaterials() {
        this.imagesToBeUploaded = false;
    }

    saveMaterialTitle(index, event) {
        this.uploadedMaterials[index].title = event.target.value;
    }

    deleteUploadedMaterial(src: string) {
        this.uploadedMaterials = this.uploadedMaterials.filter(function(elem){
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
