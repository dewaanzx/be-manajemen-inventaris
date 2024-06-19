const { check, validationResult } = require("express-validator");

const store = [
  check("room_id").not().isEmpty().withMessage("Ruangan tidak boleh kosong!"),
  check("date").not().isEmpty().withMessage("Tanggal tidak boleh kosong!"),
  check("time_start").not().isEmpty().withMessage("Waktu mulai tidak boleh kosong!"),
  check("time_end").not().isEmpty().withMessage("Waktu selesai tidak boleh kosong!"),
  check("event").not().isEmpty().withMessage("Acara tidak boleh kosong!"),
  check("description").not().isEmpty().withMessage("Deskripsi tidak boleh kosong!"),
  check("participant").not().isEmpty().withMessage("Jumlah peserta tidak boleh kosong!"),
  check("consumption").not().isEmpty().withMessage("room tidak boleh kosong!"),
  check("note").not().isEmpty().withMessage("Catatan tidak boleh kosong!"),

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

const update = [
  check("room_id").not().isEmpty().withMessage("Ruangan tidak boleh kosong!"),
  check("date").not().isEmpty().withMessage("Tanggal tidak boleh kosong!"),
  check("time_start").not().isEmpty().withMessage("Waktu mulai tidak boleh kosong!"),
  check("time_end").not().isEmpty().withMessage("Waktu selesai tidak boleh kosong!"),
  check("event").not().isEmpty().withMessage("Acara tidak boleh kosong!"),
  check("description").not().isEmpty().withMessage("Deskripsi tidak boleh kosong!"),
  check("participant").not().isEmpty().withMessage("Jumlah peserta tidak boleh kosong!"),
  check("consumption").not().isEmpty().withMessage("room tidak boleh kosong!"),
  check("note").not().isEmpty().withMessage("Catatan tidak boleh kosong!"),
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
  update,
};
