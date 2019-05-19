'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './image.sockets';

enum ImageCategory {
    IMAGE, WALLPAPER, MATERIAL
}

var ImageSchema = new mongoose.Schema({
  ID: String,
  src: String,
  title: String,
  description: String,
  country: String,
  type: String,
  city: String,
  info: String,
  active: Boolean
});

registerEvents(ImageSchema);
export default mongoose.model('Image', ImageSchema);