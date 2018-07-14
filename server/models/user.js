const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})

// encrypt password

// before saving a model run this
UserSchema.pre('save', (next) => {
    // get access to user particular user
    const user = this;

    // generate a salt and than callback
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        // hash our password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            user.password = hash;
            next();
        })
    })
})

const UserModel = mongoose.model('userscollection', UserSchema);

module.exports = UserModel;



