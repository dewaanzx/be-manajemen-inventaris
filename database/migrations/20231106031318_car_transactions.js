exports.up = function (knex) {
  return knex.schema.createTable("car_transactions", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id");
    table.string("destination");
    table.text("description");
    table.integer("passanger");
    table.text("passanger_description");
    table.enu("driver", ["0", "1"]);
    table.datetime("datetime_start");
    table.integer("car_id").nullable();
    table.integer("driver_id").nullable();
    table.text("confirmation_note").nullable();
    table.datetime("datetime_taken").nullable();
    table.string("driving_license").nullable();
    table.string("picture").nullable();
    table.datetime("datetime_return").nullable();
    table.text("return_note").nullable();
    table.enu("status", ["Dicek", "Ditolak", "Diterima", "Digunakan", "Selesai"]).defaultTo("Dicek");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("car_transactions");
};
