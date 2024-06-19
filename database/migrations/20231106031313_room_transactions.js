exports.up = function (knex) {
  return knex.schema.createTable("room_transactions", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id");
    table.integer("room_id");
    table.date("date");
    table.time("time_start");
    table.time("time_end");
    table.string("event");
    table.text("description");
    table.tinyint("participant");
    table.enu("consumption", ["0", "1"]);
    table.text("note");
    table.enu("status", ["Dicek", "Ditolak", "Diterima"]).defaultTo("Dicek");
    table.text("confirmation_note").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("room_transactions");
};
