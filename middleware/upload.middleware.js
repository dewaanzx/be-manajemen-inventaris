const multer = require('multer');

const carStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cars/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const carUpload = multer({ storage: carStorage });


const carTransactionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cars booking/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const carTransactionUpload = multer({ storage: carTransactionStorage });


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
  carUpload,
  carTransactionUpload,
  driverUpload,
  roomUpload,
  userUpload,
};