const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Field is required";
                break;
            case "date.empty":
                err.message = "Field is required";
                break;
            default:
                break;
        }
    });
    return errors;
}

const ordSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),

    user: Joi.number().required().error(errMessages),
    movie_id: Joi.number().required().error(errMessages),
    dateFrom: Joi.date().required().error(errMessages),
    dateTo: Joi.date().required().error(errMessages),
    isPaid: Joi.string().required().error(errMessages)
});

module.exports = ordSchema;