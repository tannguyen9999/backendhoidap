import Joi from 'joi';

import JoiObjectId from 'joi-objectid';

const ObjectId = JoiObjectId(Joi);
const createSchema = Joi.object().keys({
    status: Joi.string().required(),
    date: Joi.string().required()
});

const updateSchema = Joi.object().keys({
    isbnId: Joi.string().strip(),
    status: Joi.string().strip(),
    date: Joi.string().strip()
});
const bookIdSchema = Joi.object().keys({
    id: ObjectId().required()
})



module.exports = {
    createSchema,
    updateSchema,
    bookIdSchema
}; 