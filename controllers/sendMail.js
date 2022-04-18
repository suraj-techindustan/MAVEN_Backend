// const { Otp } = require("../Models/otp");
const sgMail = require('@sendgrid/mail');



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (sendTo, subject, template, text) => {
    const email = process.env.SENDGRID_FROM_EMAIL || ''
    const name = process.env.SENDGRID_FORM_NAME || ''
    const msg = {
        to: sendTo,
        from: {
            email,
            name
        },
        subject: subject,
        // text: text,
        html: template, // html body
    };
    try {
        await sgMail.send(msg);
        console.log('Email sent to ', sendTo)
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }
}
// module.exports = sendEmail;