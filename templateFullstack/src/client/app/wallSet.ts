import { Wall } from './wall';

export class WallSet {
    _id: string;
    walls: Wall[] = [];
    creator = '';
    type = '';
    target = '';
    title = '';
    description = '';
    active = false;

    init(_id, creator, type, target, title, description, active) {
        this._id = _id;
        this.creator = creator;
        this.type = type;
        this.target = target;
        this.title = title;
        this.description = description;
        this.active = active;
    }

    copy() {
        var newWallSet = new WallSet();
        newWallSet.creator = this.creator;
        newWallSet.type = this.type;
        newWallSet.target = this.target;
        newWallSet.title = this.title;
        newWallSet.description = this.description;
        newWallSet._id = this._id;
        newWallSet.active = this.active;

        newWallSet.walls = [];
        for (var i = 0; i < this.walls.length; i++) {
            newWallSet.walls.push(this.walls[i].copy());
        }

        return newWallSet;
    }
}
