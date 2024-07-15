const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class MaterialTransactions extends Model {
  static get tableName() {
    return "material_transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "destination", "description", "datetime"],

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
        datetime: {
          type: "string",
        },
        material_id: {
          type: "integer",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = MaterialTransactions;
