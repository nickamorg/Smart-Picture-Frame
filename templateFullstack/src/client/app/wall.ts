export class Wall {
    _id: String;
    wallSetID: String;
    borderMaterial: String;
    borderSize: Number;
    title: String;

    constructor(_id: String, wallSetID: String, borderMaterial: String, 
                                    borderSize: Number, title: String) {
        this._id = _id;
        this.wallSetID = wallSetID;
        this.borderMaterial = borderMaterial;
        this.borderSize = borderSize;
        this.title = title;
    }
}