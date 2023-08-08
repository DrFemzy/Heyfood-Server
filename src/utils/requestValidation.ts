const Joi = require("@hapi/joi");


// Fetching 
export const getRestaurantRequestValidation = (data: object) => {
    const schema = Joi.object({
        page: Joi.number().required(),
        perPage: Joi.number().required(),
        storeTags: Joi.array().optional()
    });
    return schema.validate(data);
};

// Sorting 
export const sortingRequestValidation = (data: object) => {
    const schema = Joi.object({
        page: Joi.number().required(),
        perPage: Joi.number().required(),
        sortKey: Joi.string().required(),
    });
    return schema.validate(data);
};

