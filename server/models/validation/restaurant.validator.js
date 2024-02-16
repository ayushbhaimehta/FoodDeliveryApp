const Joi = require('joi');

const validateSendOtpSchemaModel = Joi.object({
    phoneNo: Joi.string().required().max(10).min(10),
    countryCode: Joi.string().required().max(3).min(2)
})

const validateVerifyOtpSchemaModel = Joi.object({
    phoneNo: Joi.string().required().max(10).min(10),
    countryCode: Joi.string().required().max(3).min(2),
    otp: Joi.string().required().max(6).min(6)
})

const validateUpdateAddressSchemaModel = Joi.object({
    newAddress: Joi.object({
        houseNo: Joi.string(),
        area: Joi.string(),
        directions: Joi.string(),
        city: Joi.string(),
        location: {
            coordinates: Joi.array().items(Joi.string())
        },
        gstinNo: Joi.string()
    }),
    oldAddress: Joi.object({
        houseNo: Joi.string().required(),
        area: Joi.string().required(),
        directions: Joi.string().required(),
        city: Joi.string().required(),
        location: {
            coordinates: Joi.array().required().items(Joi.string())
        },
        gstinNo: Joi.string().required()
    }).required()
});

const validateUpdateNameSchemaModel = Joi.object({
    restaurantName: Joi.string().required().min(1),
    email: Joi.string().email()
})

const validateAddImgSchemaModel = Joi.object({
    img: Joi.string().required()
})

const validateGetByPhoneNoSchemaModel = Joi.object({
    phoneNo: Joi.string().required()
})

const validateAddMenuSchemaModel = Joi.object({
    menu: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            img: Joi.string().required(),
            price: Joi.string().required(),
            description: Joi.string().required(),
            rating: Joi.string().required()
        }).required()
    )
})

const validateAddMenuSchema = (loginInfo) => {
    return validateAddMenuSchemaModel.validate(loginInfo);
}

const validateUpdateAddressSchema = (loginInfo) => {
    return validateUpdateAddressSchemaModel.validate(loginInfo);
}

const validateGetByPhoneNoSchema = (loginInfo) => {
    return validateGetByPhoneNoSchemaModel.validate(loginInfo);
}

const validateUpdateNameSchema = (loginInfo) => {
    return validateUpdateNameSchemaModel.validate(loginInfo);
}

const validateSendOtpSchema = (loginInfo) => {
    return validateSendOtpSchemaModel.validate(loginInfo);
}

const validateVerifyOtpSchema = (loginInfo) => {
    return validateVerifyOtpSchemaModel.validate(loginInfo);
}

const validateAddImgSchema = (loginInfo) => {
    return validateAddImgSchemaModel.validate(loginInfo);
}

module.exports = {
    validateSendOtpSchema,
    validateVerifyOtpSchema,
    validateUpdateNameSchema,
    validateGetByPhoneNoSchema,
    validateUpdateAddressSchema,
    validateAddMenuSchema,
    validateAddImgSchema
}