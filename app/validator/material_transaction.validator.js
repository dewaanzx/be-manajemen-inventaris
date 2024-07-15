const { check, validationResult } = require("express-validator");

const store = [
  check("date").not().isEmpty().withMessage("Tanggal tidak boleh kosong!"),
  check("time").not().isEmpty().withMessage("Waktu tidak boleh kosong!"),
  check("destination").not().isEmpty().withMessage("Tujuan tidak boleh kosong!"),
  check("description").not().isEmpty().withMessage("Deskripsi tidak boleh kosong!"),

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

const adminUpdate = [
  check("date").not().isEmpty().withMessage("Tanggal tidak boleh kosong!"),
  check("time").not().isEmpty().withMessage("Waktu tidak boleh kosong!"),
  check("destination").not().isEmpty().withMessage("Tujuan tidak boleh kosong!"),
  check("description").not().isEmpty().withMessage("Deskripsi tidak boleh kosong!"),
  check("status").not().isEmpty().withMessage("Status tidak boleh kosong!"),

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
  adminUpdate,
};
