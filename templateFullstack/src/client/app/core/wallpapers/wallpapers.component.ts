import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.scss']
})
export class WallpapersComponent implements OnInit {
  wallpapers: Wallpaper[];

  constructor() { 
      this.wallpapers = [
          new Wallpaper("waterfalls.jpg", "Waterfalls"),
          new Wallpaper("inferno.jpg", "Inferno"),
      ];
  }

  ngOnInit() { }

  deleteWallpaper(src: string) {
      console.log(src)
      this.wallpapers = this.wallpapers.filter(function(elem){
          return elem.src != src;
      });
  }
}

class Wallpaper {
  src: string;
  title: string;

  constructor(src: string, title: string) {
      this.src = src;
      this.title = title;
  }
}