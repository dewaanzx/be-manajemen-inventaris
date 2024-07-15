const Material = require("../model/materials.model");

const index = async (req, res) => {
  try {
	const counts = {};
	const materials = await Material.query();

	counts.countMaterial = materials.length;

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: materials,
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
    const material = await Material.query().insert({
      name: req.body.name,
      size: req.body.size,
      quantity: req.body.quantity,
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
    const updates = {
      name: req.body.name,
      size: req.body.size,
      quantity: req.body.quantity,
    };

    if (req.file) {
      updates.picture = req.file.filename;
    }

    const material = await Material.query().findById(req.params.id).patch(updates);

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

async function increaseMaterialQuantity(materialId, amount) {
  try {
    const material = await Material.query().findById(materialId);
    const newQuantity = material.quantity + amount;
    await material.$query().patch({ quantity: newQuantity });
  } catch (error) {
    console.error(`Error increasing material quantity: ${error}`);
    throw error;
  }
}

async function decreaseMaterialQuantity(materialId, amount) {
  try {
    const material = await Material.query().findById(materialId);
    const newQuantity = material.quantity - amount;
    if (newQuantity < 0) {
      throw new Error("Insufficient material quantity");
    }
    await material.$query().patch({ quantity: newQuantity });
  } catch (error) {
    console.error(`Error decreasing material quantity: ${error}`);
    throw error;
  }
}

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
  increaseMaterialQuantity,
  decreaseMaterialQuantity,
};
