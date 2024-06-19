const Driver = require("../model/drivers.model");

const index = async (req, res) => {
  try {
    const drivers = await Driver.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: drivers,
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
    //Storing data to Driver
    const driver = await Driver.query().insert({
      name: req.body.name,
      picture: req.file.filename,
    });

    res.status(200).json({
      status: 200,
      message: "Supir telah berhasil ditambah!",
      data: driver,
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
    const driver = await Driver.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: driver,
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
    const driver = await Driver.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
      });

    if(req.file){
      await Driver.query()
        .findById(req.params.id)
        .patch({
          picture: req.file.filename,
        });
    }

    res.status(200).json({
      status: 200,
      message: "Supir telah berhasil diedit!",
      data: driver,
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
    const driver = await Driver.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Supir telah berhasil dihapus!",
      data: driver,
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
