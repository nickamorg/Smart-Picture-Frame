import { Component } from '@angular/core';
import { MaterialDBService } from '../../materialDB.service';
import { Material } from './../../material';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.scss']
})

export class MaterialsComponent {
    materials: Material[] = [];
    uploadedMaterials: Material[];
    showUploadedMaterialsModal = false;

    constructor(private materialDBService: MaterialDBService) {
        this.getMaterials();
    }

    getMaterials() {
        this.materialDBService.getMaterials().subscribe(
            materials => {
                this.materials = materials;
            }
        );
    }

    deleteMaterial(selectedMaterial: Material) {
        this.materialDBService.deleteMaterial(selectedMaterial._id);
        this.getMaterials();
    }

    processFile(imageInput) {
        this.uploadedMaterials = [];
        this.showUploadedMaterialsModal = true;

        for (var i = 0; i < imageInput.files.length; i++) {
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                this.uploadedMaterials.push(new Material('', '', event.target.result));
            });
            reader.readAsDataURL(file);
        }
    }

    uploadMaterials() {
        this.showUploadedMaterialsModal = false;

        this.uploadedMaterials.forEach(element => {
            this.materialDBService.uploadMaterial(element.src, element.title);
        });
        
        this.getMaterials();
    }

    cancelUploadMaterials() {
        this.showUploadedMaterialsModal = false;
    }

    saveMaterialTitle(index, event) {
        this.uploadedMaterials[index].title = event.target.value;
    }

    deleteUploadedMaterial(src: string) {
        this.uploadedMaterials = this.uploadedMaterials.filter(function(elem) {
            return elem.src !== src;
        });
    }
}
