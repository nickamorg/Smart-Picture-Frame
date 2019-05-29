'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './galleryImage.sockets';

var GalleryImageSchema = new mongoose.Schema({
    src: String,
    title: String,
    description: String,
    type: String,
    country: String,
    city: String,
});

registerEvents(GalleryImageSchema);
export default mongoose.model('GalleryImage', GalleryImageSchema);
