const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Materials extends Model {
  static get tableName() {
    return "materials";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "size", "quantity", "picture"],

      properties: {
        name: {
          type: "string",
        },
        size: {
          type: "string",
        },
        quantity: {
          type: "integer",
        },
        picture: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Materials;
