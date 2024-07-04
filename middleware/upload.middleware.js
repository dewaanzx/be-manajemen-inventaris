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


const driverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/drivers/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const driverUpload = multer({ storage: driverStorage });


const roomStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/rooms/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const roomUpload = multer({ storage: roomStorage });


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
  driverUpload,
  roomUpload,
  userUpload,
};