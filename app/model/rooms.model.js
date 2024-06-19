const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Rooms extends Model {
  static get tableName() {
    return "rooms";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "description", "capacity", "picture"],

      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        capacity: {
          type: "integer",
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

module.exports = Rooms;
