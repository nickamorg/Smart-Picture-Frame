import { Wall } from "./wall";

export class WallSet {
    _id: string;
    walls: Wall[] = [];
    creator: string
    type: string
    target: string
    title: string
    description: string

    init(_id, creator, type, target, title, description) {
        this._id = _id;
        this.creator = creator;
        this.type = type;
        this.target = target;
        this.title = title;
        this.description = description;
    }

    copy() {
        var newWallSet = new WallSet();
        newWallSet.creator = this.creator;
        newWallSet.type = this.type;
        newWallSet.target = this.target;
        newWallSet.title = this.title;
        newWallSet.description = this.description;
        newWallSet._id = this._id;

        newWallSet.walls = [];
        for (var i = 0; i < this.walls.length; i++) {
            newWallSet.walls.push(this.walls[i].copy());
        }

        return newWallSet;
    }
}