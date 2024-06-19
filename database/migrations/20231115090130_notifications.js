exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id");
    table.integer("transaction_id");
    table.text("notification");
    table.enu("type", ["Car", "Room"]);
    table.enu("status", ["Unread", "Read"]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
