import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

class WallImage {
    _id: String;
    wallID: String;
    imageID: String;
}

@Injectable()
export class WallImageDBService {

    constructor(private http: Http) { }

    getWallImages(): Observable<WallImage[]> {
        return this.http
        .get('api/wallImages/')
        .map((response: Response) => <WallImage[]> response.json());
    }

    deleteWallImage(id) {
        this.http.delete('api/wallImages/' + id).subscribe();
    }

    uploadWallImage(wallID, imageID) {
        this.http.post('api/wallImages/', {
            wallID: wallID,
            imageID: imageID
        }).subscribe(data => {});
    }

    updateImage(id, wallID, imageID) {
        this.http.put('api/wallImages/' + id, {
            wallID: wallID,
            imageID: imageID
        })
        .subscribe();
    }
}
