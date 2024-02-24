const driverValidator = require('../../models/validation/driver.validator.js');
const driverDao = require('../../dao/driver.dao.js');
const Logger = require('../../logger/logger.js');
const log = new Logger('driverController');
const { isNotValidSchema } = require('../../utils/notValid.js');
const { driverExistsOnlyByPhone } = require('../../utils/userHelp.js');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const verifySid = process.env.verifySid;
const sendOTPSID = process.env.verifySID;
const { UserEmailModel, DriverLocationModel } = require('../../models/driverSchema/driver.schemaModel.js')

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.EMAILPASS
    },
});
// console.log({ transporter });

async function registerDriverController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateRegisterDriverSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await driverDao.registerDriverDao(driverInfo, res);
    return result;
}

async function loginDriverController(req, res) {
    const driverInfo = req.body;
    let { error } = driverValidator.validateLoginDriverSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    const result = await driverDao.loginDriverDao(driverInfo, res);
    return result;
}

async function arrayOfAvailableDrivers(req, res) {
    try {
        const result = await DriverLocationModel.find();
        return res.status(200).send({
            message: 'Get all available Driverlocations',
            response: result
        })
    } catch (error) {
        log.error(`Something went wrong while getting available drivers ${error}`);
        return res.status(400).send({
            message: 'Something went wrong while getting available drivers'
        })
    }
}

async function addAssignOrderController(req, res) {
    const driverInfo = req.body;
    const result = await driverDao.addAssignOrderDao(driverInfo, res);
    return result;
}

async function updateDriverInfoController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateupdateDriverInfoSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    driverInfo.phoneNo = req.phoneNo;
    const result = await driverDao.updateDriverInfoDao(driverInfo, res);
    return result;
}

async function updateOrderStatusController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateUpdateOrderStatusSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    driverInfo.phoneNo = req.phoneNo;
    const result = await driverDao.updateOrderStatusDao(driverInfo, res);
    return result;
}

async function getLiveLocController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateGetLiveLocSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    driverInfo.phoneNo = req.phoneNo;
    console.log(driverInfo.phoneNo);
    const result = await driverDao.getLiveLocDao(driverInfo, res);
    return result;
}

async function getAllOrdersController(req, res) {
    let driverInfo = req.phoneNo;
    log.success('Schema Validation done');
    const result = await driverDao.getAllOrdersDao(driverInfo, res);
    return result;
}

async function sendPhoneOtpController(req, res) {
    const driverInfo = req.body;
    let { error } = driverValidator.validateSendOtpSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    try {
        // send otp service
        log.info(client)
        const otpResponse = await client.verify.v2
            .services(verifySid)
            .verifications.create({
                to: `+${driverInfo.countryCode}${driverInfo.phoneNo}`,
                channel: 'sms',
            })
        console.log(otpResponse);
        log.success(`Sucessfully sent the otp to phoneNo ${driverInfo.phoneNo}`);
        res.status(200).send({
            message: 'Otp Sent to phoneNo' + driverInfo.phoneNo,
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

async function assignAlgoRequestController(req, res) {
    const driverInfo = req.body;
    let { error } = driverValidator.validateAssignAlgoRequestSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    driverInfo.phoneNo = req.phoneNo;
    if (driverInfo.bool !== true) {
        return res.status(200).send({
            message: 'Rejected Order'
        })
    }
    const result = await driverDao.assignAlgoRequestDao(driverInfo, res);
    return result;
}

async function verifyPhoneOtpController(req, res) {
    const driverInfo = req.body;
    const otp = driverInfo.otp;
    let { error } = driverValidator.validateVerifyOtpSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');
    try {
        const verifiedResponse = await client.verify.v2.services(sendOTPSID)
            .verificationChecks
            .create({ to: `${driverInfo.countryCode}${driverInfo.phoneNo}`, code: otp });

        if (verifiedResponse.status === 'approved') {
            log.info(`Successfully verified`);

            const existingDriver = await driverExistsOnlyByPhone(driverInfo.phoneNo);
            log.info(existingDriver);
            if (existingDriver) {
                // already exists login page redirect
                return res.status(401).send({
                    message: 'An account already exists with this phone!',
                    exist: true
                });
            }
            else {
                return res.status(200).send({
                    message: 'Otp verified'
                });
            }
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

async function sendEmailOtpController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateSendEmailOtpSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');

    const email = driverInfo.email;
    try {
        const emailOtp = otpGenerator.generate(6,
            { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        var mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: 'Food Delivery Email Verification',
            text: emailOtp
        };
        console.log("checkpoint 11");
        try {
            const response = await transporter.sendMail(mailOptions);
            const result = await UserEmailModel.findOne({ email: email });
            if (!result) {
                console.log({ response });
                log.success('Email sent: ' + response.response);
                const newEmailVerification = new UserEmailModel({
                    email: email,
                    emailOtp: emailOtp,
                });
                try {
                    await newEmailVerification.save();
                    log.success(`Successfully saved the email verification`);
                    return res.status(200).send({
                        message: `Successfully saved otp and email for verification`
                    })
                } catch (error) {
                    log.error(`Error in saving the otp details in the db ${error}`);
                    return res.status(500).send({
                        message: 'Something went wrong while saviong the otp'
                    })
                }
            }
            else {
                try {
                    await UserEmailModel.findOneAndUpdate({ email: email }, { emailOtp: emailOtp })
                    log.info('Successfully updated emailotp');
                    return res.status(200).send({
                        message: 'Updated the email otp'
                    });
                } catch (error) {
                    log.error(`Something went wrong while uodating the email otp ${error}`);
                    return res.status(500).send({
                        message: 'Somethig went wrong whil euodating the email otp'
                    })
                }
            }
        } catch (error) {
            log.error(`Something went wrong while sending email ${error}`);
            return res.status(500).send({
                message: 'Something went wrong while sending email'
            })
        }
    } catch (error) {
        console.log(`Error in sending the otp nodemailer for username recipient ${error}`)
        return res.status(400).send({
            message: 'transport or otp generator not working'
        })
    }
}

async function verifyEmailOtpController(req, res) {
    let driverInfo = req.body;
    let { error } = driverValidator.validateVerifyEmailOtpSchema(driverInfo);
    if (isNotValidSchema(error, res)) return;
    log.success('Schema Validation done');

    const email = driverInfo.email;
    const emailOtp = driverInfo.emailOtp;

    try {
        const response = await UserEmailModel.findOne({ email: email });
        if (response.emailOtp !== emailOtp) {
            log.info(`Otp not matching`);
            return res.status(400).send({
                message: 'Wrong otp entered'
            });
        }
        else {
            try {
                await UserEmailModel.findOneAndDelete({ email: email });
                log.success('Successfully deleted the email otp from the db');
                return res.status(200).send({
                    message: 'Otp verified for email'
                })
            } catch (error) {
                log.error(`Error while deleting otp from the db ${error}`);
                return res.status(500).send({
                    message: 'Something went wrong with clearing otp from db'
                })
            }
        }
    } catch (error) {
        log.error(`Something went wrong while finding the email otp for the recieient ${error}`)
        return res.status(500).send({
            message: 'Something went wrong while verifying otp'
        });
    }
}

module.exports = {
    registerDriverController,
    loginDriverController,
    updateOrderStatusController,
    getAllOrdersController,
    updateDriverInfoController,
    addAssignOrderController,
    getLiveLocController,
    sendEmailOtpController,
    verifyEmailOtpController,
    sendPhoneOtpController,
    verifyPhoneOtpController,
    arrayOfAvailableDrivers,
    assignAlgoRequestController,
};