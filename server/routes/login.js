var express = require('express');
var nodemailer = require('nodemailer');
var loginRouter = express.Router();
var crypto = require('crypto');

var userModel = require('../model/user.js');

loginRouter.post('/registration', function(req, res, next) {
    userModel.create(req.body, function(err, data) {
        if (err) {
            next(err);
        }

        // send email
        sendResetEmail(req.body.email, req)

        res.json(data);
    });
});

function sendResetEmail(userEmail, req, next) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'rubygarag@gmail.com',
            pass: 'weekpassword'
        },
        secureConnection: true
    });
    var token = crypto.randomBytes(16).toString('hex');

    smtpTransport.sendMail({ //email options
        from: "Fullstuck-js mailer <rubygarag@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
        to: userEmail, // receiver
        subject: "Registration confirmation", // subject
        text: 'You are receiving this because you (or someone else) have registered at rubygarage-fullstack-js.heroku.com.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/confirm/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }, function(error, response) { //callback
        if (error) {
            console.log('error', error);
            return next(err);
        } else {
            userModel.findOneAndUpdate({
                'email': userEmail
            }, {
                $set: {
                    'registration-key': token
                }
            }, {upsert:true}, function(error, doc) { });
        }
        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });

}

module.exports = loginRouter;