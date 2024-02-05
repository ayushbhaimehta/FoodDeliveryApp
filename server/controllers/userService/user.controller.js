const userValidator = require('../../models/validation/user.validator.js');
const {
    UserModel,
} = require('../../models/userSchema/user.schemaModel.js');
const userDao = require('../../dao/user.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('userController');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sendOTPSID = process.env.sendOTPSID;
// const verifyOTPSID = process.env.verifyOTPSID;
const { isNotValidSchema } = require('../../utils/notValid.js');
const { userExistsByPhone } = require('../../utils/userHelp.js');
const jwt = require('jsonwebtoken');
const secretKey = "112233";
const axios = require('axios');


async function addAddressController(req, res) {
    let loginInfo = req.body;
    let { error } = userValidator.validateAddAddressSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    const result = await userDao.addAddressDao(loginInfo, res);
    return result;
}

async function getAllRestaurantsController(req, res) {
    let addressInfo = req.body;
    let { error } = userValidator.validateGetAddressSchema(addressInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await userDao.getAllRestaurantsDao(addressInfo, res);
    return result;
}

async function getUserLocationController(req, res) {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const API_KEY = process.env.API_KEY;
    const response = await axios({
        method: 'get',
        url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`,
    });
    return res.status(200).send({
        result: response.data.results
    })
}

async function updateAddressController(req, res) {
    let loginInfo = req.body;
    let { error } = userValidator.validateUpdateAddressSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    const result = await userDao.updateAddressDao(loginInfo, res);
    return result;
}

async function updateNameController(req, res) {
    let loginInfo = req.body;
    let { error } = userValidator.validateUpdateNameSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    const result = await userDao.updateNameDao(loginInfo, res);
    return result;
}

async function getByPhoneController(req, res) {
    let loginInfo = req.params;
    let { error } = userValidator.validateGetByPhoneNoSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await userDao.getByPhoneDao(loginInfo, res);
    return result;
}

async function sendOtpController(req, res) {
    const OtpInfo = req.body;
    let { error } = userValidator.validateSendOtpSchema(OtpInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    try {
        // send otp service
        log.info(client)
        const otpResponse = await client.verify.v2
            .services(sendOTPSID)
            .verifications.create({
                to: `+${OtpInfo.countryCode}${OtpInfo.phoneNo}`,
                channel: 'sms',
            })
        console.log(otpResponse);
        log.success(`Sucessfully sent the otp to phoneNo ${OtpInfo.phoneNo}`);
        res.status(200).send({
            message: 'Otp Sent to phoneNo' + OtpInfo.phoneNo,
            result: otpResponse
        })
    } catch (error) {
        // error in sending the otp using twilio
        log.error(`Error in sending the otp using twilio for phone No ${OtpInfo.phoneNo}`)
        return res.status(400).send({
            message: 'Error in sending otp!'
        })
    }
}

async function verifyOtpController(req, res) {
    const OtpInfo = req.body;
    const otp = OtpInfo.otp;
    let { error } = userValidator.validateVerifyOtpSchema(OtpInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    try {
        const verifiedResponse = await client.verify.v2.services(sendOTPSID)
            .verificationChecks
            .create({ to: `${OtpInfo.countryCode}${OtpInfo.phoneNo}`, code: otp });

        if (verifiedResponse.status === 'approved') {
            log.info(`Successfully verified`);
            const jwtToken = jwt.sign(
                {
                    "phoneNo": OtpInfo.phoneNo
                },
                secretKey
                // { expiresIn: "1d" }
            );
            res.header('auth', jwtToken);

            const existingUser = await userExistsByPhone(OtpInfo.phoneNo);
            log.info(existingUser);
            if (existingUser) {
                // already exists login page redirect
                if (!existingUser.name) {
                    return res.status(200).send({
                        message: 'add name and email',
                        exist: false
                    });
                }
                else {
                    return res.status(200).send({
                        message: 'logged in!',
                        exist: true
                    });
                }
            }
            else {
                // new user 
                try {
                    let newUser = new UserModel({
                        name: '',
                        email: '',
                        phoneNo: OtpInfo.phoneNo,
                        address: []
                    });

                    await newUser.save();

                    log.info(`Successfully saved the phoneNo into the db`);
                    return res.status(200).send({
                        message: 'Phone no saved in the db!',
                        exist: false
                    });
                } catch (err) {
                    log.error(`Error in saving new phoneNo into the db: ${err}`);
                    return res.status(500).send({
                        message: 'Error in saving phoneNo'
                    });
                }
            }
            // return res.status(200).send({
            //     message: 'Testing mode'
            // })
        }
        else {
            res.status(400).send({
                message: 'Wrong otp entered'
            })
        }

    } catch (error) {
        log.error(`Error in verifing the otp` + error);
        res.status(404).send({
            message: 'Wrong otp'
        })
    }
}

module.exports = {
    sendOtpController,
    verifyOtpController,
    updateNameController,
    addAddressController,
    updateAddressController,
    getByPhoneController,
    getUserLocationController,
    getAllRestaurantsController
};