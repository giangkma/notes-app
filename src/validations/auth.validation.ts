import Joi from 'joi';

const EMAIL_REGEX = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
);
const PHONE_REGEX = new RegExp('^(\\+84|0)\\d{9,10}$');

const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const register = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        displayName: Joi.string().required(),
        email: Joi.string().pattern(EMAIL_REGEX),
        phone: Joi.string().pattern(PHONE_REGEX),
        avatar: Joi.string(),
    }),
};

const updateProfile = {
    body: Joi.object().keys({
        password: Joi.string(),
        displayName: Joi.string(),
        email: Joi.string().pattern(EMAIL_REGEX),
        phone: Joi.string().pattern(PHONE_REGEX),
        avatar: Joi.string(),
    }),
};

export default {
    login,
    register,
    updateProfile,
};
