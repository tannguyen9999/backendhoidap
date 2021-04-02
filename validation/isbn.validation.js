import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const ObjectId = JoiObjectId(Joi);
const createSchema = Joi.object().keys({
    name: Joi.string().strip(),
    releaseAt: Joi.string().strip(),
    author: Joi.string().strip()
});

const updateSchema = Joi.object().keys({
    name: Joi.string().strip(),
    releaseAt: Joi.string().strip(),
    author: Joi.string().strip(),
    categoryId: Joi.string().strip()
});
const bookIdSchema = Joi.object().keys({
    id: ObjectId().required()
})




module.exports = {
    createSchema,
    updateSchema,
    bookIdSchema
}; 