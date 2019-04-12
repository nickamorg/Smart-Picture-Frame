import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
    imagesCol: number;
    galleryImages: Image[];
    types: string[];
    countries: string[];
    cities: string[];

    selectedFiltersCounter: number;
    selectedTypes: string[];
    selectedCountries: string[];
    selectedCities: string[];
    allGalleryImagesIndexes: number[];
    displayedGalleryImages: number[];

    displayImage: boolean;
    editImage: boolean;
    displayedImage: Image;

    constructor() { 
        this.imagesCol = 6;
        this.types = [];
        this.countries = [];
        this.cities = [];

        this.selectedFiltersCounter = 0;
        this.selectedTypes = [];
        this.selectedCountries = [];
        this.selectedCities = [];
        this.allGalleryImagesIndexes = [0, 1, 2, 3];
        this.displayedGalleryImages = this.allGalleryImagesIndexes;

        this.galleryImages = [
            new Image("Amazon Waterfall", "Description Example 1", "waterfall1.png", "Attraction", "Italy",  "Milan"),
            new Image("Amazon Waterfall", "Description Example 2", "waterfall2.png", "Family",     "Greece", "Athens"),
            new Image("Amazon Waterfall", "Description Example 3", "waterfall3.png", "Travels",    "Norway", "Oslo"),
            new Image("Amazon Waterfall", "Description Example 4", "waterfall4.png", "Cars",       "Spain",  "Madrid"),
        ]

        this.galleryImages.forEach(element => {
            var categories = ["types", "countries", "cities"];
            var imageField = ["type", "country", "city"];
            for(var index in categories) {
                if(this[categories[index]].indexOf(element[imageField[index]]) === -1) {
                    this[categories[index]].push(element[imageField[index]]);
                }
            }
        });

        this.displayImage = false;
        this.editImage = false;
        this.displayedImage = null;
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

        // Apply filters to displayed images
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
        }   console.log(this[cat]);     
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
        console.log(city);
        this.galleryImages.forEach((element, index) => {
            if(element.src === this.displayedImage.src) {
                this.galleryImages[index] = new Image(title, description, element.src, 
                    type, country, city);
                    return;
            }
        });

        this.hideDisplayedImage();
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