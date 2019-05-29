'use strict';

import * as mongoose from 'mongoose';
import { registerEvents } from './material.sockets';

var MaterialSchema = new mongoose.Schema({
    src: String,
    title: String
});

registerEvents(MaterialSchema);
export default mongoose.model('Material', MaterialSchema);
