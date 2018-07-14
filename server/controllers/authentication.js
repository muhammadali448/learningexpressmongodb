
const User = require('../models/user');

exports.signup = (req, res, next) => {
    // res.send({success: true})
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'you must provide email and password' });
    }


    // see if the user with given email exist
    // class of all Users
    User.findOne({
        email: email
    }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        // if a user with email exist return error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }
        // if a user with email doesn't exist create user save record
        const user = new User({
            email: email,
            password: password
        })
        user.save((err) => {
            if (err) {
                return next(err);
            }
            // respond the request that the user was created
            // res.json(user);
            res.json({success: true});
        });
    })
}