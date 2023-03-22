import Joi from 'joi';

const create = {
    body: Joi.object().keys({
        title: Joi.string().required(),
    }),
};

export default {
    create,
};
