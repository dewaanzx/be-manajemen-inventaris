const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "email", "password", "phone", "role", "division"],

      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        role: {
          type: "string",
        },
        division: {
          type: "string",
        },
        picture: {
          type: "string",
        },
        verification_token: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = User;
