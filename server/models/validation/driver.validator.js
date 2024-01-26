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

const validateGetAllOrderSchemaModel = Joi.object({
    phoneNo: Joi.string().required()
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

const validateGetAllOrderSchema = (driverInfo) => {
    return validateGetAllOrderSchemaModel.validate(driverInfo);
};

module.exports = {
    validateRegisterDriverSchema,
    validateLoginDriverSchema,
    validateUpdateOrderStatusSchema,
    validateGetAllOrderSchema
}