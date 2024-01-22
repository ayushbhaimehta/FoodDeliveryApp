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

const validateUpdateNameSchemaModel = Joi.object({
    name: Joi.string().required().min(1),
    email: Joi.string().email()
})



const validateAddAddressSchemaModel = Joi.object({
    address: Joi.object({
        name: Joi.string(),
        phoneNo: Joi.string(),
        myself: Joi.boolean().required(),
        saveAs: Joi.string().required(),
        houseNo: Joi.string().required(),
        area: Joi.string().required(),
        directions: Joi.string().required(),
        location: Joi.object({
            coordinates: Joi.array().required().items(Joi.string())
        })
    })
});

const validateUpdateAddressSchemaModel = Joi.object({
    oldAddress: Joi.object({
        name: Joi.string(),
        phoneNo: Joi.string(),
        myself: Joi.boolean().required(),
        saveAs: Joi.string().required(),
        houseNo: Joi.string().required(),
        area: Joi.string().required(),
        directions: Joi.string().required(),
        location: Joi.object({
            coordinates: Joi.array().required().items(Joi.string())
        })
    }),
    newAddress: Joi.object({
        name: Joi.string(),
        phoneNo: Joi.string(),
        myself: Joi.boolean().required(),
        saveAs: Joi.string().required(),
        houseNo: Joi.string().required(),
        area: Joi.string().required(),
        directions: Joi.string().required(),
        location: Joi.object({
            coordinates: Joi.array().required().items(Joi.string())
        })
    })
})

const validateUpdateNameSchema = (loginInfo) => {
    return validateUpdateNameSchemaModel.validate(loginInfo);
}

const validateUpdateAddressSchema = (loginInfo) => {
    return validateUpdateAddressSchemaModel.validate(loginInfo);
}

const validateAddAddressSchema = (loginInfo) => {
    return validateAddAddressSchemaModel.validate(loginInfo);
}

const validateSendOtpSchema = (OtpInfo) => {
    return validateSendOtpSchemaModel.validate(OtpInfo);
}

const validateVerifyOtpSchema = (OtpInfo) => {
    return validateVerifyOtpSchemaModel.validate(OtpInfo);
}

module.exports = {
    validateSendOtpSchema,
    validateVerifyOtpSchema,
    validateUpdateNameSchema,
    validateAddAddressSchema,
    validateUpdateAddressSchema,
}