import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Wall } from './wall';

@Injectable()
export class WallDBService {

    constructor(private http: Http) { }

    getWalls(): Observable<Wall[]> {
        return this.http
        .get('api/walls/')
        .map((response: Response) => <Wall[]> response.json());
    }

    deleteWall(id) {
        this.http.delete('api/walls/' + id).subscribe();
    }

    uploadWall(wallSetID) {
        return this.http.post('api/walls/', {
            wallSetID: wallSetID,
            borderMaterial: '',
            borderSize: 0,
            title: 'New Wall'
        });
    }

    updateWall(id, wallSetID, borderMaterial, borderSize, title) {
        this.http.put('api/walls/' + id, {
            wallSetID: wallSetID,
            borderMaterial: borderMaterial,
            borderSize: borderSize,
            title: title
        })
        .subscribe();
    }
}
