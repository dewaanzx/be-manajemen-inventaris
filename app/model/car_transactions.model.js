const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class CarTransactions extends Model {
  static get tableName() {
    return "car_transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "destination", "description", "passanger", "passanger_description", "driver", "datetime_start"],

      properties: {
        user_id: {
          type: "integer",
        },
        destination: {
          type: "string",
        },
        description: {
          type: "string",
        },
        passanger: {
          type: "integer",
        },
        passanger_description: {
          type: "string",
        },
        driver: {
          type: "string",
        },
        datetime_start: {
          type: "string",
        },
        car_id: {
          type: "integer",
        },
        confirmation_note: {
          type: "string",
        },
        driving_license: {
          type: "string",
        },
        picture: {
          type: "string",
        },
        datetime_taken: {
          type: "string",
        },
        datetime_return: {
          type: "string",
        },
        return_note: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = CarTransactions;
