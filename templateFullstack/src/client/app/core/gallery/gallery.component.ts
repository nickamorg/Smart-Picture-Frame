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

    constructor() { 
        this.imagesCol = 6;
        this.types = [];
        this.countries = [];
        this.cities = [];

        this.selectedFiltersCounter = 0;
        this.selectedTypes = [];
        this.selectedCountries = [];
        this.selectedCities = [];

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

    }



    ngOnInit() { }

    changeImagesCol(col:number) {
        this.imagesCol = col;
    }

    selectFilter(arg:string, cat:string) {
        var index = this[cat].indexOf(arg);
        if(index === -1) {
            this[cat].push(arg);
            this.selectedFiltersCounter++;
        } else {
            this[cat].splice(index, 1);
            this.selectedFiltersCounter--;
        }

        console.log(this[cat]);
        
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