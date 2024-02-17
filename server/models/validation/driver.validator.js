const Joi = require('joi');

const validateRegisterDriverSchemaModel = Joi.object({
    phoneNo: Joi.string().required().max(10).min(10),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    aadharId: Joi.string().required(),
    panCard: Joi.string().required(),
    bankDetails: Joi.string().required()
});

const validateLoginDriverSchemaModel = Joi.object({
    phoneNo: Joi.string().required(),
    password: Joi.string().required()
});

const validateUpdateOrderStatusSchemaModel = Joi.object({
    orderId: Joi.string().required(),
    newStatus: Joi.string().required()
});

const validateupdateDriverInfoSchemaModel = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
});

const validateSendEmailOtpSchemaModel = Joi.object({
    email: Joi.string().required()
});

const validateVerifyEmailOtpSchemaModel = Joi.object({
    email: Joi.string().required(),
    emailOtp: Joi.string().required().max(6).min(6)
});

const validateSendOtpSchemaModel = Joi.object({
    phoneNo: Joi.string().required().max(10).min(10),
    countryCode: Joi.string().required()
});

const validateVerifyOtpSchemaModel = Joi.object({
    phoneNo: Joi.string().required().max(10).min(10),
    countryCode: Joi.string().required(),
    otp: Joi.string().required()
});

const validateGetLiveLocSchemaModel = Joi.object({
    loc: Joi.object({
        lat: Joi.string().required(),
        long: Joi.string().required()
    })
});

const validateRegisterDriverSchema = (driverInfo) => {
    return validateRegisterDriverSchemaModel.validate(driverInfo);
};

const validateLoginDriverSchema = (driverInfo) => {
    return validateLoginDriverSchemaModel.validate(driverInfo);
};

const validateUpdateOrderStatusSchema = (driverInfo) => {
    return validateUpdateOrderStatusSchemaModel.validate(driverInfo);
};

const validateupdateDriverInfoSchema = (driverInfo) => {
    return validateupdateDriverInfoSchemaModel.validate(driverInfo);
};

const validateVerifyEmailOtpSchema = (driverInfo) => {
    return validateVerifyEmailOtpSchemaModel.validate(driverInfo);
}

const validateSendEmailOtpSchema = (driverInfo) => {
    return validateSendEmailOtpSchemaModel.validate(driverInfo);
}

const validateSendOtpSchema = (driverInfo) => {
    return validateSendOtpSchemaModel.validate(driverInfo);
}

const validateVerifyOtpSchema = (driverInfo) => {
    return validateVerifyOtpSchemaModel.validate(driverInfo);
}

const validateGetLiveLocSchema = (driverInfo) => {
    return validateGetLiveLocSchemaModel.validate(driverInfo);
}

module.exports = {
    validateRegisterDriverSchema,
    validateLoginDriverSchema,
    validateUpdateOrderStatusSchema,
    validateupdateDriverInfoSchema,
    validateSendEmailOtpSchema,
    validateVerifyEmailOtpSchema,
    validateSendOtpSchema,
    validateVerifyOtpSchema,
    validateGetLiveLocSchema
}