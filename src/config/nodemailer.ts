import nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lamont.feest@ethereal.email',
        pass: 'VCK6F4Y5eWu25cs72G'
    }

    
});

transporter.verify().then(()=>{
    console.log('listo para enviar email')
  })
