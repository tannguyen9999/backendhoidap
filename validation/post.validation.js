
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

// const ObjectId = JoiObjectId(Joi);

const postDataSchema = Joi.object().keys({
    class: Joi.string().strip().required(),
    subject:Joi.string().strip().required(),
    content: Joi.string().strip().required(),
    picture: Joi.string().strip(),
});
const getDataSByClasschema = Joi.object().keys({
    class: Joi.string().strip().required(),
    offset: Joi.string().strip(),
    limit: Joi.string().strip(),
});

const getDataSByOptionchema = Joi.object().keys({
    class: Joi.string().strip(),
    subject:Joi.string().strip(),
    offset: Joi.string().strip(),
    limit: Joi.string().strip(),
});

const getDataSchema = Joi.object().keys({
    offset: Joi.string().strip(),
    limit: Joi.string().strip(),
});
const getSearchSchema = Joi.object().keys({
    content: Joi.string().strip(),
});

module.exports = {
    postDataSchema,
    getDataSByClasschema,
    getDataSchema,
    getDataSByOptionchema,
    getSearchSchema
}; 