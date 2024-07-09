const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dewabandis11@student.uns.ac.id',
    pass: 'wcvl tmbw pdjw ilmz',
  },
});

module.exports = transporter;