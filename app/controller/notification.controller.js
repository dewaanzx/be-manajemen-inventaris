const Notification = require("../model/notifications.model");
const moment = require('moment');

const index = async (req, res) => {
  try {
    const notifications = await Notification.query().where('user_id', req.user.id).orderBy('id', 'desc');

    for (const item of notifications){
    	if (item.status == "Unread"){
		    const notification = await Notification.query()
		      .findById(item.id)
		      .patch({
		        status: "Read",
		      });
    	}

      const created_at = new Date(item.created_at);

      let timeago = moment(created_at).locale('id').fromNow();;

      item.timeago = timeago;
    }

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: notifications,
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
};
