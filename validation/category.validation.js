
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const ObjectId = JoiObjectId(Joi);

const createSchema = Joi.object().keys({
    name: Joi.string().strip().required()
});

const updateSchema = Joi.object().keys({
    name: Joi.string().strip()
});

const categoryIdSchema = Joi.object().keys({
    id: ObjectId().required()
})

module.exports = {
    createSchema,
    updateSchema,
    categoryIdSchema
}; 