const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Cars extends Model {
  static get tableName() {
    return "cars";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "license", "picture"],

      properties: {
        name: {
          type: "string",
        },
        license: {
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

module.exports = Cars;
