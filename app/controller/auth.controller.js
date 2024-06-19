const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../model/user.model");
const transporter = require("../../config/mailer.js");
const crypto = require('crypto');

const login = async (req, res) => {
  try {
    const user = await User.query()
      .select([
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.phone",
        "users.division",
        "users.role",
        "users.status",
        "users.created_at",
        "users.updated_at",
      ])
      .where("email", req.body.email)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query()
        .select([
          "users.id",
          "users.name",
          "users.email",
          "users.password",
          "users.phone",
          "users.division",
          "users.role",
          "users.status",
          "users.created_at",
          "users.updated_at",
        ])
        .where("id", user.id)
        .first();

      if (user.status == "unverified"){
        res.status(400).json({
          message: "Email belum diverifikasi!",
        });
      }else{
        const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
          expiresIn: "2h",
        });

        user_data.token = token;

        res.status(200).json({
          message: "Login berhasil!",
          data: user_data
        });
      }

    } else {
      res.status(400).json({
        message: "Email atau password salah!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const register = async (req, res) => {
  try {
    let emailCheck = await User.query().where("email", req.body.email).first();
    if (emailCheck) {
      return res.status(400).json({
        status: 400,
        message: "Email tidak tersedia!",
      });
    }

    let phoneCheck = await User.query().where("phone", req.body.phone).first();
    if (phoneCheck) {
      return res.status(400).json({
        status: 400,
        message: "Nomor telepon tidak tersedia!",
      });
    }

    /*
    if (!/gmedia\.id$/.test(req.body.email)){
      return res.status(400).json({
        status: 400,
        message: "Email harus memiliki domain @gmedia.id!",
      });
    }
    */

    const verification_token = crypto.randomBytes(20).toString('hex');

    const user = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      phone: (req.body.phone).toString(),
      division: req.body.division,
      role: "user",
      verification_token: verification_token,
    });

    const verification_link = `http://localhost:8080/verify-email?token=${verification_token}`;
    const mail_options = {
      from: "GMedia",
      to: req.body.email,
      subject: "Verify Your Email Address",
      html: `Click <a href="${verification_link}">here</a> to verify your email address.`,
    };

    await transporter.sendMail(mail_options);

    res.status(200).json({
      status: 200,
      message: "Pendaftaran berhasil, silahkan cek email untuk verifikasi!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.query().where('verification_token', token).first();

    if (!user){
      return res.status(400).json({
        status: 400,
        message: 'Token verifikasi salah!',
      });
    }

    await User.query()
      .findById(user.id)
      .patch({
        status: "verified",
        verification_token: "",
      });

    return res.redirect('http://localhost:5173/login')

    res.status(200).json({
      status: 200,
      message: 'Email telah berhasil diverifikasi!',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error!',
    });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const user = await User.query().where('email', req.body.email).first();

    if (!user){
      return res.status(400).json({
        status: 400,
        message: 'User tidak ditemukan!',
      })
    }

    const reset_password_token = crypto.randomBytes(20).toString('hex');

    const user_patch = await User.query()
      .where('email', req.body.email)
      .patch({
        verification_token: reset_password_token,
      });

    const reset_password_link = `http://localhost:8080/reset-password?token=${reset_password_token}`;
    const mail_options = {
      from: "GMedia",
      to: req.body.email,
      subject: "Reset Your Passsword",
      html: `Click <a href="${reset_password_link}">here</a> to reset your password.`,
    };

    await transporter.sendMail(mail_options);

    res.status(200).json({
      status: 200,
      message: "Silahkan cek email untuk melanjutkan tahap reset password!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.query().where('verification_token', token).first();


    if (!user){
      return res.status(400).json({
        status: 400,
        message: 'Token reset password tidak berlaku!',
      })
    }

    if (req.body.password != req.body.repeatpassword) {
      return res.status(400).json({
        status: 400,
        message: "Password tidak sama!",
      });
    }else{
      const user_patch = await User.query()
        .findById(user.id)
        .patch({
          password: await bcrypt.hash(req.body.password, 10),
        });

      res.status(200).json({
        status: 200,
        message: "Reset password berhasil!",
        data: user,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
