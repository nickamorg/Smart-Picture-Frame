'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './frameImage.sockets';

var FrameImageSchema = new mongoose.Schema({
    frameID: String,
    imageID: String
});

registerEvents(FrameImageSchema);
export default mongoose.model('FrameImage', FrameImageSchema);
