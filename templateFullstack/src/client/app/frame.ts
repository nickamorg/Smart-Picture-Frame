export class Frame {
    _id: String;
    wallID: String;
    borderRadius: Number;
    borderSize: Number;
    borderMaterial: String;
    borderColor: String;
    padding: Number;
    top: Number;
    left: Number;
    width: Number;
    height: Number;
    iterateTime: Number;

    constructor(_id: String, wallID: String, borderRadius: Number, borderSize: Number,
                borderMaterial: String, borderColor: String, padding: Number, top: Number,
                left: Number, width: Number, height: Number, iterateTime: Number) {
        this._id = _id;
        this.wallID = wallID;
        this.borderRadius = borderRadius;
        this.borderSize = borderSize;
        this.borderMaterial = borderMaterial;
        this.borderColor = borderColor;
        this.padding = padding;
        this.top = top;
        this.left = left;
        this.width = height;
        this.iterateTime = iterateTime;
    }
}