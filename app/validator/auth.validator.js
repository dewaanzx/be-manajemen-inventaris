const { check, validationResult } = require("express-validator");

const login = [
  check("email").not().isEmpty().withMessage("Email tidak boleh kosong!"),
  check("password").not().isEmpty().withMessage("Password tidak boleh kosong!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const register = [
  check("name").not().isEmpty().withMessage("Nama tidak boleh kosong!"),
  check("email").not().isEmpty().withMessage("Email tidak boleh kosong!"),
  check("password").not().isEmpty().withMessage("Password tidak boleh kosong!"),
  check("phone").not().isEmpty().withMessage("Telepon tidak boleh kosong!"),
  check("division").not().isEmpty().withMessage("Divisi tidak boleh kosong!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const forgotPassword = [
  check("email").not().isEmpty().withMessage("Email tidak boleh kosong!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const resetPassword = [
  check("password").not().isEmpty().withMessage("Password tidak boleh kosong!"),
  check("repeatpassword").not().isEmpty().withMessage("Password tidak boleh kosong!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
