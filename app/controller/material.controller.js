const Material = require("../model/materials.model");

const index = async (req, res) => {
  try {
    const materials = await Material.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: materials,
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
    //Checking the material based on license
    let licenseCheck = await Material.query().where("license", req.body.license).first();
    if (licenseCheck) {
      return res.status(400).json({
        status: 400,
        message: "Nomor polisi sudah teregistrasi sebelumnya!",
      });
    }

    //Storing data to Material
    const material = await Material.query().insert({
      name: req.body.name,
      license: req.body.license,
      picture: req.file.filename,
    });

    res.status(200).json({
      status: 200,
      message: "Material telah berhasil ditambah!",
      data: material,
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
    const material = await Material.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: material,
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
    const material = await Material.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
        license: req.body.license,
      });

    if(req.file){
      await Material.query()
        .findById(req.params.id)
        .patch({
          picture: req.file.filename,
        });
    }

    res.status(200).json({
      status: 200,
      message: "Material telah berhasil diedit!",
      data: material,
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
    const material = await Material.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Material telah berhasil dihapus!",
      data: material,
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
