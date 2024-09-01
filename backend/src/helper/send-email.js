require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    logger: {
        log: () => {} // Empty function to suppress logs
    }
});

// Configure AWS SDK with the provided credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION // Make sure to set the correct AWS region
});

// Create a new SES object
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

/**
 * Sends an email using AWS SES.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The OTP code to send.
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
async function sendOtpEmail(email, otp) {
    const params = {
        Source: 'quangdk98lhp@gmail.com', // Verified sender email address
        Destination: {
            ToAddresses: [email] // Recipient address
        },
        Message: {
            Subject: {
                Data: 'Mã OTP đăng kí tài khoản'
            },
            Body: {
                Text: {
                    Data: `Mã otp của bạn là: ${otp}. Nó sẽ hết hiệu lực trong vòng 60 giây kể từ bây giờ`
                }
            }
        }
    };

    try {
        const result = await ses.sendEmail(params).promise();
        return result;
    } catch (err) {
        console.error('Error sending OTP email:', err);
        throw new Error('Email sending failed');
    }
}

module.exports = {
    sendOtpEmail
};
