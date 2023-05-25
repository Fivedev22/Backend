/* eslint-disable prettier/prettier */
import nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'liliana.gibson38@ethereal.email',
        pass: 'PPRfZU6uvvT5d5xG7w'
    }
});
