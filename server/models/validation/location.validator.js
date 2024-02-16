const Joi = require('joi');

const validateGetLiveLocSchemaModel = Joi.object({
    location: Joi.string().required()
});

const validateGetLiveLocSchema = (driverInfo) => {
    return validateGetLiveLocSchemaModel.validate(driverInfo);
};

module.exports = {
    validateGetLiveLocSchema
}