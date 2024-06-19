const RoomTransaction = require("../model/room_transactions.model");
const Room = require("../model/rooms.model");
const Notification = require("../model/notifications.model");
const transporter = require("../../config/mailer.js");
const User = require("../model/user.model");

const index = async (req, res) => {
  try {
    //Retreiving user role
    const user_role = req.user.role;
    let room_transactions = [];

    //The data will shown based on role
    if (user_role == "User"){
      const user_id = req.user.id;
      room_transactions = await RoomTransaction.query().where('user_id', user_id).orderBy('id', 'desc');
    }else{
      room_transactions = await RoomTransaction.query().orderBy('id', 'desc');
    }

    for (const item of room_transactions){
      const room = await Room.query().findById(item.room_id)
      const date = new Date(item.date).toISOString();
      const formatted_date = date.split('T')[0];

      item.room_name = room.name;
      item.date = formatted_date;
    }

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room_transactions,
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
    let room_transactions = [];

    //Retreiving status on parameters
    const status = req.params.status;

    //The data will shown based on role
    if (user_role == "User"){
      const user_id = req.user.id;

      if (status == "Semua"){
        room_transactions = await RoomTransaction.query().where('user_id', user_id).orderBy('id', 'desc');
      }else{
        room_transactions = await RoomTransaction.query().where('user_id', user_id).where('status', status).orderBy('id', 'desc');
      }
    }else{
      if (status == "Semua"){
        room_transactions = await RoomTransaction.query().orderBy('id', 'desc');
      }else{
        room_transactions = await RoomTransaction.query().where('status', status).orderBy('id', 'desc');
      }
    }

    for (const item of room_transactions){
      const room = await Room.query().findById(item.room_id)
      const date = new Date(item.date).toISOString();
      const formatted_date = date.split('T')[0];

      item.room_name = room.name;
      item.date = formatted_date;
    }

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room_transactions,
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
    //Checking if theres any room that has been booked based on the requested date
    const existing_transaction = await RoomTransaction.query().where('date', req.body.date).where('status', 'Diterima').where('room_id', req.body.room_id).select('time_start', 'time_end');

    //Declaring the time that has been requested to datetime
    const time_start = new Date(req.body.date+"T"+req.body.time_start);
    const time_end = new Date(req.body.date+"T"+req.body.time_end);

    //Checking if the room has been booked or not
    for (const item of existing_transaction){
      //Declaring the time that has been booked to datetime
      const existing_time_start = new Date(req.body.date+"T"+item.time_start);
      const existing_time_end = new Date(req.body.date+"T"+item.time_end);

      //Checking if theres any time conflict with the existing transaction
      if ((time_start >= existing_time_start && time_start < existing_time_end) || (time_end > existing_time_start && time_end <= existing_time_end) || (time_start <= existing_time_start && time_end >= existing_time_end)) {
        return res.status(400).json({
          status: 400,
          message: "Pengajuan peminjaman ruangan gagal. Seseorang telah meminjam ruangan di jam tersebut!",
        });
      }
    }

    const room_transaction = await RoomTransaction.query().insert({
      user_id: req.user.id,
      room_id: req.body.room_id,
      date: req.body.date,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      event: req.body.event,
      description: req.body.description,
      participant: req.body.participant,
      consumption: req.body.consumption,
      note: req.body.note,
      status: req.body.status,
      confirmation_note: req.body.confirmation_note,
    });

    const room = await Room.query().findById(req.body.room_id);

    //Storing notification
    if (req.body.status == "Diterima"){
      const notification = await Notification.query().insert({
        user_id: room_transaction.user_id,
        transaction_id: room_transaction.id,
        notification: "Permintaan Peminjaman Ruangan "+room.name+" telah diterima!",
        type: "room",
        status: "unread",
      });
    }else{
      const notification = await Notification.query().insert({
        user_id: room_transaction.user_id,
        transaction_id: room_transaction.id,
        notification: "Permintaan Peminjaman Ruangan "+room.name+" telah dibuat!",
        type: "room",
        status: "unread",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Pengajuan peminjaman ruangan berhasil!",
      data: room_transaction,
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
    const room_transaction = await RoomTransaction.query().findById(req.params.id);

    for (const item of room_transactions){
      const room = await Room.query().findById(item.room_id)
      const date = new Date(item.date).toISOString();
      const formatted_date = date.split('T')[0];

      item.room_name = room.name;
      item.date = formatted_date;
    }

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room_transaction,
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
    //Checking if the room has been booked or not
    if(req.body.status == "Diterima"){
      //Checking if theres any room that has been booked based on the requested date
      const existing_transaction = await RoomTransaction.query().where('date', req.body.date).where('status', 'Diterima').where('room_id', req.body.room_id).select('time_start', 'time_end');

      //Declaring the time that has been requested to datetime
      const time_start = new Date(req.body.date+"T"+req.body.time_start);
      const time_end = new Date(req.body.date+"T"+req.body.time_end);

      for (const item of existing_transaction){
        //Declaring the time that has been booked to datetime
        const existing_time_start = new Date(req.body.date+"T"+item.time_start);
        const existing_time_end = new Date(req.body.date+"T"+item.time_end);

        //Checking if theres any time conflict with the existing transaction
        if ((time_start >= existing_time_start && time_start < existing_time_end) || (time_end > existing_time_start && time_end <= existing_time_end) || (time_start <= existing_time_start && time_end >= existing_time_end)) {
          return res.status(400).json({
            status: 400,
            message: "Penerimaan peminjaman ruangan gagal. Seseorang telah meminjam ruangan di jam tersebut!",
          });
        }
      }
    }

    const room_confirmation = await RoomTransaction.query()
      .findById(req.params.id)
      .patch({
        room_id: req.body.room_id,
        date: req.body.date,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        status: req.body.status,
        confirmation_note: req.body.confirmation_note,
      });

    const room_confirmation_data = await RoomTransaction.query().findById(req.params.id);
    const data_user = await User.query().findById(room_confirmation_data.user_id);
    const room = await Room.query().findById(req.body.room_id);

    //2 Different message will show based on the choosen status
    if (req.body.status == "Ditolak"){
      //Sending notification to email
      const mail_options = {
        from: 'GMedia',
        to: data_user.email,
        subject: 'Peminjaman ruangan telah ditolak',
        html: `Peminjaman ruangan "${room.name}" telah ditolak.`,
      };

      await transporter.sendMail(mail_options);

      //Create new notification
      const notification = await Notification.query().insert({
        user_id: room_transaction.user_id,
        transaction_id: room_transaction.id,
        notification: "Permintaan Peminjaman Ruangan dengan id "+room.name+" telah ditolak!",
        type: "room",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Peminjaman ruangan telah ditolak!",
        data: room_confirmation_data,
      });
    }else if (req.body.status == "Diterima"){
      const mail_options = {
        from: 'GMedia',
        to: data_user.email,
        subject: 'Peminjaman ruangan telah diterima',
        html: `Peminjaman ruangan dengan id "${room.name}" telah diterima.`,
      };

      const notification = await Notification.query().insert({
        user_id: room_transaction.user_id,
        transaction_id: room_transaction.id,
        notification: "Permintaan Peminjaman Ruangan dengan id "+room.name+" telah diterima!",
        type: "room",
        status: "unread",
      });

      await transporter.sendMail(mail_options);

      res.status(200).json({
        status: 200,
        message: "Peminjaman ruangan telah diterima!",
        data: room_confirmation_data,
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
    const room_transaction = await RoomTransaction.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Peminjaman ruangan telah dihapus!",
      data: room_transaction,
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
  showByStatus,
  store,
  show,
  update,
  destroy,
};
