import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { WallSet } from './wallSet';
import { WallDBService } from './wallDB.service';

@Injectable()
export class WallSetDBService {

    constructor(private http: Http, private wallDBService: WallDBService) { }

    getWallSets(): Observable<WallSet[]> {
        return this.http
        .get('api/wallSets/')
        .map((response: Response) => <WallSet[]> response.json());
    }

    deleteWallSet(id) {
        this.http.delete('api/wallSets/' + id).subscribe();
    }

    uploadWallSet(creator, type, target, title, description) {
        return this.http.post('api/wallSets/', {
            creator: creator,
            type: type,
            target: target,
            title: title,
            description: description
        });
    }

    updateWallSet(id, creator, type, target, title, description) {
        this.http.put('api/wallSets/' + id, {
            creator: creator,
            type: type,
            target: target,
            title: title,
            description: description
            })
        .subscribe();
    }
}
