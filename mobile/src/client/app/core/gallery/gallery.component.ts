import { Component, OnInit, ɵConsole } from '@angular/core';
import { NavigationService } from '../../navigation.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
    uploadedImages: Image[];
    uploadedImagesEditIndex: number = 0;
    showUploadedImagesModal: boolean = false;
    showFiltersModal: boolean = false;

    imagesCol: number = 6;
    galleryImages: Image[];
    types: string[] = [];
    countries: string[] = [];
    cities: string[] = [];

    selectedFiltersCounter: number = 0;
    selectedTypes: string[] = [];
    selectedCountries: string[] = [];
    selectedCities: string[] = [];
    allGalleryImagesIndexes: number[];
    displayedGalleryImages: number[];

    displayImage: boolean = false;
    editImage: boolean = false;
    displayedImage: Image = null;

    constructor(private navigationService: NavigationService) {
        this.navigationService.showNavBar = false;
        
        this.allGalleryImagesIndexes = [0, 1, 2, 3];

        this.galleryImages = [
            new Image("Amazon Waterfall", "Description Example 1", "/assets/images/waterfall1.png", "Attraction", "Italy",  "Milan"),
            new Image("Amazon Waterfall", "Description Example 2", "/assets/images/waterfall2.png", "Family",     "Greece", "Athens"),
            new Image("Amazon Waterfall", "Description Example 3", "/assets/images/waterfall3.png", "Travels",    "Norway", "Oslo"),
            new Image("Amazon Waterfall", "Description Example 4", "/assets/images/waterfall4.png", "Cars",       "Spain",  "Madrid"),
        ]

        this.initFiltering();
    }

    initFiltering() {
        this.displayedGalleryImages = [];
        for(var i = 0; i < this.galleryImages.length; i++) {
            this.displayedGalleryImages.push(i);
        }

        this.galleryImages.forEach(element => {
            var categories = ["types", "countries", "cities"];
            var imageField = ["type", "country", "city"];
            for(var index in categories) {
                if(this[categories[index]].indexOf(element[imageField[index]]) === -1 && element[imageField[index]] !== "") {
                    this[categories[index]].push(element[imageField[index]]);
                }
            }
        });
    }

    ngOnInit() { }

    changeImagesCol(col:number) {
        this.imagesCol = col;
    }

    selectFilter(arg:string, cat:string) {

        // Select and Store Filter 'arg' to 'cat' category
        var index = this[cat].indexOf(arg);
        if(index === -1) {
            this[cat].push(arg);
            this.selectedFiltersCounter++;
        } else {
            this[cat].splice(index, 1);
            this.selectedFiltersCounter--;
        }  
    }

    deleteImage(src:string) {
        this.galleryImages = this.galleryImages.filter(function(elem){
            return elem.src != src;
        });

        this.displayedGalleryImages = [];
        for(var i = 0; i < this.galleryImages.length; i++) {
            this.displayedGalleryImages[i] = i;
        }

        this.types = [];
        this.countries = [];
        this.cities = [];
        this.galleryImages.forEach(element => {
            var categories = ["types", "countries", "cities"];
            var imageField = ["type", "country", "city"];
            for(var index in categories) {
                if(this[categories[index]].indexOf(element[imageField[index]]) === -1) {
                    this[categories[index]].push(element[imageField[index]]);
                }
            }
        });

        var selectedFilters = ["selectedTypes", "selectedCountries", "selectedCities"];
        var filters = ["types", "countries", "cities"];
        for(var indexFilter in filters) {
            this[selectedFilters[indexFilter]] = this[selectedFilters[indexFilter]].filter(item => 
                    this[filters[indexFilter]].indexOf(item) > -1)
        }
    }

    displaySelectedImage(src:string, action: string) {
        if(action === "display") {
            this.displayImage = true;
        } else {
            this.editImage = true;
        }

        this.galleryImages.forEach(element => {
            if(element.src === src) {
                this.displayedImage = new Image(element.title, element.description, element.src, 
                    element.type, element.country, element.city);
                    return;
            }
        });
    }

    hideDisplayedImage() {
        this.displayImage = false;
        this.editImage = false;
        this.displayedImage = null;
    }

    saveEditedImage(title: string, description: string, type: string, country: string, city: string) {
        this.galleryImages.forEach((element, index) => {
            if(element.src === this.displayedImage.src) {
                this.galleryImages[index] = new Image(title, description, element.src, 
                    type, country, city);
                    return;
            }
        });

        this.hideDisplayedImage();
    }

    processFile(imageInput) {
        this.uploadedImages = [];
        this.uploadedImagesEditIndex = 0;
        this.showUploadedImagesModal = true;

        for(var i = 0; i < imageInput.files.length; i++) {
            var file: File = imageInput.files[i];
            var reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                this.uploadedImages.push(new Image("", "", event.target.result, "", "", ""));             
            });
            reader.readAsDataURL(file);
        }
    }

    uploadImages() {
        //Mongodb code missed
        this.showUploadedImagesModal = false;
        
        this.uploadedImages.forEach(element => {
           this.galleryImages.push(element); 
        });

        this.initFiltering();
        console.log(this.galleryImages);
    }

    cancelUploadImages() {
        this.showUploadedImagesModal = false;
    }

    deleteUploadedMaterial(src: string) {
        this.uploadedImages = this.uploadedImages.filter(function(elem){
            return elem.src != src;
        });
    }

    setUploadedImageTitle(event) {
        this.uploadedImages[this.uploadedImagesEditIndex].title = event.target.value;
    }

    setUploadedImageDescription(event) {
        this.uploadedImages[this.uploadedImagesEditIndex].description = event.target.value;
    }

    setUploadedImageType(event) {
        this.uploadedImages[this.uploadedImagesEditIndex].type = event.target.value;
    }
    
    setUploadedImageCountry(event) {
        this.uploadedImages[this.uploadedImagesEditIndex].country = event.target.value;
    }

    setUploadedImageCity(event) {
        this.uploadedImages[this.uploadedImagesEditIndex].city = event.target.value;
    }

    getUploadedImageTitle() {
        return this.uploadedImages[this.uploadedImagesEditIndex].title;
    }

    getUploadedImageDescription() {
        return this.uploadedImages[this.uploadedImagesEditIndex].description;
    }

    getUploadedImageType() {
        return this.uploadedImages[this.uploadedImagesEditIndex].type;
    }
    
    getUploadedImageCountry() {
        return this.uploadedImages[this.uploadedImagesEditIndex].country;
    }

    getUploadedImageCity() {
        return this.uploadedImages[this.uploadedImagesEditIndex].city;
    }

    prevUploadedImageToEdit() {
        if(this.uploadedImagesEditIndex > 0) {
            this.uploadedImagesEditIndex--;
        }
    }

    nextUploadedImageToEdit() {
        if(this.uploadedImagesEditIndex < this.uploadedImages.length - 1) {
            this.uploadedImagesEditIndex++;
        }
    }

    setPrevUploadedImageButtonStyle() {
        if(this.uploadedImagesEditIndex === 0) return {'opacity': '0.5'};
    }

    setNextUploadedImageButtonStyle() {
        if(this.uploadedImagesEditIndex === this.uploadedImages.length - 1) return {'opacity': '0.5'};
    }

    openFiltersModal() {
        this.showFiltersModal = true;

        this.initFiltering();
    }

    cancelFilters() {
        this.showFiltersModal = false;
    }

    applyFilters() {
        this.showFiltersModal = false;

        if(!this.selectedFiltersCounter) {
            this.displayedGalleryImages = this.allGalleryImagesIndexes;
        } else {
            var flag: boolean;
            this.displayedGalleryImages = [];

            for(var i = 0; i < this.galleryImages.length; i++) {
                flag = false;
                
                var categories = ["selectedTypes", "selectedCountries", "selectedCities"];
                var imageField = ["type", "country", "city"];

                for(var index in categories) {
                    if(this[categories[index]].length) {
                        var match = this[categories[index]].indexOf(this.galleryImages[i][imageField[index]]);
                        flag = match > -1? true : false;
                        if(!flag) break;
                    }
                }
                if(flag) this.displayedGalleryImages.push(i);
            }
        }
    }

}

class Image {
    title: string;
    description: string;
    src: string;
    type: string;
    country: string;
    city: string;

    constructor(title: string, descr: string, src: string, 
                type: string, country: string, city: string) {
        this.title = title;
        this.description = descr;
        this.src = src;
        this.type = type;
        this.country = country;
        this.city = city;
    }
}