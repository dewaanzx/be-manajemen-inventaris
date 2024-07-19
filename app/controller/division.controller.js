const Division = require("../model/divisions.model");

const nonSelected = async (req, res) => {
  try {
    const divisions = await Division.query().where('name', '!=', req.params.name);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: divisions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const index = async (req, res) => {
  try {
	const counts = {};
    const divisions = await Division.query();

	counts.countDivision = divisions.length;

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: divisions,
      count: counts,
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
    const division = await Division.query().insert({
      name: req.body.name.toLowerCase(),
    });

    res.status(200).json({
      status: 200,
      message: "Divisi telah berhasil ditambah!",
      data: division,
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
    const division = await Division.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: division,
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
    const division = await Division.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name.toLowerCase(),
      });

    res.status(200).json({
      status: 200,
      message: "Divisi telah berhasil diedit!",
      data: division,
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
    const division = await Division.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Divisi telah berhasil dihapus!",
      data: division,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  nonSelected,
  index,
  store,
  show,
  update,
  destroy,
};
