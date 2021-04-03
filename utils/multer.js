import Multer from 'multer';

import path from 'path';
import { nanoid } from 'nanoid';

var storage = Multer.diskStorage({
    destination: path.join(__dirname, '../../..', '/uploads'),
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
      },
    filename: function (req, file, cb) {
        
        cb(null, `${file.fieldname}-${nanoid(10)}-@${file.originalname}`);
    }
});


const multer = Multer({
    storage: storage,
});

export default multer;