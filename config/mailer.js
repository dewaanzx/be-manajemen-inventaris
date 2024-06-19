const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chirush@student.uns.ac.id',
    pass: 'lnao itxo uief gzwl',
  },
});

module.exports = transporter;