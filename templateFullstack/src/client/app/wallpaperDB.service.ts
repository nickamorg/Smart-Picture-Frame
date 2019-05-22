import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Wallpaper } from './wallpaper';

@Injectable()
export class WallpaperDBService {
    images: Wallpaper[];

    constructor(private http: Http) { }

    getWallpapers(): Observable<Wallpaper[]> {
        return this.http
        .get('api/wallpapers/')
        .map((response: Response) => <Wallpaper[]> response.json());
    }

    deleteWallpaper(id) {
        this.http.delete('api/wallpapers/' + id).subscribe();
    }

    uploadWallpaper(src, title) {
        this.http.post('api/wallpapers/', {
            src: src,
            title: title
        }).subscribe(data => {});
    }

    updateImage(id, src, title, description, type, country, city) {
        this.http.put('api/wallpapers/' + id, {
            src: src,
            title: title
            })
        .subscribe();
    }
}
