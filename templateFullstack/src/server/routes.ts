/**
 * Main application routes
 */
import * as path from 'path';
import * as errors from './components/errors';
import galleryImageRouter from './api/galleryImage';
import frameRouter from './api/frame';
import shapeImageRouter from './api/shapeImage';
import wallRouter from './api/wall';
import wallSetRouter from './api/wallSet';

export default app => {
    // Insert routes below
    app.use('/api/galleryImages', galleryImageRouter);
    app.use('/api/frames', frameRouter);
    app.use('/api/shapeImages', shapeImageRouter);
    app.use('/api/walls', wallRouter);
    app.use('/api/wallSets', wallSetRouter);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors.pageNotFound);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
        res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
};
