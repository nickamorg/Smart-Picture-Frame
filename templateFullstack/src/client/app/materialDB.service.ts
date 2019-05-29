import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Material } from './material';

@Injectable()
export class MaterialDBService {

    constructor(private http: Http) { }

    getMaterials(): Observable<Material[]> {
        return this.http
        .get('api/materials/')
        .map((response: Response) => <Material[]> response.json());
    }

    deleteMaterial(id) {
        this.http.delete('api/materials/' + id).subscribe();
    }

    uploadMaterial(src, title) {
        this.http.post('api/materials/', {
            src: src,
            title: title
        }).subscribe(data => {});
    }

    updateImage(id, src, title, description, type, country, city) {
        this.http.put('api/materials/' + id, {
            src: src,
            title: title
            })
        .subscribe();
    }
}
