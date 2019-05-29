import { Component } from '@angular/core';
import { DatabaseService } from '../../database.service';
import {GalleryImage} from './../../galleryImage';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent {
    uploadedImages: GalleryImage[];
    showUploadedImagesModal = false;

    imagesCol = 6;
    types: string[] = [];
    countries: string[] = [];
    cities: string[] = [];

    selectedFiltersCounter = 0;
    selectedTypes: string[] = [];
    selectedCountries: string[] = [];
    selectedCities: string[] = [];
    allGalleryImagesIndexes: number[] = [];
    displayedGalleryImages: number[];

    displayImage = false;
    editImage = false;
    displayedImage: GalleryImage = null;
    galleryImages: GalleryImage[] = [];

    constructor(private databaseService: DatabaseService) {
        this.getImages();
    }

    initFiltering() {
        this.displayedGalleryImages = [];
        for (var i = 0; i < this.databaseService.images.length; i++) {
            this.displayedGalleryImages.push(i);
            this.allGalleryImagesIndexes.push(i);
        }

        this.databaseService.images.forEach(element => {
            var categories = ['types', 'countries', 'cities'];
            var imageField = ['type', 'country', 'city'];
            for (var index in categories) {
                if (this[categories[index]].indexOf(element[imageField[index]]) === -1 && element[imageField[index]] !== '') {
                    this[categories[index]].push(element[imageField[index]]);
                }
            }
        });
    }

    deleteImage(selectedImage: GalleryImage) {
        this.databaseService.deleteImage(selectedImage._id);
        this.getImages();
    }

    changeImagesCol(col: number) {
        this.imagesCol = col;
    }

    selectFilter(arg: string, cat: string) {
        // Select and Store Filter 'arg' to 'cat' category
        var index = this[cat].indexOf(arg);
        if (index === -1) {
            this[cat].push(arg);
            this.selectedFiltersCounter++;
        } else {
            this[cat].splice(index, 1);
            this.selectedFiltersCounter--;
        }

        // Apply filters to displayed images
        if (!this.selectedFiltersCounter) {
            this.displayedGalleryImages = this.allGalleryImagesIndexes;
        } else {
            var flag: boolean;
            this.displayedGalleryImages = [];

            for (var i = 0; i < this.galleryImages.length; i++) {
                flag = false;
                var categories = ['selectedTypes', 'selectedCountries', 'selectedCities'];
                var imageField = ['type', 'country', 'city'];

                for (index in categories) {
                    if (this[categories[index]].length) {
                        var match = this[categories[index]].indexOf(this.galleryImages[i][imageField[index]]);
                        flag = match > -1 ? true : false;
                        if (!flag) {
                            break;
                        }
                    }
                }
                if (flag) {
                    this.displayedGalleryImages.push(i);
                }
            }
        }
    }

    getImages() {
        this.databaseService.getImages().subscribe(
            images => {
                this.galleryImages = images;

                this.displayedGalleryImages = [];
                for (var i = 0; i < this.galleryImages.length; i++) {
                    this.displayedGalleryImages.push(i);
                    this.allGalleryImagesIndexes.push(i);
                }

                this.galleryImages.forEach(element => {
                    var categories = ['types', 'countries', 'cities'];
                    var imageField = ['type', 'country', 'city'];
                    for (var index in categories) {
                        if (this[categories[index]].indexOf(element[imageField[index]]) === -1 && element[imageField[index]] !== '') {
                            this[categories[index]].push(element[imageField[index]]);
                        }
                    }
                });
            }
        );
    }

    displaySelectedImage(selectedImage: GalleryImage, action: string) {
        if (action === 'display') {
            this.displayImage = true;
        } else {
            this.editImage = true;
        }

        this.displayedImage = new GalleryImage( selectedImage._id, selectedImage.title, 
                                                selectedImage.description, selectedImage.src, 
                                                selectedImage.type, selectedImage.country, 
                                                selectedImage.city);

    }

    hideDisplayedImage() {
        this.displayImage = false;
        this.editImage = false;
        this.displayedImage = null;
    }

    saveEditedImage(title: string, description: string, type: string, country: string, city: string) {
        this.databaseService.updateImage(this.displayedImage._id, this.displayedImage.src, title, description, type, country, city);
        this.getImages();
        this.hideDisplayedImage();
    }

    processFile(imageInput) {
        this.uploadedImages = [];
        this.showUploadedImagesModal = true;
        document.body.classList.add('modal-open');

        for (var i = 0; i < imageInput.files.length; i++) {
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                this.uploadedImages.push(new GalleryImage('', '', '', event.target.result, '', '', ''));
            });
            reader.readAsDataURL(file);
        }
    }

    uploadImages() {
        //Mongodb code missed
        this.showUploadedImagesModal = false;
        document.body.classList.remove('modal-open');

        this.uploadedImages.forEach(element => {
            this.databaseService.uploadImage(element.src, element.title, element.description,
                element.type, element.country, element.city)
        });

        this.getImages();
    }

    cancelUploadImages() {
        this.showUploadedImagesModal = false;
        document.body.classList.remove('modal-open');
    }

    deleteUploadedMaterial(src: string) {
        this.uploadedImages = this.uploadedImages.filter(function(elem) {
            return elem.src !== src;
        });
    }

    addUploadedImageTitle(index, event) {
        this.uploadedImages[index].title = event.target.value;
    }

    addUploadedImageDescription(index, event) {
        this.uploadedImages[index].description = event.target.value;
    }

    addUploadedImageType(index, event) {
        this.uploadedImages[index].type = event.target.value;
    }

    addUploadedImageCountry(index, event) {
        this.uploadedImages[index].country = event.target.value;
    }

    addUploadedImageCity(index, event) {
        this.uploadedImages[index].city = event.target.value;
    }
}
