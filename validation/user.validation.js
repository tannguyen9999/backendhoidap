
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

// const ObjectId = JoiObjectId(Joi);

const registerSchema = Joi.object().keys({
    firstName: Joi.string().strip().required(),
    lastName: Joi.string().strip().required(),
    email: Joi.string().strip().required(),
    phone: Joi.number().strip().required(),
    address: Joi.string().strip().required(),
    password: Joi.string().strip().required()
});


const loginSchema = Joi.object().keys({

    email: Joi.string().strip().required(),
  
    password: Joi.string().strip().required()
});
const changePasswordSchema = Joi.object().keys({
  
    password: Joi.string().strip().required(),
    newPassword: Joi.string().strip().required()
});

module.exports = {
    registerSchema,
    loginSchema,
    changePasswordSchema
}; 