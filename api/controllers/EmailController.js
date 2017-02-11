'use strict';
var nodemailer = require('nodemailer');

module.exports = {

  testEmail: function(req, res) {


    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
            user: 'paladinze@hotmail.com',
            pass: '921020'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"ze 👻" <admin@huoshui.org>', // sender address
        to: 'paladinze@hotmail.com', // list of receivers
        subject: 'A love letter from Ze', // Subject line
        text: 'Some text', // plain text body
        html: 'some HTML</br>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        res.ok("Email sent!");
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }




};
