const multer = require('multer');

const materialStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/materials/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const materialUpload = multer({ storage: materialStorage });


const materialTransactionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/materials booking/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const materialTransactionUpload = multer({ storage: materialTransactionStorage });

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const userUpload = multer({ storage: userStorage });

module.exports = {
  materialUpload,
  materialTransactionUpload,
  userUpload,
};