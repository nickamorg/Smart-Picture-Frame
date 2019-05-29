'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './frame.sockets';

enum FrameCategory {
    IMAGE, WALLPAPER, MATERIAL
}

var FrameSchema = new mongoose.Schema({
    wallID: String,
    borderRadius: Number,
    borderSize: Number,
    hasMaterial: Boolean,
    borderMaterial: String,
    borderColor: String,
    padding: Number,
    top: Number,
    left: Number,
    width: Number,
    height: Number,
    iterateTime: Number
});

registerEvents(FrameSchema);
export default mongoose.model('Frame', FrameSchema);
