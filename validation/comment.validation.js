
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

// const ObjectId = JoiObjectId(Joi);

const postDataSchema = Joi.object().keys({
    postId: Joi.string().strip().required(),
    contentComment: Joi.string().strip().required(),
});

const getDataByPostIdSchema = Joi.object().keys({
    postId: Joi.string().strip().required()
});


module.exports = {
    postDataSchema,
    getDataByPostIdSchema
}; 