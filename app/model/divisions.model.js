const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Divisions extends Model {
  static get tableName() {
    return "divisions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Divisions;
