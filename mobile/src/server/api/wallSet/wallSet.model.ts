'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './wallSet.sockets';

enum WallSetCategory {
    IMAGE, WALLPAPER, MATERIAL
}

var WallSetSchema = new mongoose.Schema({
    creator: String,
    type: String,
    target: String,
    title: String,
    description: String
});

registerEvents(WallSetSchema);
export default mongoose.model('WallSet', WallSetSchema);
