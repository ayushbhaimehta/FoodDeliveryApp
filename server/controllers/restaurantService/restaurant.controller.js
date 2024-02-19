const restaurantValidator = require('../../models/validation/restaurant.validator.js');
const {
    RestaurantModel,
} = require('../../models/restaurantSchema/restaurant.schemaModel.js');
const restaurantDao = require('../../dao/restaurant.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('restaurantController');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const verifySid = process.env.verifySid;
const { isNotValidSchema } = require('../../utils/notValid.js');
const { userExistsByPhone, restaurantExistsByPhone } = require('../../utils/userHelp.js');
const { getDistanceFromLatLonInKm } = require('../../utils/distanceAlgo.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const Upload = multer({ storage: storage });
const jwt = require('jsonwebtoken');
const secretKey = "112233";
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

async function Testing(req, res) {
    const lat1 = '30.7540247';
    const long1 = '76.7689172';
    const lat2 = '30.7662891';
    const long2 = '76.7861754';

    try {
        const data = getDistanceFromLatLonInKm(lat1, long1, lat2, long2);
        console.log({ data });
        return res.status(200).send({
            message: 'Testing endpoint'
        })
    } catch (err) {
        console.log({ err });
        return res.status(400).send({
            message: 'something went wrong'
        })
    }
}

async function tester(req, res) {
    const payload = req.body;
    console.log({ req });
    return res.status(200).send({
        message: 'testing phase'
    })
}


async function updateNameController(req, res) {
    let loginInfo = req.body;
    let { error } = restaurantValidator.validateUpdateNameSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    const result = await restaurantDao.updateNameDao(loginInfo, res);
    return result;
}

async function getByPhoneController(req, res) {
    let loginInfo = req.params;
    let { error } = restaurantValidator.validateGetByPhoneNoSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await restaurantDao.getByPhoneDao(loginInfo, res);
    return result;
}

async function updateAddressController(req, res) {
    let loginInfo = req.body;
    let { error } = restaurantValidator.validateUpdateAddressSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    const result = await restaurantDao.updateAddressDao(loginInfo, res);
    return result;
}

async function addMenuController(req, res) {
    // let imageUploadObject;
    // console.log({ req });
    // if (!req.file) {
    //     return res.json({
    //         success: false,
    //         message: "You must provide at least 1 file"
    //     });
    // }
    // else {
    //     imageUploadObject = {
    //         file: {
    //             data: req.file.buffer,
    //             contentType: req.file.mimetype
    //         },
    //     };
    // }
    let loginInfo = req.body;
    let { error } = restaurantValidator.validateAddMenuSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    // loginInfo.menu.img = imageUploadObject;
    const result = await restaurantDao.addMenuDao(loginInfo, res);
    return result;
}

async function addImgController(req, res) {
    let loginInfo = req.body;
    let { error } = restaurantValidator.validateAddImgSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    loginInfo.phoneNo = req.phoneNo;
    // loginInfo.menu.img = imageUploadObject;
    const result = await restaurantDao.addImgDao(loginInfo, res);
    return result;
}

async function updateMenuController(req, res) {
    const loginInfo = req.body;
    let { error } = restaurantValidator.validateUpdateMenuSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await restaurantDao.updateMenuDao(loginInfo, res);
    return result;
}

async function deleteMenuController(req, res) {
    const loginInfo = req.body;
    let { error } = restaurantValidator.validateDeleteMenuSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await restaurantDao.deleteMenuDao(loginInfo, res);
    return result;
}

async function sendOtpController(req, res) {
    const loginInfo = req.body;
    let { error } = restaurantValidator.validateSendOtpSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    try {
        // send otp service
        log.info(client)
        const otpResponse = await client.verify.v2
            .services(verifySid)
            .verifications.create({
                to: `+${loginInfo.countryCode}${loginInfo.phoneNo}`,
                channel: 'sms',
            })
        console.log(otpResponse);
        log.success(`Sucessfully sent the otp to phoneNo ${loginInfo.phoneNo}`);
        res.status(200).send({
            message: 'Otp Sent to phoneNo' + loginInfo.phoneNo,
            result: otpResponse
        })
    } catch (error) {
        // error in sending the otp using twilio
        log.error(`Error in sending the otp using twilio for phone No ${loginInfo.phoneNo}`)
        return res.status(400).send({
            message: 'Error in sending otp!'
        })
    }
}

async function verifyOtpController(req, res) {
    const loginInfo = req.body;
    const otp = loginInfo.otp;
    let { error } = restaurantValidator.validateVerifyOtpSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    try {
        const verifiedResponse = await client.verify.v2.services(verifySid)
            .verificationChecks
            .create({ to: `${loginInfo.countryCode}${loginInfo.phoneNo}`, code: otp });

        if (verifiedResponse.status === 'approved') {
            log.info(`Successfully verified`);
            const jwtToken = jwt.sign(
                {
                    "phoneNo": loginInfo.phoneNo,
                    // "role": 'restaurant'
                },
                secretKey,
                // { expiresIn: "1d" }
            );
            res.header('auth', jwtToken);

            const existingUser = await restaurantExistsByPhone(loginInfo.phoneNo);
            log.info(existingUser);
            if (existingUser) {
                // already exists login page redirect
                if (!existingUser.restaurantName) {
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
                    let newUser = new RestaurantModel({
                        restaurantName: '',
                        email: '',
                        phoneNo: loginInfo.phoneNo,
                        address: {},
                        menu: [],
                        img: ""
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
    getByPhoneController,
    updateNameController,
    updateAddressController,
    addMenuController,
    Testing,
    tester,
    addImgController,
    updateMenuController,
    deleteMenuController
};