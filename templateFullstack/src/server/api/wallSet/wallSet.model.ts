'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './wallSet.sockets';

enum WallSetCategory {
    IMAGE, WALLPAPER, MATERIAL
}

var WallSetSchema = new mongoose.Schema({
    ID: String,
    creator: String,
    type: String,
    target: String,
    title: String,
    description: String,
    active: Boolean
});

registerEvents(WallSetSchema);
export default mongoose.model('WallSet', WallSetSchema);
