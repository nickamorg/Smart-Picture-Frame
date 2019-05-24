'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './wallImage.sockets';

var WallImageSchema = new mongoose.Schema({
    wallID: String,
    imageID: String
});

registerEvents(WallImageSchema);
export default mongoose.model('WallImage', WallImageSchema);
