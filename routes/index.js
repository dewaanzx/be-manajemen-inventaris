const AuthRouter = require("./auth");
const UserRouter = require("./user");
const MaterialRouter = require("./material");
const MaterialTransactionRouter = require("./material_transaction");
const DivisionRouter = require("./division");
const NotificationRouter = require("./notification");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, MaterialRouter);
  app.use(prefix, MaterialTransactionRouter);
  app.use(prefix, DivisionRouter);
  app.use(prefix, NotificationRouter);
};

module.exports = routes;
