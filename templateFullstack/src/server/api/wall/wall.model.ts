'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './wall.sockets';

enum WallCategory {
    IMAGE, WALLPAPER, MATERIAL
}

var WallSchema = new mongoose.Schema({
    ID: String,
    wallSetID: String,
    borderMaterial: String,
    hasMaterial: Boolean,
    borderSize: Number,
    displayedImageIndex: Number,
    title: String,
    active: Boolean
});

registerEvents(WallSchema);
export default mongoose.model('Wall', WallSchema);
