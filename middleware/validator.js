import Joi from 'joi';

export function validatorBody(schema) {
    return async (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if (result.error !== null) {
            return res.status(400).json({ success: false, message: result.error.message });
        }
        return next();
    };
};

export function validatorParam(schema) {
    return async (req, res, next) => {
        const result = Joi.validate(req.params, schema);
        if (result.error !== null) {
            return res.status(400).json({ success: false, message: result.error.message });
        }
        return next();
    };
}

