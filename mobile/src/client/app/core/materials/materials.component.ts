import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../navigation.service';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.scss']
})

export class MaterialsComponent implements OnInit {
    materials: Material[];
    uploadedMaterials: Material[];
    showUploadedMaterialsModal: boolean = false;

    constructor(private navigationService: NavigationService) {
        this.navigationService.showNavBar = false;
        
        this.materials = [
            new Material("/assets/materials/gold.jpg", "Gold"),
            new Material("/assets/materials/brick.jpg", "Brick"),
            new Material("/assets/materials/iron.jpg", "Iron"),
            new Material("/assets/materials/stone.png", "Stone"),
            new Material("/assets/materials/aqua.jpg", "Aqua"),
            new Material("/assets/materials/lava.jpg", "Lava")
        ];
    }

    ngOnInit() { }

    deleteMaterial(src: string) {
        this.materials = this.materials.filter(function(elem){
            return elem.src != src;
        });
    }

    processFile(imageInput) {
        this.uploadedMaterials = [];
        this.showUploadedMaterialsModal = true;
        
        for(var i = 0; i < imageInput.files.length; i++) {
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                this.uploadedMaterials.push(new Material(event.target.result, ""));
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
        this.showUploadedMaterialsModal = false;
        
        this.uploadedMaterials.forEach(element => {
           this.materials.push(element); 
        });
    }

    cancelUploadMaterials() {
        this.showUploadedMaterialsModal = false;
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
