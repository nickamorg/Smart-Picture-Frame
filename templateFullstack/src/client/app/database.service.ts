import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {GalleryImage} from './galleryImage';

@Injectable()
export class DatabaseService {
    images: GalleryImage[];

    constructor(private http: Http) { }

    getImages(): Observable<GalleryImage[]> {
        return this.http
        .get('api/galleryImages/')
        .map((response: Response) => <GalleryImage[]> response.json());
    }

    deleteImage(id) {
        this.http.delete('api/galleryImages/' + id).subscribe();
    }

    uploadImage(src, title, description,
        type, country, city) {
        this.http.post('api/galleryImages/', {
            src: src,
            title: title,
            description: description,
            type: type,
            country: country,
            city: city,
        }).subscribe(data => {});
    }

    updateImage(id, src, title, description, type, country, city) {
        this.http.put('api/galleryImages/' + id, {
            src: src,
            title: title,
            description: description,
            type: type,
            country: country,
            city: city
            })
        .subscribe();
    }
}
