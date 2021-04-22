const ContactInfo = require('../models/Contact');
const EmailInfo = require('../models/Email');
const nodemailer = require("nodemailer");

exports.postContacts = (req, res, next) => {

    const contact = new ContactInfo({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
    console.log(contact);

    contact.save()
        .then(result => {
            res.redirect('/');
        }).catch(err => console.log(err));
}

exports.postEmail = (req, res, next) => {
    const email = new EmailInfo({
        email: req.body.email
    });

    email.save()
        .then(result => {
            res.redirect('/');
        }).catch(err => console.log(err));
}

exports.sendEmail = async(req, res, next) => {

    // If we get an actual mail server:
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.sparkpostmail.com",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'SMTP_Injection', // generated ethereal user
    //         pass: 'a11a0f83f3ea5455ece3b4830769edfaf8bbbc55', // generated ethereal password
    //     },
    // });
    nodemailer.createTestAccount(async(err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@nanua.com>', // sender address
            to: "spakaashnidhiss@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        res.send('<h1>Email sent :)<h1>')
    });



}