const Joi = require('joi');

const validateAddOrderSchemaModel = Joi.object({
    address: Joi.object({
        name: Joi.string().required(),
        phoneNo: Joi.string(),
        myself: Joi.boolean().required(),
        saveAs: Joi.string().required(),
        houseNo: Joi.string().required(),
        area: Joi.string().required(),
        directions: Joi.string().required(),
        location: Joi.object({
            coordinates: Joi.array().required().items(Joi.string())
        })
    }).required(),
    orderDetails: Joi.object({
        restaurantId: Joi.string().required(),
        cart: Joi.array().items(Joi.object({
            item: Joi.object({
                dish: Joi.string().required(),
                quantity: Joi.string().required(),
            }).required(),
        })),
    }).required()
});

const validateDeleteOrderSchemaModel = Joi.object({
    orderId: Joi.string().required()
});

const validateGetOrderSchemaModel = Joi.object({
    phoneNo: Joi.string().required()
});

const validategetForRestaurantSchemaModel = Joi.object({
    restaurantId: Joi.string().required()
});



const validateAssignOrderSchemaModel = Joi.object({
    _id: Joi.string().required(),
    assignedTo: Joi.string(),
    status: Joi.string(),
    expectedTime: Joi.string(),
    deliveredTime: Joi.string()
});

const validateAddOrderSchema = (orderInfo) => {
    return validateAddOrderSchemaModel.validate(orderInfo);
};

const validateDeleteOrderSchema = (orderInfo) => {
    return validateDeleteOrderSchemaModel.validate(orderInfo);
};

const validateGetOrderSchema = (orderInfo) => {
    return validateGetOrderSchemaModel.validate(orderInfo);
};

const validateAssignOrderSchema = (orderInfo) => {
    return validateAssignOrderSchemaModel.validate(orderInfo);
};

const validategetForRestaurantSchema = (orderInfo) => {
    return validategetForRestaurantSchemaModel.validate(orderInfo);
}

module.exports = {
    validateAddOrderSchema,
    validateDeleteOrderSchema,
    validateGetOrderSchema,
    validateAssignOrderSchema,
    validategetForRestaurantSchema,
}