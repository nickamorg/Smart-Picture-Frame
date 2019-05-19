'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './shapeImage.sockets';

enum ShapeImageCategory {
    IMAGE, WALLPAPER, MATERIAL
}

var ShapeImageSchema = new mongoose.Schema({
    shapeID: String,
    imageID: String,
    active: Boolean
});

registerEvents(ShapeImageSchema);
export default mongoose.model('ShapeImage', ShapeImageSchema);