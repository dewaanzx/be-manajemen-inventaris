const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Drivers extends Model {
  static get tableName() {
    return "drivers";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
        },
        picture: {
          type: "string",
        },
        availability: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Drivers;
