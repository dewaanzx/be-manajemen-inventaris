const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class RoomTransactions extends Model {
  static get tableName() {
    return "room_transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "room_id", "date", "time_start", "time_end", "event", "description", "participant", "consumption", "note"],

      properties: {
        user_id: {
          type: "integer",
        },
        room_id: {
          type: "integer",
        },
        date: {
          type: "string",
        },
        time_start: {
          type: "string",
        },
        time_end: {
          type: "string",
        },
        event: {
          type: "string",
        },
        description: {
          type: "string",
        },
        participant: {
          type: "integer",
        },
        consumption: {
          type: "string",
        },
        note: {
          type: "string",
        },
        status: {
          type: "string",
        },
        confirmation_note: {
          type: "string",
        },
      },
    };
  }
}

module.exports = RoomTransactions;
