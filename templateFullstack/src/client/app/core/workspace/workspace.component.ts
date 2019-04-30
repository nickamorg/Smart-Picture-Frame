import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { ShapesService } from '../../shapes.service';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
    providers:[EditorComponent],
})
export class WorkspaceComponent implements OnInit {

    constructor(private editor: EditorComponent, private shapesService: ShapesService ) {}

    ngOnInit() { }

    insertNewFrame(type: string) {
        this.editor.addFrame(type);
    }
}
