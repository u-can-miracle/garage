var nodemailer = require('nodemailer');
var q = require('q');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var userModel = require('../model/user.js');


module.exports = {
    getUserById: getUserById,
    getUserByUsername: getUserByUsername,
    getUserByPassword: getUserByPassword,
    getUserByEmail: getUserByEmail,
    sendEmail: sendEmail,
    getUserByHash: getUserByHash,
    updateUserEmailConfirmation: updateUserEmailConfirmation,
    ensureAuthenticated: ensureAuthenticated
};



function getUserById(id) {
    return userModel.findById(id);
}

function getUserByUsername(username) {
    return userModel.findOne({
        'local.username': username
    });
}

function getUserByEmail(email) {
    return userModel.findOne({
        'local.email': email
    });
}

function getUserByPassword(pass) {
    return userModel.findOne({
        'local.password': pass
    });
}

function getUserByHash(hash) {
    return userModel.findOne({
        'local.registrationKey': hash
    });
}

function updateUserEmailConfirmation(hash, callback) {
    var defer = q.defer();

    userModel.update({
        'local.registrationKey': hash
    }, {
        $set: {
            'local.isUserConfirmedViaEmail': true,
            'local.registrationKey': ''
        }
    }, function(err, user) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(user);
        }

        /****  For testing  ****/
        if (callback) {
            console.log('callback');
            callback(err, user);
        }
    });

    return defer.promise;
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function sendEmail(email, hash, req, next) {
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
        // text: 'You have registered at rubygarage-fullstack-js.heroku.com.\n\n'
        text: 'You are receiving this because you (or someone else) have registered at rubygarage-fullstack-js.heroku.com.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/confirm/' + hash + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }, function(error, response) { //callback
        if (error) {
            console.log('error', error);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
}

