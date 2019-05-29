'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './wallpaper.sockets';

var WallpaperSchema = new mongoose.Schema({
    src: String,
    title: String
});

registerEvents(WallpaperSchema);
export default mongoose.model('Wallpaper', WallpaperSchema);
