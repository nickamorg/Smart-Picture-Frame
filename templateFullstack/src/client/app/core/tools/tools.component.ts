import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../../shapes.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  case:number = 1;
  constructor(private shapesService: ShapesService) { }

  ngOnInit() {
  }

  testCall() {
    console.log("TEST");
  }
}
