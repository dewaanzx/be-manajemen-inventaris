const Room = require("../model/rooms.model");
const RoomTransaction = require("../model/room_transactions.model");

const index = async (req, res) => {
  try {
    //Declaring current datetime
    const current_datetime = new Date().toISOString();

    //Removing the time from current_datetime
    const current_date = current_datetime.split('T')[0];

    //Checking if theres any room that has been booked today
    const today_transaction = await RoomTransaction.query().where('date', current_date).where('status', 'Diterima').select('room_id', 'time_start', 'time_end');

    //Checking room availability
    for (const item of today_transaction){
      //Declaring the time that has been booked to datetime
      const time_start = new Date(current_date+"T"+item.time_start).toISOString();
      const time_end = new Date(current_date+"T"+item.time_end).toISOString();

      //Checking the room availability by looking the time conflict
      if (current_datetime >= time_start && current_datetime < time_end){
        //Updating the availability to 0 (not available)
        const room = await Room.query()
          .findById(item.room_id)
          .patch({
            availability: "0",
          });
      }else{
        //Updating the availability to 1 (available)
        const room = await Room.query()
          .where('id', '!=', item.room_id)
          .patch({
            availability: "1",
          });
      }
    }

    const rooms = await Room.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: rooms,
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
    const room = await Room.query().insert({
      name: req.body.name,
      description: req.body.description,
      capacity: parseInt(req.body.capacity),
      picture: req.file.filename,
    });

    res.status(200).json({
      status: 200,
      message: "Ruangan telah berhasil ditambah!",
      data: room,
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
    const room = await Room.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room,
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
    const room = await Room.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
        description: req.body.description,
        capacity: parseInt(req.body.capacity),
      });

    if(req.file){
      await Room.query()
        .findById(req.params.id)
        .patch({
          picture: req.file.filename,
        });
    }

    res.status(200).json({
      status: 200,
      message: "Ruangan telah berhasil diedit!",
      data: room,
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
    const room = await Room.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Ruangan telah berhasil dihapus!",
      data: room,
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
