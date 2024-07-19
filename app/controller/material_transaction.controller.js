const Material = require("../model/materials.model.js");
const MaterialTransaction = require("../model/material_transactions.model.js");
const User = require("../model/user.model.js");
const Notification = require("../model/notifications.model.js");
const transporter = require("../../config/mailer.js");
const { increaseMaterialQuantity, decreaseMaterialQuantity } = require('./material.controller.js');

const index = async (req, res) => {
  try {
    const user_role = req.user.role;
    let material_transactions = [];

    if (user_role === "User") {
      const user_id = req.user.id;
      material_transactions = await MaterialTransaction.query().where('user_id', user_id).orderBy('id', 'desc');
    } else {
      material_transactions = await MaterialTransaction.query().orderBy('id', 'desc');
    }

    for (const item of material_transactions) {
      const datetime = new Date(item.datetime.getTime() + (7 * 60) * 60000).toISOString();
      let date_start = datetime.split('T')[0];
      let time_start = datetime.split('T')[1].split('.000Z')[0];

	  const user_id = item.user_id;
	  const material_id = item.material_id;

	  let data_user = await User.query().where('id', user_id).first();
	  let data_material = await Material.query().where('id', material_id).first();
	  
	  item.user_name = data_user.name;
	  item.material_name = data_material.name;
      item.date_start = date_start;
      item.time_start = time_start;
    }

    res.status(200).json({ status: 200, message: "OK!", data: material_transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const showByStatus = async (req, res) => {
  try {
    const user_role = req.user.role;
    let material_transactions = [];
    const status = req.params.status;

    if (user_role === "User") {
      const user_id = req.user.id;
      material_transactions = status === "Semua"
        ? await MaterialTransaction.query().where('user_id', user_id).orderBy('id', 'desc')
        : await MaterialTransaction.query().where('user_id', user_id).where('status', status).orderBy('id', 'desc');
    } else {
      material_transactions = status === "Semua"
        ? await MaterialTransaction.query().orderBy('id', 'desc')
        : await MaterialTransaction.query().where('status', status).orderBy('id', 'desc');
    }

    for (const item of material_transactions) {
      const datetime = new Date(item.datetime.getTime() + (7 * 60) * 60000).toISOString();
      let date_start = datetime.split('T')[0];
      let time_start = datetime.split('T')[1].split('.000Z')[0];

	  const user_id = item.user_id;
	  const material_id = item.material_id;

	  let data_user = await User.query().where('id', user_id).first();
	  let data_material = await Material.query().where('id', material_id).first();
		
	  item.user_name = data_user.name;
	  item.material_name = data_material.name;
      item.date_start = date_start;
      item.time_start = time_start;
    }

    res.status(200).json({ status: 200, message: "OK!", data: material_transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const store = async (req, res) => {
  try {
    const datetime = req.body.date + " " + req.body.time;
	console.log(req.body.material_id);

    const material_transaction = await MaterialTransaction.query().insert({
      user_id: req.user.id,
      datetime: datetime,
      destination: req.body.destination,
      description: req.body.description,
      material_id: req.body.material_id,
      status: req.body.status,
    });

    if (req.body.material_id) {
      await decreaseMaterialQuantity(req.body.material_id, 1);
    }

    const notification_message = req.body.status === "Diterima"
      ? `Permintaan Pengambilan Material ${req.body.destination} telah diterima!`
      : `Permintaan Pengambilan Material ${req.body.destination} telah dibuat!`;

    await Notification.query().insert({
      user_id: material_transaction.user_id,
      transaction_id: material_transaction.id,
      notification: notification_message,
      type: "material",
      status: "unread",
    });

    res.status(200).json({ status: 200, message: "Pengajuan peminjaman material berhasil!", data: material_transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const show = async (req, res) => {
  try {
    const material_transaction = await MaterialTransaction.query().findById(req.params.id);

    if (material_transaction.datetime) {
      const datetime = new Date(material_transaction.datetime.getTime() + (7 * 60) * 60000).toISOString();
	  
	  const user_id = material_transaction.user_id;
	  const material_id = material_transaction.material_id;

	  let data_user = await User.query().where('id', user_id).first();
	  let data_material = await Material.query().where('id', material_id).first();
		
	  material_transaction.user_name = data_user.name;
	  material_transaction.material_name = data_material.name;
      material_transaction.date_start = datetime.split('T')[0];
      material_transaction.time_start = datetime.split('T')[1].split('.000Z')[0];
    }
	

    res.status(200).json({ status: 200, message: "OK!", data: material_transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const userTake = async (req, res) => {
  try {
    await MaterialTransaction.query().findById(req.params.id).patch({
      status: "Dikonfirmasi",
    });

    res.status(200).json({ status: 200, message: "Material telah diambil!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const update = async (req, res) => {
  try {
    const datetime = req.body.date + " " + req.body.time;

    const material_transaction = await MaterialTransaction.query().findById(req.params.id).patch({
      datetime: datetime,
      destination: req.body.destination,
      description: req.body.description,
      material_id: req.body.material_id,
      status: req.body.status,
    });

    const material_transaction_data = await MaterialTransaction.query().findById(req.params.id);
    const data_user = await User.query().findById(material_transaction_data.user_id);

    let message = "";
    let notification_message = "";

    if (notification_message) {
      await Notification.query().insert({
        user_id: data_user.id,
        transaction_id: material_transaction_data.id,
        notification: notification_message,
        type: "material",
        status: "unread",
      });
    }

    res.status(200).json({ status: 200, message, data: material_transaction_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const destroy = async (req, res) => {
  try {
    const material_transaction = await MaterialTransaction.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Pengambilan barang telah dihapus!",
      data: material_transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  showByStatus,
  index,
  store,
  show,
  userTake,
  update,
  destroy,
};
