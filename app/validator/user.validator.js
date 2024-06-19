const { check, validationResult } = require("express-validator");

const store = [
  check("name").not().isEmpty().withMessage("Nama tidak boleh kosong!"),
  check("email").not().isEmpty().withMessage("Email tidak boleh kosong!"),
  check("password").not().isEmpty().withMessage("Password tidak boleh kosong!"),
  check("phone").not().isEmpty().withMessage("Telepon tidak boleh kosong!"),
  check("role").not().isEmpty().withMessage("Role tidak boleh kosong!"),
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

const updateProfile = [
  check("name").not().isEmpty().withMessage("Nama tidak boleh kosong!"),
  check("email").not().isEmpty().withMessage("Email tidak boleh kosong!"),
  check("phone").not().isEmpty().withMessage("Telepon tidak boleh kosong!"),
  check("role").not().isEmpty().withMessage("Role tidak boleh kosong!"),
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

const updatePassword = [
  check("oldpassword").not().isEmpty().withMessage("Password lama tidak boleh kosong!"),
  check("newpassword").not().isEmpty().withMessage("Password baru tidak boleh kosong!"),

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
  store,
  updateProfile,
  updatePassword,
};
