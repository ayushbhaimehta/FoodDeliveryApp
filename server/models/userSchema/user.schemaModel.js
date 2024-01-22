const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
// });
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     // result == true
// });

const mongoUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    address: [
        {
            name: String,
            phoneNo: String,
            myself: Boolean,
            saveAs: String,
            houseNo: String,
            area: String,
            directions: String,
            location: {
                type: String,
                coordinates: [String]
            }
        }
    ]
});

const UserModel = mongoose.model('User', mongoUserSchema);

module.exports = {
    UserModel,
}
