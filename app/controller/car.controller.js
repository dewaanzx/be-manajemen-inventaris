const Car = require("../model/cars.model");

const index = async (req, res) => {
  try {
    const cars = await Car.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: cars,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    //Checking the car based on license
    let licenseCheck = await Car.query().where("license", req.body.license).first();
    if (licenseCheck) {
      return res.status(400).json({
        status: 400,
        message: "Nomor polisi sudah teregistrasi sebelumnya!",
      });
    }

    //Storing data to Car
    const car = await Car.query().insert({
      name: req.body.name,
      license: req.body.license,
      picture: req.file.filename,
    });

    res.status(200).json({
      status: 200,
      message: "Mobil telah berhasil ditambah!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  try {
    const car = await Car.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const car = await Car.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
        license: req.body.license,
      });

    if(req.file){
      await Car.query()
        .findById(req.params.id)
        .patch({
          picture: req.file.filename,
        });
    }

    res.status(200).json({
      status: 200,
      message: "Mobil telah berhasil diedit!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const car = await Car.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Mobil telah berhasil dihapus!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};


module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
