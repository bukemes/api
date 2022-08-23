import express, { Request } from 'express';
import { getMedia, uploadMedia, editMedia, deleteMediaById } from '../controllers/mediaController';
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';
import multer from 'multer';
const upload = multer({ 
    dest: './public/img',
    fileFilter: onlyImages
});


/**
 * @openapi
 * tags: 
 *   name: Media
 *   description: Upload, Edit and Delete Pictures
 */

/**
 * @openapi
 * components:
 *   schemas:
 *    Media:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - duration
 *      properties:
 *        _id:
 *          type: string
 *          description: generated by mongoDB | the unique identifier of the document
 *        title:
 *          type: string
 *          description: title of the tour
 *        description:
 *          type: string
 *          description: description of the tour
 *        createdAt:
 *          type: Date
 *          description: generated by mongoDB | time of document creation
 *        updatedAt:
 *          type: Date
 *          description: generated by mongoDB | last time the document was updated
 *      example:
 *        _id: 62e3b68f338c3093dcbe4ade
 *        title: Leuven Skyline
 *        description: A landscape showing the skyline of Leuven
 *        createdAt: ISODate('2022-07-29T10:29:35.323Z'),
 *        updatedAt: ISODate('2022-07-29T10:29:35.323Z'),
 *    Media_Create:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - duration
 *      properties:
 *        title:
 *          type: string
 *          description: title of the tour
 *        description:
 *          type: string
 *          description: description of the tour
 *      example:
 *        title: Leuven Skyline
 *        description: A landscape showing the skyline of Leuven
 */
const mediaRouter = express.Router();

// auth
mediaRouter.use(requireAuth);
mediaRouter.use(requireAdmin);
// routes
mediaRouter.get('/', getMedia);
mediaRouter.post('/upload', upload.single('media'), uploadMedia);
// mediaRouter.put('/:id', editMedia);
mediaRouter.delete('/:id', deleteMediaById);

export default mediaRouter;

function onlyImages(req: any, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
    const type = file.mimetype.split('/')[0];
    if(type !== 'image') {
        cb(null, false);
    } else {
        cb(null, true);
    }    
}