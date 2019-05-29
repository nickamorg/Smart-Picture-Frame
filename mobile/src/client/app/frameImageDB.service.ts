import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

class FrameImage {
    _id: String;
    frameID: String;
    imageID: String;
}

@Injectable()
export class FrameImageDBService {

    constructor(private http: Http) { }

    getFrameImages(): Observable<FrameImage[]> {
        return this.http
        .get('api/frameImages/')
        .map((response: Response) => <FrameImage[]> response.json());
    }

    deleteFrameImage(id) {
        this.http.delete('api/frameImages/' + id).subscribe();
    }

    uploadFrameImage(frameID, imageID) {
        this.http.post('api/frameImages/', {
            frameID: frameID,
            imageID: imageID
        }).subscribe(data => {});
    }

    updateImage(id, frameID, imageID) {
        this.http.put('api/frameImages/' + id, {
            frameID: frameID,
            imageID: imageID
        })
        .subscribe();
    }
}
