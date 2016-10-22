var nodemailer = require('nodemailer');
var crypto = require('crypto');
var q = require('q');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var userModel = require('../model/user.js');


module.exports = {
	isUsernameExist: isUsernameExist,
	isEmailExist: isEmailExist,
	sendEmail: sendEmail
};

function isUsernameExist(username){
	return userModel.findOne({
            username: username
        });
}

function isEmailExist(email){
	return userModel.findOne({
            email: email
        });
}

function sendEmail(email, req, next){
	var token = crypto.randomBytes(16).toString('hex');
    var smtpTransport = nodemailer.createTransport("SMTP", {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'rubygarag@gmail.com',
            pass: 'weekpassword'
        },
        secureConnection: true
    });

    smtpTransport.sendMail({ //email options
        from: "FullStack-js mailer <rubygarag@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
        to: email, // receiver
        subject: "Fullstack-js registration", // subject
        text: 'You are receiving this because you (or someone else) have registered at rubygarage-fullstack-js.heroku.com.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/confirm/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }, function (error, response) { //callback
        if (error) {
            console.log('error', error);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
}