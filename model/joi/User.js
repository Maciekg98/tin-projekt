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
            case "string.email":
                err.message = `Invalid email`;
                break;
            default:
                break;
        }
    });
    return errors;
}
const userSchema = Joi.object({


    _id: Joi.number()
        .optional()
        .allow(""),

    username: Joi.string()
        .min(2)
        .max(60)
        .required().error(errMessages),

    email: Joi.string()
        .email().required().error(errMessages),
    password: Joi.string()
        .min(7)
        .max(60)
        .required().error(errMessages)




});

module.exports = userSchema;