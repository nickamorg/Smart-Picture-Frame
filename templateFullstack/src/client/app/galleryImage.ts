export class GalleryImage {
    _id: String;
    src: String;
    title: String;
    description: String;
    type: String;
    country: String;
    city: String;

    constructor(_id: String, title: String, descr: String, src: String,
        type: String, country: String, city: String) {
        this._id = _id;
        this.title = title;
        this.description = descr;
        this.src = src;
        this.type = type;
        this.country = country;
        this.city = city;
    }
}