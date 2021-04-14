import Joi from 'joi';

export default {
    validateSchema(body) {
        const schema = Joi.object({
            email: Joi.email().required(),
            password: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        console.log(value);
        if (error && error.details) {
            return {error}
        }
        return { value }
    }
}


