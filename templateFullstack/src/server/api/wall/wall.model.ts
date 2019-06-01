'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './wall.sockets';

var WallSchema = new mongoose.Schema({
    wallSetID: String,
    borderMaterial: String,
    borderSize: Number,
    title: String,
    isLocked: Boolean,
    toBeDisplayed: Boolean
});

registerEvents(WallSchema);
export default mongoose.model('Wall', WallSchema);
