export class WallSet {
    _id: String;
    creator: String
    type: String
    target: String
    title: String
    description: String

    constructor(_id: String, creator: String, type: String, 
                target: String, title: String, description: String) {
        this._id = _id;
        this.creator = creator;
        this.type = type;
        this.target = target;
        this.title = title;
        this.description = description;
    }
}