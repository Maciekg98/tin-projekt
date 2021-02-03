const Joi = require('joi');



const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Field is required";
                break;
            case "string.min":
                err.message = `Min ${err.local.limit} chars`;
                break;
            case "string.max":
                err.message = `Max ${err.local.limit} chars`;
                break;
            case "number.empty":
                err.message = `Field is required`;
                break;
            default:
                break;
        }
    });
    return errors;
}
const movieSchema = Joi.object({




    _id: Joi.number()
        .optional()
        .allow(""),

    title: Joi.string()
        .min(2)
        .max(60)
        .required().error(errMessages),

    director: Joi.string()
        .min(7)
        .max(60)
        .required().error(errMessages),

    price: Joi.number().positive().required().error(errMessages)


});

module.exports = movieSchema;