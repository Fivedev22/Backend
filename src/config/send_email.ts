const nodemailer = require('nodemailer');

  export const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abel.am91@gmail.com',
      pass: 'jsuwgqqlqncpugvu',
    }
  });


 
