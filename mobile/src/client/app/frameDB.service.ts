import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Frame } from './frame';

@Injectable()
export class FrameDBService {

    constructor(private http: Http) { }

    getFrames(): Observable<Frame[]> {
        return this.http
        .get('api/frames/')
        .map((response: Response) => <Frame[]> response.json());
    }

    deleteFrame(id) {
        this.http.delete('api/frames/' + id).subscribe();
    }

    uploadFrame(wallID: String, borderRadius: Number, borderSize: Number,
                borderMaterial: String, borderColor: String, padding: Number, top: Number,
                left: Number, width: Number, height: Number, iterateTime: Number, interactionType: String) {
        return this.http.post('api/frames/', {
            wallID: wallID,
            borderRadius: borderRadius,
            borderSize: borderSize,
            borderMaterial: borderMaterial,
            borderColor: borderColor,
            padding: padding,
            top: top,
            left: left,
            width: width,
            height: height,
            iterateTime: iterateTime,
            interactionType: interactionType
        });
    }

    updateFrame(id, wallID, borderRadius, borderSize, borderMaterial, borderColor,
            padding, top, left, width, height, iterateTime, zIndex, interactionType) {
        this.http.put('api/frames/' + id, {
            wallID: wallID,
            borderRadius: borderRadius,
            borderSize: borderSize,
            borderMaterial: borderMaterial,
            borderColor: borderColor,
            padding: padding,
            top: top,
            left: left,
            width: width,
            height: height,
            iterateTime: iterateTime,
            zIndex: zIndex,
            interactionType: interactionType
        })
        .subscribe();
    }
}
