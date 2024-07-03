const AuthRouter = require("./auth");
const UserRouter = require("./user");
const MaterialRouter = require("./material");
const MaterialTransactionRouter = require("./material_transaction");
const DriverRouter = require("./driver");
const DivisionRouter = require("./division");
const NotificationRouter = require("./notification");
const RoomRouter = require("./room");
const RoomTransactionRouter = require("./room_transaction");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, MaterialRouter);
  app.use(prefix, MaterialTransactionRouter);
  app.use(prefix, DriverRouter);
  app.use(prefix, DivisionRouter);
  app.use(prefix, NotificationRouter);
  app.use(prefix, RoomRouter);
  app.use(prefix, RoomTransactionRouter);
};

module.exports = routes;
