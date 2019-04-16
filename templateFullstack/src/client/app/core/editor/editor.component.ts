import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { ShapesService } from '../../shapes.service';
//import { ToolsComponent } from '../tools/tools.component';

@Component({
   // providers:[ToolsComponent],
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})

export class EditorComponent implements OnInit {
    red = "#ff0000"
    //@ViewChild('target') target: { nativeElement: any; };
    constructor(private shapesService: ShapesService) {}
    // constructor(private tools: ToolsComponent ) { }

    // i:number = 5;
    ngOnInit() {
        //console.log("YES   " + this.shapesService.shapesService.shapes);
        // this.tools.testCall();

        
    }

    // addShape(type: string) {
    //     console.log("YES   " + this.shapesService.shapes[0].type);
        
    //     if (!this.shapesService.shapes) {
    //       this.shapesService.shapes = [];
    //     }
    //     this.shapesService.pushShape(type);
    //     console.log(this.shapesService.shapes);
    // }

    addFrame(type: string) {
        if (!this.shapesService.frames) {
          this.shapesService.frames = [];
        }
        this.shapesService.pushFrame(type);
        console.log(this.shapesService.frames);
    }

    test(str: string) {
        //this.shapesService.shapes += "<div (click)='tellme()'>XaXa</div>";
        
        $("#editor").append("<div (click)='tellme()'>XaXa</div>");
        $("#editor").append('<div (click)="tellme()" class="square shape"></div>');
        // let element = this.target.nativeElement;

        // element.className = 'next';
        // element.id = 'XAX' + this.i++;
        // this.tools.case = 1;
        alert(str);
    }
}
