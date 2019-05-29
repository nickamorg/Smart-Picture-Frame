export class Frame {
    _id: string;
    wallID: string;
    borderRadius = 0;
    borderSize = 0;
    hasMaterial = false;
    borderMaterial = '';
    borderColor = '';
    padding = 0;
    top = 50;
    left = 10;
    width = 100;
    height = 100;
    images: string[] = [];
    displayedImageIndex = 0;
    iterateTime = 0;

    init(_id, borderRadius, borderSize, borderMaterial, borderColor,
                padding, top, left, width, height, iterateTime) {

        this._id = _id;
        this.borderRadius = borderRadius;
        this.borderSize = borderSize;
        this.hasMaterial = borderMaterial !== '' ? true : false;
        this.borderMaterial = borderMaterial;
        this.borderColor = borderColor;
        this.padding = padding;
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.iterateTime = iterateTime;
    }

    getFrameBorderStyle(index: number) {
        let style = {
            'background-color': this.borderColor,
            'border-radius': this.borderRadius + '%',
            'width': this.width + 'px',
            'height': this.height + 'px',
            'top': this.top + 'px',
            'left': this.left + 'px'
        };

        if (this.borderMaterial !== '' && this.borderMaterial !== undefined) {
            style['background-image'] = 'url(' + this.borderMaterial + ')';
        }

        return style;
    }

    getFrameStyle() {
        let style = {
            'background-color': 'rgb(255, 255, 255)',
            'border-radius': this.borderRadius + '%',
            'width': (this.width - this.borderSize * 2)  + 'px',
            'height': (this.height - this.borderSize * 2) + 'px',
            'top': this.borderSize + 'px',
            'left': this.borderSize + 'px',
            'padding': this.padding + 'px'
        };

        return style;
    }

    getImageStyle() {
        let style = {
            'border-radius': this.borderRadius + '%',
            'width': (this.width - this.padding * 2 - this.borderSize * 2)  + 'px',
            'height': (this.height - this.padding * 2 - this.borderSize * 2) + 'px',
            'top': this.borderSize + 'px',
            'left': this.borderSize + 'px'
        };

        return style;
    }

    copy() {
        var newFrame = new Frame();
        newFrame.borderRadius = this.borderRadius;
        newFrame.borderSize = this.borderSize;
        newFrame.hasMaterial = this.hasMaterial;
        newFrame.borderMaterial = this.borderMaterial;
        newFrame.borderColor = this.borderColor;
        newFrame.borderColor = this.borderColor;
        newFrame.padding = this.padding;
        newFrame.top = this.top;
        newFrame.left = this.left;
        newFrame.width = this.width;
        newFrame._id = this._id;
        newFrame.height = this.height;
        newFrame.displayedImageIndex = this.displayedImageIndex;
        newFrame.iterateTime = this.iterateTime;

        newFrame.images = [];
        for (var i = 0; i < this.images.length; i++) {
            newFrame.images.push(this.images[i]);
        }

        return newFrame;
    }
}