const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Notifications extends Model {
  static get tableName() {
    return "notifications";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "transaction_id", "notification", "type", "status"],

      properties: {
        user_id: {
          type: "integer",
        },
        transaction_id: {
          type: "integer",
        },
        notification: {
          type: "string",
        },
        type: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Notifications;
