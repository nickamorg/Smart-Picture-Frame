export class Wallpaper {
    _id: String;
    src: String;
    title: String;

    constructor(_id: String, title: String, src: String) {
        this._id = _id;
        this.title = title;
        this.src = src;
    }
}