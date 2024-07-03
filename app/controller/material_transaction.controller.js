const Material = require("../model/materials.model.js");
const MaterialTransaction = require("../model/material_transactions.model.js");
const Driver = require("../model/drivers.model.js");
const User = require("../model/user.model.js");
const Notification = require("../model/notifications.model.js");
const transporter = require("../../config/mailer.js");

const index = async (req, res) => {
  try {
    //Retreiving user role
    const user_role = req.user.role;
    let material_transactions = [];

    //The data will shown based on role
    if (user_role == "User"){
      const user_id = req.user.id;
      material_transactions = await MaterialTransaction.query().where('user_id', user_id).orderBy('id', 'desc');
    }else{
      material_transactions = await MaterialTransaction.query().orderBy('id', 'desc');
    }

    //Spliting datetime
    for (const item of material_transactions){
      const datetime_start = new Date(item.datetime_start.getTime() + (7*60) * 60000).toISOString()
      let date_start = datetime_start.split('T')[0];
      let time_start = datetime_start.split('T')[1];
      time_start = time_start.split('.000Z')[0];

      item.date_start = date_start;
      item.time_start = time_start;
    }

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: material_transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const showByStatus = async (req, res) => {
  try {
    //Retreiving user role
    const user_role = req.user.role;
    let material_transactions = [];

    //Retreiving status on parameters
    const status = req.params.status;

    //The data will shown based on role
    if (user_role == "User"){
      const user_id = req.user.id;

      if (status == "Semua"){
        material_transactions = await MaterialTransaction.query().where('user_id', user_id).orderBy('id', 'desc');
      }else{
        material_transactions = await MaterialTransaction.query().where('user_id', user_id).where('status', status).orderBy('id', 'desc');
      }
    }else{
      if (status == "Semua"){
        material_transactions = await MaterialTransaction.query().orderBy('id', 'desc');
      }else{
        material_transactions = await MaterialTransaction.query().where('status', status).orderBy('id', 'desc');
      }
    }

    //Spliting datetime
    for (const item of material_transactions){
      const datetime_start = new Date(item.datetime_start.getTime() + (7*60) * 60000).toISOString()
      let date_start = datetime_start.split('T')[0];
      let time_start = datetime_start.split('T')[1];
      time_start = time_start.split('.000Z')[0];

      item.date_start = date_start;
      item.time_start = time_start;
    }
    
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: material_transactions,
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
    //Merging value of date and time
  	const datetime = req.body.date+" "+req.body.time;

    //Storing data to Material Transaction
    const material_transaction = await MaterialTransaction.query().insert({
      user_id: req.user.id,
      datetime_start: datetime,
      destination: req.body.destination,
      description: req.body.description,
      passanger: req.body.passanger,
      passanger_description: req.body.passanger_description,
      driver: req.body.driver,
      driver_id: req.body.driver_id,
      material_id: req.body.material_id,
      status: req.body.status,
      confirmation_note: req.body.confirmation_note,
    });

    //Changing driver availability if the user use driver
    if (req.body.driver_id){
      const driver = await Driver.query()
        .findById(req.body.driver_id)
        .patch({
          availability: "0",
        });
    }

    //Changing material availability if admin give the user material
    if (req.body.material_id){
      const material = await Material.query()
        .findById(req.body.material_id)
        .patch({
          availability: "0",
        });
    }

    //Storing notification
    if (req.body.status == "Diterima"){
      const notification = await Notification.query().insert({
        user_id: material_transaction.user_id,
        transaction_id: material_transaction.id,
        notification: "Permintaan Pengambilan Material "+req.body.destination+" telah diterima!",
        type: "material",
        status: "unread",
      });
    }else{
      const notification = await Notification.query().insert({
        user_id: material_transaction.user_id,
        transaction_id: material_transaction.id,
        notification: "Permintaan Pengambilan Material "+req.body.destination+" telah dibuat!",
        type: "material",
        status: "unread",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Pengajuan peminjaman material berhasil!",
      data: material_transaction,
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
    const material_transaction = await MaterialTransaction.query().findById(req.params.id);

    //Spliting datetime
    if(material_transaction.datetime_start){
      const datetime_start = new Date(material_transaction.datetime_start.getTime() + (7*60) * 60000).toISOString();
      date_start = datetime_start.split('T')[0];
      time_start = datetime_start.split('T')[1];
      time_start = time_start.split('.000Z')[0];

      material_transaction.date_start = date_start;
      material_transaction.time_start = time_start;
    }

    if(material_transaction.datetime_taken){
      const datetime_taken = new Date(material_transaction.datetime_taken.getTime() + (7*60) * 60000).toISOString();
      date_taken = datetime_taken.split('T')[0];
      time_taken = datetime_taken.split('T')[1];
      time_taken = time_taken.split('.000Z')[0];

      material_transaction.date_taken = date_taken;
      material_transaction.time_taken = time_taken;
    }

    if(material_transaction.datetime_return){
      const datetime_return = new Date(material_transaction.datetime_return.getTime() + (7*60) * 60000).toISOString();
      date_return = datetime_return.split('T')[0];
      time_return = datetime_return.split('T')[1];
      time_return = time_return.split('.000Z')[0];

      material_transaction.date_return = date_return;
      material_transaction.time_return = time_return;
    }

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: material_transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const userTake = async (req, res) => {
  try {
    //Merging value of date and time_taken
    const datetime_taken = req.body.date+" "+req.body.time_taken;

    const material_transaction = await MaterialTransaction.query()
      .findById(req.params.id)
      .patch({
        status: "Digunakan",
        datetime_taken: datetime_taken,
        picture: req.files.picture[0].filename,
        driving_license: req.files.driving_license[0].filename,
      });

    const material_transaction_data = await MaterialTransaction.query().findById(req.params.id);
    const data_user = await User.query().findById(material_transaction_data.user_id);

    //Create new notification
    const notification = await Notification.query().insert({
      user_id: data_user.id,
      transaction_id: material_transaction_data.id,
      notification: "Peminjaman Material ke "+req.body.destination+" telah berhasil diambil!",
      type: "material",
      status: "unread",
    });

    res.status(200).json({
      status: 200,
      message: "Material telah diambil!",
      data: material_transaction_data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

const adminReturn = async (req, res) => {
  try {
    //Merging value of date and time_taken
    const datetime_return = req.body.date+" "+req.body.time_return;

    const material_transaction = await MaterialTransaction.query()
      .findById(req.params.id)
      .patch({
        datetime_return: datetime_return,
        return_note: req.body.return_note,
        status: "Selesai",
      });

    const material_transaction_data = await MaterialTransaction.query().findById(req.params.id);
    const data_user = await User.query().findById(material_transaction_data.user_id);

    //Updating the Driver and Material availability
    if (material_transaction_data.driver_id){
      const driver = await Driver.query()
        .findById(material_transaction_data.driver_id)
        .patch({
          availability: "1",
        });
    }

    const material = await Material.query()
      .findById(material_transaction_data.material_id)
      .patch({
        availability: "1",
      });

    //Create new notification
    const notification = await Notification.query().insert({
      user_id: data_user.id,
      transaction_id: material_transaction_data.id,
      notification: "Peminjaman Material ke "+req.body.destination+" telah selesai!",
      type: "material",
      status: "unread",
    });

    res.status(200).json({
      status: 200,
      message: "Peminjaman material telah selesai!",
      data: material_transaction_data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

const update = async (req, res) => {
  try {
    //Merging value of date and time
    const datetime_start = req.body.date+" "+req.body.time;

    const material_transaction = await MaterialTransaction.query()
      .findById(req.params.id)
      .patch({
        datetime_start: datetime_start,
        destination: req.body.destination,
        description: req.body.description,
        passanger: req.body.passanger,
        passanger_description: req.body.passanger_description,
        driver: req.body.driver,
        driver_id: req.body.driver_id,
        material_id: req.body.material_id,
        status: req.body.status,
        confirmation_note: req.body.confirmation_note,
      });

    //Changing driver availability based on status
    if (req.body.driver_id){
      if (req.body.status == "Selesai" || req.body.status == "Ditolak"){
        const driver = await Driver.query()
          .findById(req.body.driver_id)
          .patch({
            availability: "1",
          });
      }else{
        const driver = await Driver.query()
          .findById(req.body.driver_id)
          .patch({
            availability: "0",
          });
      }
    }

    //Changing material availability based on status
    if (req.body.material_id){
      if (req.body.status == "Selesai" || req.body.status == "Ditolak"){
        const material = await Material.query()
          .findById(req.body.material_id)
          .patch({
            availability: "1",
          });
      }else{
        const material = await Material.query()
          .findById(req.body.material_id)
          .patch({
            availability: "0",
          });
      }
    }

    const material_transaction_data = await MaterialTransaction.query().findById(req.params.id);
    const data_user = await User.query().findById(material_transaction_data.user_id);

    //4 Different message will show based on the choosen status
    if(req.body.status == "Ditolak"){
      //Sending notification to email
      const mail_options = {
        from: 'GMedia',
        to: data_user.email,
        subject: 'Permintaan peminjaman material telah ditolak',
        html: `Permintaan peminjaman material dengan id "${material_transaction_data.id}" telah ditolak.`,
      };

      await transporter.sendMail(mail_options);

      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        transaction_id: material_transaction_data.id,
        notification: "Permintaan Pengambilan Material "+req.body.destination+" telah ditolak!",
        type: "material",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Permintaan peminjaman material telah ditolak!",
        data: material_transaction_data,
      });
    }else if(req.body.status == "Diterima"){
      //Sending notification to email
      const mail_options = {
        from: 'GMedia',
        to: data_user.email,
        subject: 'Permintaan peminjaman material telah diterima',
        html: `Permintaan peminjaman material dengan id "${material_transaction_data.id}" telah diterima.`,
      };

      await transporter.sendMail(mail_options);

      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        transaction_id: material_transaction_data.id,
        notification: "Permintaan Pengambilan Material "+req.body.destination+" telah diterima!",
        type: "material",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Permintaan peminjaman material telah diterima!",
        data: material_transaction_data,
      });
    }else if(req.body.status == "Digunakan"){
      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        transaction_id: material_transaction_data.id,
        notification: "Peminjaman Material ke "+req.body.destination+" telah berhasil diambil!",
        type: "material",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Material telah diambil!",
        data: material_transaction_data,
      });
    }else if(req.body.status == "Selesai"){
      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        transaction_id: material_transaction_data.id,
        notification: "Peminjaman Material ke "+req.body.destination+" telah selesai!",
        type: "material",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Peminjaman material telah selesai!",
        data: material_transaction_data,
      });
    }else if(req.body.status == "Dicek"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman material telah di update!",
        data: material_transaction_data,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const material_transaction = await MaterialTransaction.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Peminjaman material telah dihapus!",
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
  adminReturn,
  update,
  destroy,
};
