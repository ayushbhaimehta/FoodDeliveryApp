const Joi = require('joi');

const validateRegisterDriverSchemaModel = Joi.object({
    phoneNo: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
});

const validateLoginDriverSchemaModel = Joi.object({
    phoneNo: Joi.string().required(),
    password: Joi.string().required()
});

const validateUpdateOrderStatusSchemaModel = Joi.object({
    orderId: Joi.string().required(),
    newStatus: Joi.string().required()
});

const validateAddAssignOrderSchemaModel = Joi.object({
    driverId: Joi.string().required(),
    orderDetails: Joi.object({
        orderId: Joi.string().required(),
        userId: Joi.string().required(),
        address: Joi.string().required(),
        // orderDetails:
    })
});

const validateupdateDriverInfoSchemaModel = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
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

const validateAddAssignOrderSchema = (driverInfo) => {
    return validateAddAssignOrderSchemaModel.validate(driverInfo);
};

module.exports = {
    validateRegisterDriverSchema,
    validateLoginDriverSchema,
    validateUpdateOrderStatusSchema,
    validateupdateDriverInfoSchema,
    validateAddAssignOrderSchema
}