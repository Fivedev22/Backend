import nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jensen.wilderman3@ethereal.email',
        pass: 'rqTwRbgkaA7Y89F8XA'
    }

    
});

transporter.verify().then(()=>{
    console.log('listo para enviar email')
  })
