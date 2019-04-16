import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  providers:[EditorComponent],
})
export class WorkspaceComponent implements OnInit {

  constructor(private editor: EditorComponent ) {}

  ngOnInit() {
  }

  insertNewFrame(type: string) {
    this.editor.addShape(type);
  }
}
